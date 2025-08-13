import * as THREE from 'three';
import { LineSegments2 } from 'three/addons/lines/LineSegments2.js';
import { LineMaterial } from 'three/addons/lines/LineMaterial.js';
import { LineSegmentsGeometry } from 'three/addons/lines/LineSegmentsGeometry.js';
import { GEOMETRY_CONSTANTS, MATERIAL_CONSTANTS } from '../constants';

/**
 * Creates a dodecahedron geometry with specified size
 * @param {number} size - Size of the dodecahedron
 * @returns {THREE.DodecahedronGeometry}
 */
export const createDodecahedron = (size) => {
  return new THREE.DodecahedronGeometry(size, 0);
};

/**
 * Calculates geometry size based on window width
 * @param {number} windowWidth - Current window width
 * @returns {number} - Calculated size
 */
export const calculateSize = (windowWidth) => {
  const A = (800 - 1) * 1;
  return Math.max((A / windowWidth), 1);
};

/**
 * Creates thick lines from edges using LineSegments2
 * @param {number} geometryIndex - Index for storing line references
 * @param {THREE.EdgesGeometry} edges - Edge geometry
 * @param {number} thickness - Line thickness in pixels
 * @param {Array} linesStorage - Array to store line references
 * @param {number} windowWidth - Current window width for resolution
 * @param {number} windowHeight - Current window height for resolution
 * @returns {LineSegments2} - LineSegments2 object
 */
export const createThickLines = (geometryIndex, edges, thickness, linesStorage, windowWidth = 800, windowHeight = 600) => {
  // Convert EdgesGeometry to LineSegmentsGeometry
  const lineGeometry = new LineSegmentsGeometry();
  lineGeometry.fromEdgesGeometry(edges);

  const lineMaterial = new LineMaterial({ 
    color: MATERIAL_CONSTANTS.LINE_COLOR, 
    transparent: true, 
    opacity: MATERIAL_CONSTANTS.LINE_OPACITY,
    linewidth: thickness * 1000, // Convert to appropriate scale
    resolution: new THREE.Vector2(windowWidth, windowHeight)
  });

  // Initialize array for this geometry if not exists
  if (!linesStorage[geometryIndex]) {
    linesStorage[geometryIndex] = [];
  }

  const lineSegments = new LineSegments2(lineGeometry, lineMaterial);
  lineSegments.computeLineDistances();
  linesStorage[geometryIndex].push(lineSegments);

  return lineSegments;
};

/**
 * Updates existing lines with new geometry
 * @param {number} geometryIndex - Index of lines to update
 * @param {THREE.EdgesGeometry} edges - New edge geometry
 * @param {number} thickness - Line thickness
 * @param {Array} linesStorage - Array containing line references
 * @param {number} windowWidth - Current window width for resolution
 * @param {number} windowHeight - Current window height for resolution
 */
export const updateThickLines = (geometryIndex, edges, thickness, linesStorage, windowWidth = 800, windowHeight = 600) => {
  const lines = linesStorage[geometryIndex];
  if (!lines || lines.length === 0) return;

  const lineSegments = lines[0];
  if (lineSegments) {
    // Dispose old geometry and create new one
    lineSegments.geometry.dispose();
    
    const newLineGeometry = new LineSegmentsGeometry();
    newLineGeometry.fromEdgesGeometry(edges);
    lineSegments.geometry = newLineGeometry;
    lineSegments.computeLineDistances();

    // Update material resolution
    if (lineSegments.material && lineSegments.material.resolution) {
      lineSegments.material.resolution.set(windowWidth, windowHeight);
    }
  }
};

/**
 * Creates all geometric shapes for the scene
 * @param {number} sizeRef - Current size reference
 * @param {Array} linesStorage - Storage for line references
 * @param {number} windowWidth - Current window width for resolution
 * @param {number} windowHeight - Current window height for resolution
 * @returns {object} - Object containing all created geometries and groups
 */
export const createAllGeometries = (sizeRef, linesStorage, windowWidth = 800, windowHeight = 600) => {
  // Create geometries
  const geometry0 = new THREE.IcosahedronGeometry(
    GEOMETRY_CONSTANTS.ICOSAHEDRON.RADIUS_MULTIPLIER * 4, 
    GEOMETRY_CONSTANTS.ICOSAHEDRON.DETAIL
  );
  const geometry1 = createDodecahedron(sizeRef * GEOMETRY_CONSTANTS.DODECAHEDRON.RADIUS_MULTIPLIER);
  const geometry2 = new THREE.OctahedronGeometry(
    GEOMETRY_CONSTANTS.OCTAHEDRON.RADIUS_MULTIPLIER, 
    GEOMETRY_CONSTANTS.OCTAHEDRON.DETAIL
  );
  const geometry3 = new THREE.BoxGeometry(
    sizeRef * GEOMETRY_CONSTANTS.CUBE.SIZE_MULTIPLIER,
    sizeRef * GEOMETRY_CONSTANTS.CUBE.SIZE_MULTIPLIER,
    sizeRef * GEOMETRY_CONSTANTS.CUBE.SIZE_MULTIPLIER
  );

  // Create edges
  const edges0 = new THREE.EdgesGeometry(geometry0);
  const edges1 = new THREE.EdgesGeometry(geometry1);
  const edges2 = new THREE.EdgesGeometry(geometry2);
  const edges3 = new THREE.EdgesGeometry(geometry3);

  // Create line groups with thick lines
  const icosahedron = createThickLines(0, edges0, 0.002, linesStorage, windowWidth, windowHeight);
  const dodecahedron = createThickLines(1, edges1, 0.002, linesStorage, windowWidth, windowHeight);
  const octahedron = createThickLines(2, edges2, 0.002, linesStorage, windowWidth, windowHeight);
  const cube = createThickLines(3, edges3, 0.002, linesStorage, windowWidth, windowHeight);

  return {
    geometries: { geometry0, geometry1, geometry2, geometry3 },
    edges: { edges0, edges1, edges2, edges3 },
    groups: { icosahedron, dodecahedron, octahedron, cube }
  };
};

/**
 * Updates resolution for all line materials
 * @param {Array} linesStorage - Array containing line references
 * @param {number} windowWidth - Current window width
 * @param {number} windowHeight - Current window height
 */
export const updateLineResolution = (linesStorage, windowWidth, windowHeight) => {
  linesStorage.forEach(lines => {
    if (lines && lines.length > 0) {
      lines.forEach(lineSegments => {
        if (lineSegments.material && lineSegments.material.resolution) {
          lineSegments.material.resolution.set(windowWidth, windowHeight);
        }
      });
    }
  });
};

/**
 * Updates line materials based on velocity for motion blur effect
 * @param {Array} linesStorage - Array containing line references
 * @param {THREE.Vector3} velocity - Current velocity vector
 * @param {number} velocityBlurFactor - Factor for velocity-based opacity
 * @param {number} baseOpacity - Base opacity from constants
 */
export const updateVelocityBlur = (linesStorage, velocity, velocityBlurFactor, baseOpacity) => {
  const velocityMagnitude = velocity.length();
  const blurOpacity = Math.max(0.3, baseOpacity - velocityMagnitude * velocityBlurFactor);
  
  linesStorage.forEach(lines => {
    if (lines && lines.length > 0) {
      lines.forEach(lineSegments => {
        if (lineSegments.material && lineSegments.material.opacity !== undefined) {
          lineSegments.material.opacity = blurOpacity;
          lineSegments.material.needsUpdate = true;
        }
      });
    }
  });
};
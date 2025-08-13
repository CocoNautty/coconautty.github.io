import * as THREE from 'three';
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
 * Creates efficient lines from edges using LineSegments
 * @param {number} geometryIndex - Index for storing line references
 * @param {THREE.EdgesGeometry} edges - Edge geometry
 * @param {number} thickness - Line thickness (not used with LineSegments)
 * @param {Array} linesStorage - Array to store line references
 * @returns {THREE.LineSegments} - LineSegments object
 */
export const createThickLines = (geometryIndex, edges, thickness, linesStorage) => {
  const lineMaterial = new THREE.LineBasicMaterial({ 
    color: MATERIAL_CONSTANTS.LINE_COLOR, 
    transparent: true, 
    opacity: MATERIAL_CONSTANTS.LINE_OPACITY 
  });

  // Initialize array for this geometry if not exists
  if (!linesStorage[geometryIndex]) {
    linesStorage[geometryIndex] = [];
  }

  const lineSegments = new THREE.LineSegments(edges, lineMaterial);
  linesStorage[geometryIndex].push(lineSegments);

  return lineSegments;
};

/**
 * Updates existing lines with new geometry
 * @param {number} geometryIndex - Index of lines to update
 * @param {THREE.EdgesGeometry} edges - New edge geometry
 * @param {number} thickness - Line thickness (not used with LineSegments)
 * @param {Array} linesStorage - Array containing line references
 */
export const updateThickLines = (geometryIndex, edges, thickness, linesStorage) => {
  const lines = linesStorage[geometryIndex];
  if (!lines || lines.length === 0) return;

  const lineSegments = lines[0];
  if (lineSegments) {
    // Dispose old geometry and assign new one
    lineSegments.geometry.dispose();
    lineSegments.geometry = edges;
  }
};

/**
 * Creates all geometric shapes for the scene
 * @param {number} sizeRef - Current size reference
 * @param {Array} cylindersStorage - Storage for cylinder references
 * @returns {object} - Object containing all created geometries and groups
 */
export const createAllGeometries = (sizeRef, linesStorage) => {
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

  // Create line groups
  const icosahedron = createThickLines(0, edges0, 0.02, linesStorage);
  const dodecahedron = createThickLines(1, edges1, 0.02, linesStorage);
  const octahedron = createThickLines(2, edges2, 0.02, linesStorage);
  const cube = createThickLines(3, edges3, 0.02, linesStorage);

  return {
    geometries: { geometry0, geometry1, geometry2, geometry3 },
    edges: { edges0, edges1, edges2, edges3 },
    groups: { icosahedron, dodecahedron, octahedron, cube }
  };
};
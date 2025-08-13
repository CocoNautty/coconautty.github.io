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
 * Creates thick lines from edges using cylinder geometry
 * @param {number} geometryIndex - Index for storing cylinders
 * @param {THREE.EdgesGeometry} edges - Edge geometry
 * @param {number} thickness - Line thickness
 * @param {Array} cylindersStorage - Array to store cylinder references
 * @returns {THREE.Group} - Group containing all cylinder meshes
 */
export const createThickLines = (geometryIndex, edges, thickness, cylindersStorage) => {
  const group = new THREE.Group();
  const lineMaterial = new THREE.MeshBasicMaterial({ 
    color: MATERIAL_CONSTANTS.LINE_COLOR, 
    transparent: true, 
    opacity: MATERIAL_CONSTANTS.LINE_OPACITY 
  });

  // Initialize array for this geometry if not exists
  if (!cylindersStorage[geometryIndex]) {
    cylindersStorage[geometryIndex] = [];
  }

  for (let i = 0; i < edges.attributes.position.count; i += 2) {
    const start = new THREE.Vector3().fromBufferAttribute(edges.attributes.position, i);
    const end = new THREE.Vector3().fromBufferAttribute(edges.attributes.position, i + 1);
    const direction = new THREE.Vector3().subVectors(end, start);
    const length = direction.length();
    const midpoint = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);

    const cylinderGeometry = new THREE.CylinderGeometry(
      thickness, 
      thickness, 
      length, 
      MATERIAL_CONSTANTS.CYLINDER_SEGMENTS
    );
    const cylinder = new THREE.Mesh(cylinderGeometry, lineMaterial);

    // Position and orient the cylinder
    cylinder.position.copy(midpoint);
    cylinder.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0), 
      direction.clone().normalize()
    );

    group.add(cylinder);
    cylindersStorage[geometryIndex].push(cylinder);
  }

  return group;
};

/**
 * Updates existing thick lines with new geometry
 * @param {number} geometryIndex - Index of cylinders to update
 * @param {THREE.EdgesGeometry} edges - New edge geometry
 * @param {number} thickness - Line thickness
 * @param {Array} cylindersStorage - Array containing cylinder references
 */
export const updateThickLines = (geometryIndex, edges, thickness, cylindersStorage) => {
  const cylinders = cylindersStorage[geometryIndex];
  if (!cylinders) return;

  for (let i = 0; i < edges.attributes.position.count; i += 2) {
    const start = new THREE.Vector3().fromBufferAttribute(edges.attributes.position, i);
    const end = new THREE.Vector3().fromBufferAttribute(edges.attributes.position, i + 1);
    const direction = new THREE.Vector3().subVectors(end, start);
    const length = direction.length();
    const midpoint = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);

    const cylinder = cylinders[i / 2];
    if (cylinder) {
      // Dispose old geometry and create new one
      cylinder.geometry.dispose();
      cylinder.geometry = new THREE.CylinderGeometry(
        thickness, 
        thickness, 
        length, 
        MATERIAL_CONSTANTS.CYLINDER_SEGMENTS
      );

      // Update position and orientation
      cylinder.position.copy(midpoint);
      cylinder.quaternion.setFromUnitVectors(
        new THREE.Vector3(0, 1, 0), 
        direction.clone().normalize()
      );
    }
  }
};

/**
 * Creates all geometric shapes for the scene
 * @param {number} sizeRef - Current size reference
 * @param {Array} cylindersStorage - Storage for cylinder references
 * @returns {object} - Object containing all created geometries and groups
 */
export const createAllGeometries = (sizeRef, cylindersStorage) => {
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
  const icosahedron = createThickLines(0, edges0, 0.02, cylindersStorage);
  const dodecahedron = createThickLines(1, edges1, 0.02, cylindersStorage);
  const octahedron = createThickLines(2, edges2, 0.02, cylindersStorage);
  const cube = createThickLines(3, edges3, 0.02, cylindersStorage);

  return {
    geometries: { geometry0, geometry1, geometry2, geometry3 },
    edges: { edges0, edges1, edges2, edges3 },
    groups: { icosahedron, dodecahedron, octahedron, cube }
  };
};
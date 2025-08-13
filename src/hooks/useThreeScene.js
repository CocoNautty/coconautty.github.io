import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { ANIMATION_CONSTANTS, OBJECT_POSITIONS } from '../constants';
import { createAllGeometries, calculateSize, updateThickLines, createDodecahedron } from '../utils/geometryUtils';
import { useScrollPosition } from './useScrollPosition';
import { useMouseInteraction } from './useMouseInteraction';
import { useWindowResize } from './useWindowResize';

/**
 * Custom hook for managing Three.js scene, objects, and animations
 * @param {number} scrollableHeight - Height of scrollable content
 * @returns {object} - Mount ref for the Three.js canvas
 */
export const useThreeScene = (scrollableHeight) => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const objectsRef = useRef({});
  const animationRef = useRef(null);
  const cylindersRef = useRef([[], [], [], []]);
  const sizeRef = useRef(1);
  
  // Rotation state refs
  const rotationSpeedRef = useRef({ x: 0, y: 0, z: 0 });
  const targetSpeedRef = useRef({ x: 0, y: 0, z: 0 });

  // Custom hooks for interactions
  const scrollPosition = useScrollPosition(16);
  const mouseState = useMouseInteraction(
    ANIMATION_CONSTANTS.MOUSE_INTERACTION.THROTTLE_DELAY,
    ANIMATION_CONSTANTS.MOUSE_INTERACTION.INACTIVITY_TIMEOUT
  );
  const windowSize = useWindowResize(150);

  // Initialize scene
  useEffect(() => {
    if (!mountRef.current) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const aspectRatio = windowSize.width / windowSize.height;
    const cameraWidth = ANIMATION_CONSTANTS.THREE_JS.CAMERA_WIDTH;
    const cameraHeight = cameraWidth / aspectRatio;
    
    const camera = new THREE.OrthographicCamera(
      -cameraWidth, cameraWidth,
      cameraHeight, -cameraHeight,
      ANIMATION_CONSTANTS.THREE_JS.NEAR_PLANE,
      ANIMATION_CONSTANTS.THREE_JS.FAR_PLANE
    );
    
    camera.position.set(0, 0, ANIMATION_CONSTANTS.THREE_JS.CAMERA_Z_POSITION);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(windowSize.width, windowSize.height);
    renderer.setPixelRatio(window.devicePixelRatio * ANIMATION_CONSTANTS.THREE_JS.PIXEL_RATIO_MULTIPLIER);
    
    renderer.domElement.style.height = `${windowSize.height * ANIMATION_CONSTANTS.THREE_JS.CANVAS_SIZE_MULTIPLIER}px`;
    renderer.domElement.style.width = `${windowSize.width * ANIMATION_CONSTANTS.THREE_JS.CANVAS_SIZE_MULTIPLIER}px`;
    
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create geometries
    sizeRef.current = calculateSize(windowSize.width);
    const { groups } = createAllGeometries(sizeRef.current, cylindersRef.current);
    
    // Add objects to scene
    Object.values(groups).forEach(group => scene.add(group));
    objectsRef.current = groups;

    // Position objects
    groups.icosahedron.position.set(
      OBJECT_POSITIONS.ICOSAHEDRON.x,
      OBJECT_POSITIONS.ICOSAHEDRON.y,
      OBJECT_POSITIONS.ICOSAHEDRON.z
    );
    groups.dodecahedron.position.set(
      OBJECT_POSITIONS.DODECAHEDRON.x,
      OBJECT_POSITIONS.DODECAHEDRON.y,
      OBJECT_POSITIONS.DODECAHEDRON.z
    );
    groups.octahedron.position.set(
      OBJECT_POSITIONS.OCTAHEDRON_INITIAL.x,
      OBJECT_POSITIONS.OCTAHEDRON_INITIAL.y,
      OBJECT_POSITIONS.OCTAHEDRON_INITIAL.z
    );
    groups.cube.position.set(
      OBJECT_POSITIONS.CAMERA_LOOKAT.x + OBJECT_POSITIONS.CUBE_OFFSET.x,
      OBJECT_POSITIONS.CAMERA_LOOKAT.y + OBJECT_POSITIONS.CUBE_OFFSET.y,
      OBJECT_POSITIONS.CAMERA_LOOKAT.z + OBJECT_POSITIONS.CUBE_OFFSET.z
    );

    // Set camera look at
    camera.lookAt(
      OBJECT_POSITIONS.CAMERA_LOOKAT.x,
      OBJECT_POSITIONS.CAMERA_LOOKAT.y,
      OBJECT_POSITIONS.CAMERA_LOOKAT.z
    );

    // Initialize rotation speeds
    const setRandomRotationSpeeds = () => {
      rotationSpeedRef.current = {
        x: (Math.random() - 0.5) * ANIMATION_CONSTANTS.ROTATION_SPEEDS.RANDOM_RANGE,
        y: (Math.random() - 0.5) * ANIMATION_CONSTANTS.ROTATION_SPEEDS.RANDOM_RANGE,
        z: (Math.random() - 0.5) * ANIMATION_CONSTANTS.ROTATION_SPEEDS.RANDOM_RANGE
      };
    };

    const setRandomTargetSpeed = () => {
      targetSpeedRef.current = {
        x: (Math.random() - 0.5) * ANIMATION_CONSTANTS.ROTATION_SPEEDS.TARGET_RANGE,
        y: (Math.random() - 0.5) * ANIMATION_CONSTANTS.ROTATION_SPEEDS.TARGET_RANGE,
        z: (Math.random() - 0.5) * ANIMATION_CONSTANTS.ROTATION_SPEEDS.TARGET_RANGE
      };
    };

    setRandomTargetSpeed();
    setRandomRotationSpeeds();

    // Animation loop
    const animate = () => {
      if (!prefersReducedMotion && sceneRef.current && rendererRef.current && cameraRef.current) {
        const { dodecahedron, octahedron, icosahedron } = objectsRef.current;

        // Rotate objects based on target and current speeds
        if (dodecahedron) {
          dodecahedron.rotation.x -= (targetSpeedRef.current.x - rotationSpeedRef.current.x) * ANIMATION_CONSTANTS.ROTATION_SPEEDS.DODECAHEDRON_FACTOR;
          dodecahedron.rotation.y -= (targetSpeedRef.current.y - rotationSpeedRef.current.y) * ANIMATION_CONSTANTS.ROTATION_SPEEDS.DODECAHEDRON_FACTOR;
          dodecahedron.rotation.z -= (targetSpeedRef.current.z - rotationSpeedRef.current.z) * ANIMATION_CONSTANTS.ROTATION_SPEEDS.DODECAHEDRON_FACTOR;
        }

        if (octahedron) {
          octahedron.rotation.x += (targetSpeedRef.current.x - rotationSpeedRef.current.x) * ANIMATION_CONSTANTS.ROTATION_SPEEDS.OCTAHEDRON_FACTOR;
          octahedron.rotation.y += (targetSpeedRef.current.y - rotationSpeedRef.current.y) * ANIMATION_CONSTANTS.ROTATION_SPEEDS.OCTAHEDRON_FACTOR;
          octahedron.rotation.z += (targetSpeedRef.current.z - rotationSpeedRef.current.z) * ANIMATION_CONSTANTS.ROTATION_SPEEDS.OCTAHEDRON_FACTOR;
        }

        // Auto-rotate icosahedron when mouse is not active
        if (icosahedron && !mouseState.isActive) {
          icosahedron.rotation.x += rotationSpeedRef.current.x * ANIMATION_CONSTANTS.ROTATION_SPEEDS.ICOSAHEDRON_FACTOR;
          icosahedron.rotation.y += rotationSpeedRef.current.y * ANIMATION_CONSTANTS.ROTATION_SPEEDS.ICOSAHEDRON_FACTOR;
          icosahedron.rotation.z += rotationSpeedRef.current.z * ANIMATION_CONSTANTS.ROTATION_SPEEDS.ICOSAHEDRON_FACTOR;
        }

        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    if (!prefersReducedMotion) {
      animate();
    }

    // Target speed change interval
    const speedChangeInterval = setInterval(setRandomTargetSpeed, ANIMATION_CONSTANTS.TARGET_SPEED_CHANGE_INTERVAL);

    // Cleanup
    return () => {
      clearInterval(speedChangeInterval);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, [windowSize.width, windowSize.height]);

  // Handle scroll-based animations
  useEffect(() => {
    if (!cameraRef.current || !objectsRef.current.octahedron || !scrollableHeight) return;

    const camera = cameraRef.current;
    const octahedron = objectsRef.current.octahedron;
    const scrollY = scrollPosition.scrollY;

    // Adjust camera position based on scroll
    camera.position.y = -scrollY * windowSize.height * ANIMATION_CONSTANTS.SCROLL_SENSITIVITY.CAMERA_XY / scrollableHeight;
    camera.position.x = -scrollY * windowSize.width * ANIMATION_CONSTANTS.SCROLL_SENSITIVITY.CAMERA_XY / scrollableHeight;

    // Adjust octahedron position and rotation
    octahedron.position.x = OBJECT_POSITIONS.OCTAHEDRON_INITIAL.x + scrollY * windowSize.height * ANIMATION_CONSTANTS.SCROLL_SENSITIVITY.OCTAHEDRON.POSITION / scrollableHeight;
    octahedron.position.y = OBJECT_POSITIONS.OCTAHEDRON_INITIAL.y + 5 - scrollY * windowSize.height * ANIMATION_CONSTANTS.SCROLL_SENSITIVITY.OCTAHEDRON.Y_POSITION / scrollableHeight;
    octahedron.position.z = OBJECT_POSITIONS.OCTAHEDRON_INITIAL.z - scrollY * windowSize.height * ANIMATION_CONSTANTS.SCROLL_SENSITIVITY.OCTAHEDRON.Z_POSITION / scrollableHeight;

    octahedron.rotation.x += ANIMATION_CONSTANTS.SCROLL_SENSITIVITY.OCTAHEDRON.ROTATION_X * scrollY;
    octahedron.rotation.y += ANIMATION_CONSTANTS.SCROLL_SENSITIVITY.OCTAHEDRON.ROTATION_Y * scrollY;

    // Update camera look at
    camera.lookAt(
      OBJECT_POSITIONS.CAMERA_LOOKAT.x,
      OBJECT_POSITIONS.CAMERA_LOOKAT.y,
      OBJECT_POSITIONS.CAMERA_LOOKAT.z
    );
  }, [scrollPosition.scrollY, scrollableHeight, windowSize.width, windowSize.height]);

  // Handle mouse interactions
  useEffect(() => {
    if (!objectsRef.current.icosahedron) return;

    const icosahedron = objectsRef.current.icosahedron;

    if (mouseState.isActive && mouseState.displacement) {
      // Reset rotation speeds when mouse is active
      rotationSpeedRef.current = { x: 0, y: 0, z: 0 };

      // Apply mouse-based rotation
      icosahedron.rotation.x -= mouseState.displacement.y * ANIMATION_CONSTANTS.MOUSE_INTERACTION.ROTATION_SENSITIVITY;
      icosahedron.rotation.y -= mouseState.displacement.x * ANIMATION_CONSTANTS.MOUSE_INTERACTION.ROTATION_SENSITIVITY;
    } else if (!mouseState.isActive) {
      // Restore automatic rotation when mouse becomes inactive
      rotationSpeedRef.current = {
        x: (Math.random() - 0.5) * ANIMATION_CONSTANTS.ROTATION_SPEEDS.RANDOM_RANGE,
        y: (Math.random() - 0.5) * ANIMATION_CONSTANTS.ROTATION_SPEEDS.RANDOM_RANGE,
        z: (Math.random() - 0.5) * ANIMATION_CONSTANTS.ROTATION_SPEEDS.RANDOM_RANGE
      };
    }
  }, [mouseState.isActive, mouseState.displacement]);

  // Handle window resize
  useEffect(() => {
    if (!cameraRef.current || !rendererRef.current) return;

    const camera = cameraRef.current;
    const renderer = rendererRef.current;

    // Update aspect ratio and camera
    const newAspectRatio = windowSize.width / windowSize.height;
    const cameraWidth = ANIMATION_CONSTANTS.THREE_JS.CAMERA_WIDTH;
    const newCameraHeight = cameraWidth / newAspectRatio;

    camera.left = -cameraWidth;
    camera.right = cameraWidth;
    camera.top = newCameraHeight;
    camera.bottom = -newCameraHeight;
    camera.updateProjectionMatrix();

    // Update renderer size
    renderer.setSize(windowSize.width, windowSize.height);
    renderer.domElement.style.height = `${windowSize.height * ANIMATION_CONSTANTS.THREE_JS.CANVAS_SIZE_MULTIPLIER}px`;
    renderer.domElement.style.width = `${windowSize.width * ANIMATION_CONSTANTS.THREE_JS.CANVAS_SIZE_MULTIPLIER}px`;

    // Update geometry sizes
    const newSize = calculateSize(windowSize.width);
    sizeRef.current = newSize;

    // Update dodecahedron and cube geometries
    const newGeometry1 = createDodecahedron(newSize * 4 / 9);
    updateThickLines(1, new THREE.EdgesGeometry(newGeometry1), 0.02, cylindersRef.current);

    const newGeometry3 = new THREE.BoxGeometry(newSize * 0.4 * 2 / 3, newSize * 0.4 * 2 / 3, newSize * 0.4 * 2 / 3);
    updateThickLines(3, new THREE.EdgesGeometry(newGeometry3), 0.02, cylindersRef.current);
  }, [windowSize.width, windowSize.height]);

  return mountRef;
};
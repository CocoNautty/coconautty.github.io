import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { ANIMATION_CONSTANTS, OBJECT_POSITIONS, MATERIAL_CONSTANTS } from '../constants';
import { createAllGeometries, calculateSize, updateThickLines, createDodecahedron, updateLineResolution, updateVelocityBlur } from '../utils/geometryUtils';
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
  const needsRenderRef = useRef(true);
  const lastRenderTimeRef = useRef(0);
  const linesRef = useRef([[], [], [], []]);
  const sizeRef = useRef(1);

  // Adaptive performance tracking
  const frameTimeHistoryRef = useRef([]);
  const currentTargetFrameTimeRef = useRef(ANIMATION_CONSTANTS.PERFORMANCE.MIN_FRAME_TIME);
  const performanceModeRef = useRef('normal'); // 'normal', 'reduced', 'minimal'
  
  // Rotation state refs
  const rotationSpeedRef = useRef({ x: 0, y: 0, z: 0 });
  const targetSpeedRef = useRef({ x: 0, y: 0, z: 0 });

  // Smooth interpolation state refs (camera target removed)
  const octahedronTargetRef = useRef(new THREE.Vector3(
    OBJECT_POSITIONS.OCTAHEDRON_INITIAL.x,
    OBJECT_POSITIONS.OCTAHEDRON_INITIAL.y,
    OBJECT_POSITIONS.OCTAHEDRON_INITIAL.z
  ));
  const currentScrollRef = useRef(0);

  // Temporal smoothing for position history (camera removed)
  const positionHistoryRef = useRef({
    octahedron: []
  });
  const velocityRef = useRef({
    octahedron: new THREE.Vector3()
  });

  // Custom hooks for interactions
  const scrollPosition = useScrollPosition(16);
  const mouseState = useMouseInteraction(
    ANIMATION_CONSTANTS.MOUSE_INTERACTION.THROTTLE_DELAY,
    ANIMATION_CONSTANTS.MOUSE_INTERACTION.INACTIVITY_TIMEOUT
  );
  const windowSize = useWindowResize(150);

  // Helper function for temporal position smoothing
  const updatePositionHistory = (objectName, currentPosition) => {
    const history = positionHistoryRef.current[objectName];
    const maxSamples = ANIMATION_CONSTANTS.PERFORMANCE.MOTION_BLUR_SAMPLES;
    
    // Add current position to history
    history.push(currentPosition.clone());
    
    // Keep only the last N samples
    if (history.length > maxSamples) {
      history.shift();
    }
    
    // Calculate velocity (change in position)
    if (history.length >= 2) {
      const prevPos = history[history.length - 2];
      const currPos = history[history.length - 1];
      velocityRef.current[objectName].subVectors(currPos, prevPos);
    }
    
    // Return smoothed position using exponential moving average
    if (history.length === 1) {
      return currentPosition.clone();
    }
    
    const smoothed = new THREE.Vector3();
    let totalWeight = 0;
    
    for (let i = 0; i < history.length; i++) {
      const weight = Math.pow(ANIMATION_CONSTANTS.PERFORMANCE.TEMPORAL_SMOOTHING_FACTOR, history.length - 1 - i);
      smoothed.addScaledVector(history[i], weight);
      totalWeight += weight;
    }
    
    return smoothed.divideScalar(totalWeight);
  };

  // Performance monitoring and adaptive scaling
  const updatePerformance = (frameTime) => {
    const history = frameTimeHistoryRef.current;
    history.push(frameTime);
    
    // Keep only last 10 frame times for average
    if (history.length > 10) {
      history.shift();
    }
    
    // Calculate average frame time
    const avgFrameTime = history.reduce((sum, time) => sum + time, 0) / history.length;
    
    // Determine performance mode and adjust settings
    if (avgFrameTime > ANIMATION_CONSTANTS.PERFORMANCE.MAX_FRAME_TIME) {
      // Poor performance - reduce quality
      if (performanceModeRef.current !== 'minimal') {
        performanceModeRef.current = 'minimal';
        currentTargetFrameTimeRef.current = ANIMATION_CONSTANTS.PERFORMANCE.MAX_FRAME_TIME;
        
        // Reduce line opacity for better performance
        updateVelocityBlur(linesRef.current, new THREE.Vector3(), 0, 0.5);
      }
    } else if (avgFrameTime > ANIMATION_CONSTANTS.PERFORMANCE.ADAPTIVE_FPS_THRESHOLD) {
      // Moderate performance - some reductions
      if (performanceModeRef.current !== 'reduced') {
        performanceModeRef.current = 'reduced';
        currentTargetFrameTimeRef.current = 50; // 20fps
        
        // Slightly reduce line opacity
        updateVelocityBlur(linesRef.current, new THREE.Vector3(), 0, 0.7);
      }
    } else {
      // Good performance - full quality
      if (performanceModeRef.current !== 'normal') {
        performanceModeRef.current = 'normal';
        currentTargetFrameTimeRef.current = ANIMATION_CONSTANTS.PERFORMANCE.MIN_FRAME_TIME;
        
        // Restore full line opacity
        updateVelocityBlur(linesRef.current, new THREE.Vector3(), 0, MATERIAL_CONSTANTS.LINE_OPACITY);
      }
    }
  };

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
    const { groups } = createAllGeometries(sizeRef.current, linesRef.current, windowSize.width, windowSize.height);
    
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

    // Animation loop with adaptive performance monitoring
    const animate = (currentTime) => {
      if (!prefersReducedMotion && sceneRef.current && rendererRef.current && cameraRef.current) {
        const { dodecahedron, octahedron, icosahedron } = objectsRef.current;
        
        // Adaptive frame rate limiting
        const deltaTime = currentTime - lastRenderTimeRef.current;
        if (deltaTime < currentTargetFrameTimeRef.current) {
          animationRef.current = requestAnimationFrame(animate);
          return;
        }
        
        // Update performance metrics
        updatePerformance(deltaTime);
        lastRenderTimeRef.current = currentTime;

        let hasChanges = false;

        // Camera positioning removed from animation loop - handled in scroll useEffect for immediate response

        if (octahedron) {
          const oldOctPos = octahedron.position.clone();
          octahedron.position.lerp(octahedronTargetRef.current, ANIMATION_CONSTANTS.PERFORMANCE.SMOOTH_FACTOR);
          
          // Track position for velocity calculation only (don't apply to actual position)
          updatePositionHistory('octahedron', octahedron.position);
          
          if (oldOctPos.distanceTo(octahedron.position) > 0.001) hasChanges = true;
        }

        // Apply velocity-based blur effects (octahedron velocity only)
        const octahedronVelocity = velocityRef.current.octahedron;
        
        if (octahedronVelocity.length() > 0.01) {
          updateVelocityBlur(
            linesRef.current, 
            octahedronVelocity, 
            ANIMATION_CONSTANTS.PERFORMANCE.VELOCITY_BLUR_FACTOR,
            MATERIAL_CONSTANTS.LINE_OPACITY
          );
          hasChanges = true;
        }

        // Rotate objects based on target and current speeds
        if (dodecahedron) {
          const oldRotation = { ...dodecahedron.rotation };
          dodecahedron.rotation.x -= (targetSpeedRef.current.x - rotationSpeedRef.current.x) * ANIMATION_CONSTANTS.ROTATION_SPEEDS.DODECAHEDRON_FACTOR;
          dodecahedron.rotation.y -= (targetSpeedRef.current.y - rotationSpeedRef.current.y) * ANIMATION_CONSTANTS.ROTATION_SPEEDS.DODECAHEDRON_FACTOR;
          dodecahedron.rotation.z -= (targetSpeedRef.current.z - rotationSpeedRef.current.z) * ANIMATION_CONSTANTS.ROTATION_SPEEDS.DODECAHEDRON_FACTOR;
          if (Math.abs(oldRotation.x - dodecahedron.rotation.x) > 0.001) hasChanges = true;
        }

        if (octahedron) {
          const oldRotation = { ...octahedron.rotation };
          octahedron.rotation.x += (targetSpeedRef.current.x - rotationSpeedRef.current.x) * ANIMATION_CONSTANTS.ROTATION_SPEEDS.OCTAHEDRON_FACTOR;
          octahedron.rotation.y += (targetSpeedRef.current.y - rotationSpeedRef.current.y) * ANIMATION_CONSTANTS.ROTATION_SPEEDS.OCTAHEDRON_FACTOR;
          octahedron.rotation.z += (targetSpeedRef.current.z - rotationSpeedRef.current.z) * ANIMATION_CONSTANTS.ROTATION_SPEEDS.OCTAHEDRON_FACTOR;
          if (Math.abs(oldRotation.x - octahedron.rotation.x) > 0.001) hasChanges = true;
        }

        // Auto-rotate icosahedron when mouse is not active
        if (icosahedron && !mouseState.isActive) {
          const oldRotation = { ...icosahedron.rotation };
          icosahedron.rotation.x += rotationSpeedRef.current.x * ANIMATION_CONSTANTS.ROTATION_SPEEDS.ICOSAHEDRON_FACTOR;
          icosahedron.rotation.y += rotationSpeedRef.current.y * ANIMATION_CONSTANTS.ROTATION_SPEEDS.ICOSAHEDRON_FACTOR;
          icosahedron.rotation.z += rotationSpeedRef.current.z * ANIMATION_CONSTANTS.ROTATION_SPEEDS.ICOSAHEDRON_FACTOR;
          if (Math.abs(oldRotation.x - icosahedron.rotation.x) > 0.001) hasChanges = true;
        }

        // Only render if there are changes or forced render needed
        if (hasChanges || needsRenderRef.current) {
          rendererRef.current.render(sceneRef.current, cameraRef.current);
          needsRenderRef.current = false;
        }
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

  // Handle scroll-based animations (reverted to original direct approach)
  useEffect(() => {
    if (!cameraRef.current || !objectsRef.current.octahedron || !scrollableHeight) return;

    const camera = cameraRef.current;
    const octahedron = objectsRef.current.octahedron;
    const scrollY = scrollPosition.scrollY;
    const scrollDelta = scrollY - currentScrollRef.current;
    currentScrollRef.current = scrollY;

    // Direct camera position updates (immediate response like original)
    camera.position.y = -scrollY * windowSize.height * ANIMATION_CONSTANTS.SCROLL_SENSITIVITY.CAMERA_XY / scrollableHeight;
    camera.position.x = 0; // Keep horizontal fixed to prevent drift

    // Update octahedron target position for smooth movement
    octahedronTargetRef.current.set(
      OBJECT_POSITIONS.OCTAHEDRON_INITIAL.x + scrollY * windowSize.height * ANIMATION_CONSTANTS.SCROLL_SENSITIVITY.OCTAHEDRON.POSITION / scrollableHeight,
      OBJECT_POSITIONS.OCTAHEDRON_INITIAL.y + 5 - scrollY * windowSize.height * ANIMATION_CONSTANTS.SCROLL_SENSITIVITY.OCTAHEDRON.Y_POSITION / scrollableHeight,
      OBJECT_POSITIONS.OCTAHEDRON_INITIAL.z - scrollY * windowSize.height * ANIMATION_CONSTANTS.SCROLL_SENSITIVITY.OCTAHEDRON.Z_POSITION / scrollableHeight
    );

    // Update octahedron rotation (immediate for responsiveness)
    octahedron.rotation.x += ANIMATION_CONSTANTS.SCROLL_SENSITIVITY.OCTAHEDRON.ROTATION_X * scrollDelta;
    octahedron.rotation.y += ANIMATION_CONSTANTS.SCROLL_SENSITIVITY.OCTAHEDRON.ROTATION_Y * scrollDelta;

    // Update camera look at
    camera.lookAt(
      OBJECT_POSITIONS.CAMERA_LOOKAT.x,
      OBJECT_POSITIONS.CAMERA_LOOKAT.y,
      OBJECT_POSITIONS.CAMERA_LOOKAT.z
    );

    // Force a render since scroll changed the scene
    needsRenderRef.current = true;
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
      
      // Force render on mouse interaction
      needsRenderRef.current = true;
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
    updateThickLines(1, new THREE.EdgesGeometry(newGeometry1), 0.002, linesRef.current, windowSize.width, windowSize.height);

    const newGeometry3 = new THREE.BoxGeometry(newSize * 0.4 * 2 / 3, newSize * 0.4 * 2 / 3, newSize * 0.4 * 2 / 3);
    updateThickLines(3, new THREE.EdgesGeometry(newGeometry3), 0.002, linesRef.current, windowSize.width, windowSize.height);

    // Update resolution for all line materials
    updateLineResolution(linesRef.current, windowSize.width, windowSize.height);

    // Force render after resize
    needsRenderRef.current = true;
  }, [windowSize.width, windowSize.height]);

  return mountRef;
};
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeBackground = ({scrollableheight}) => {
    const mountRef = useRef(null);
    const cameraRef = useRef(null);
    const rendererRef = useRef(null);
    const sceneRef = useRef(null);
    const animationRef = useRef(null); // Store animation frame reference for cleanup
    const mouseActiveRef = useRef(false); // Flag to determine if mouse is active
    const rotationSpeedRef = useRef({
        x: 0,
        y: 0,
        z: 0
    }); // Store current rotation speeds
    const lastMousePositionRef = useRef({ x: 0, y: 0 }); // Track last mouse position

    useEffect(() => {
        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        // Scene setup
        const scene = new THREE.Scene();

        let windowWidth = window.innerWidth;
        let windowHeight = window.innerHeight;

        // Set up orthographic camera
        const aspectRatio = windowWidth / windowHeight;
        let cameraWidth = 5; // Width of the camera view
        const cameraHeight = cameraWidth / aspectRatio; // Height based on aspect ratio
        const camera = new THREE.OrthographicCamera(
            -cameraWidth,   // left
            cameraWidth,    // right
            cameraHeight,   // top
            -cameraHeight,  // bottom
            0.1,            // near
            1000            // far
        );

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

        // Set the size of the renderer
        renderer.setSize(windowWidth, windowHeight);
        renderer.setPixelRatio(window.devicePixelRatio); // Set pixel ratio for high-DPI displays
        mountRef.current.appendChild(renderer.domElement);

        const geometry = new THREE.DodecahedronGeometry(5, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0xcccccc, wireframe: true });
        const dodecahedron = new THREE.Mesh(geometry, material);
        scene.add(dodecahedron);

        // Position the camera
        camera.position.set(0, 0, 10);
        let camera_lookat = new THREE.Vector3(1.5, 5, 0);
        camera.lookAt(camera_lookat);

        // Store references
        cameraRef.current = camera;
        rendererRef.current = renderer;
        sceneRef.current = scene;

        // Function to set random rotation speeds
        const setRandomRotationSpeeds = () => {
            rotationSpeedRef.current = {
                x: (Math.random() - 0.5) * 0.005, // Random speed for x-axis
                y: (Math.random() - 0.5) * 0.005, // Random speed for y-axis
                z: (Math.random() - 0.5) * 0.005  // Random speed for z-axis
            };
        };

        const resetRandomRotationSpeeds = () => {
            rotationSpeedRef.current = {
                x: 0,
                y: 0,
                z: 0
            };
        };

        // Initial random rotation speeds
        setRandomRotationSpeeds();

        // Animation loop
        const animate = () => {
            if (!prefersReducedMotion) { // Only animate if reduced motion is not preferred
                // Rotate dodecahedron
                if (mouseActiveRef.current) {
                    // If mouse is active, do not rotate automatically
                    // Optionally, you can also reset the rotation speed or direction here
                } else {
                    // If mouse is not active, rotate automatically
                    dodecahedron.rotation.x += rotationSpeedRef.current.x; // Rotate the dodecahedron
                    dodecahedron.rotation.y += rotationSpeedRef.current.y;
                    dodecahedron.rotation.z += rotationSpeedRef.current.z;
                }
                renderer.render(scene, camera);
                animationRef.current = requestAnimationFrame(animate);
            }
        };

        // Start the animation loop
        if (!prefersReducedMotion) {
            animate();
        }

        // Mouse move event
        const onMouseMove = (event) => {
            mouseActiveRef.current = true; // Set mouse active flag
            if (!prefersReducedMotion) { // Only rotate dodecahedron if reduced motion is not preferred
                resetRandomRotationSpeeds(); // Reset rotation speed when mouse is active
                // Calculate displacement based on the last mouse position
                const currentMousePosition = { x: event.clientX, y: event.clientY };

                // Calculate the displacement
                const displacementX = currentMousePosition.x - lastMousePositionRef.current.x;
                const displacementY = currentMousePosition.y - lastMousePositionRef.current.y;

                // Update rotation based on displacement
                dodecahedron.rotation.x -= displacementY * 0.001; // Adjust sensitivity as needed
                dodecahedron.rotation.y -= displacementX * 0.001; // Adjust sensitivity as needed

                // Store the current mouse position for the next event
                lastMousePositionRef.current = currentMousePosition;

                resetRandomRotationSpeeds(); // Change rotation direction when mouse is active
            }

            // Reset the mouse activity after a timeout
            clearTimeout(mouseActiveRef.current);
            mouseActiveRef.current = setTimeout(() => {
                mouseActiveRef.current = false; // Reset after inactivity
                setRandomRotationSpeeds(); // Change rotation direction when mouse is inactive
            }, 10); // 0.001 second of inactivity to reset
        };

        // Scroll event
        const onScroll = () => {
            if (!prefersReducedMotion) { // Only move camera if reduced motion is not preferred
                const scrollY = window.scrollY;

                camera.position.y = -scrollY * windowHeight * 0.01 / scrollableheight; // Adjust sensitivity as needed
                camera.position.x = -scrollY * windowWidth * 0.0002 / scrollableheight; // Adjust sensitivity as needed

                console.log("Camera position: ", camera.position);

                camera.lookAt(camera_lookat);
            }
        };

        // Resize event
        const onResize = () => {
            windowWidth = window.innerWidth;
            windowHeight = window.innerHeight;

            // Update aspect ratio and camera size
            const newAspectRatio = windowWidth / windowHeight;
            const newCameraHeight = cameraWidth / newAspectRatio; // Maintain proportional height

            camera.left = -cameraWidth;
            camera.right = cameraWidth;
            camera.top = newCameraHeight;
            camera.bottom = -newCameraHeight;


            camera.updateProjectionMatrix(); // Update the camera projection matrix
            renderer.setSize(windowWidth, windowHeight);
        };

        // Event listeners
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('scroll', onScroll);
        window.addEventListener('resize', onResize);

        // Cleanup
        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onResize);
            cancelAnimationFrame(animationRef.current); // Stop the animation loop when unmounting
            mountRef.current.removeChild(renderer.domElement);
        };
    }, []);

    return <div ref={mountRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }} />;
};

export default ThreeBackground;

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
    const targetSpeedRef = useRef({
        x: 0,
        y: 0,
        z: 0
    }); // Store target rotation speeds
    const lastMousePositionRef = useRef({ x: 0, y: 0 }); // Track last mouse position
    const sizeRef = useRef(1); // Default size of the icosahedron

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

        // Create icosahedron geometry and material
        const createIcosahedron = (size) => {
            return new THREE.IcosahedronGeometry(size, 0);
        };

        const calculateSize = (windowWidth) => {
            // Calculate A based on the desired maximum value
            const A = (1000 - 1) * 1;
            // Calculate the function value based on the current window width
            return Math.max((A / windowWidth), 1);
        };

        sizeRef.current = calculateSize(windowWidth); // Initial size of the icosahedron

        const createThickLines = (edges, thickness) => {
            const group = new THREE.Group();
            const lineMaterial = new THREE.MeshBasicMaterial({ color: 0xaaaaaa });
        
            for (let i = 0; i < edges.attributes.position.count; i += 2) {
                const start = new THREE.Vector3().fromBufferAttribute(edges.attributes.position, i);
                const end = new THREE.Vector3().fromBufferAttribute(edges.attributes.position, i + 1);
                const direction = new THREE.Vector3().subVectors(end, start);
                const length = direction.length();
                const midpoint = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);

                // Create a cylinder geometry
                const cylinderGeometry = new THREE.CylinderGeometry(thickness, thickness, length, 8);
                const cylinder = new THREE.Mesh(cylinderGeometry, lineMaterial);

                // Position the cylinder at the midpoint of the edge
                cylinder.position.copy(midpoint);

                // Align the cylinder with the edge direction
                cylinder.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.clone().normalize());

                // Add the cylinder to the group
                group.add(cylinder);
            }

            return group;
        };

        const geometry1 = new THREE.DodecahedronGeometry(5, 1);
        const geometry2 = createIcosahedron(sizeRef.current);

        const edges1 = new THREE.EdgesGeometry(geometry1);
        const edges2 = new THREE.EdgesGeometry(geometry2);

        // const material = new THREE.LineBasicMaterial({ color: 0xaaaaaa, linewidth: 2 });
        const dodecahedron = createThickLines(edges1, 0.01);
        const icosahedron = createThickLines(edges2, 0.01);

        scene.add(dodecahedron);
        scene.add(icosahedron);

        const adjustCameraXY = () => {
            const scrollY = window.scrollY;

            camera.position.y = -scrollY * windowHeight * 0.01 / scrollableheight; // Adjust sensitivity as needed
            camera.position.x = -scrollY * windowWidth * 0.005 / scrollableheight; // Adjust sensitivity as needed
        }

        // Position the camera
        camera.position.set(0, 0, 10);
        adjustCameraXY();
        let camera_lookat = new THREE.Vector3(2, 6, 0);
        camera.lookAt(camera_lookat);

        icosahedron.position.set(5.5, 8, 1);

        // Store references
        cameraRef.current = camera;
        rendererRef.current = renderer;
        sceneRef.current = scene;

        // Function to set random rotation speeds
        const setRandomRotationSpeeds = () => {
            rotationSpeedRef.current = {
                x: (Math.random() - 0.5) * 0.003, // Random speed for x-axis
                y: (Math.random() - 0.5) * 0.003, // Random speed for y-axis
                z: (Math.random() - 0.5) * 0.003  // Random speed for z-axis
            };
        };

        const resetRandomRotationSpeeds = () => {
            rotationSpeedRef.current = {
                x: 0,
                y: 0,
                z: 0
            };
        };

        // Function to set new random target rotation speeds
        const setRandomTargetSpeed = () => {
            targetSpeedRef.current = {
                x: (Math.random() - 0.5) * 0.01, // Increase the range for more noticeable rotation
                y: (Math.random() - 0.5) * 0.01,
                z: (Math.random() - 0.5) * 0.01
            };
        };

        // Initial target rotation speeds
        setRandomTargetSpeed();

        // Initial random rotation speeds
        setRandomRotationSpeeds();

        // Animation loop
        const animate = () => {
            if (!prefersReducedMotion) { // Only animate if reduced motion is not preferred
                // Rotate the icosahedron based on the current speeds
                icosahedron.rotation.x -= (targetSpeedRef.current.x - rotationSpeedRef.current.x) * 0.1;
                icosahedron.rotation.y -= (targetSpeedRef.current.y - rotationSpeedRef.current.y) * 0.1;
                icosahedron.rotation.z -= (targetSpeedRef.current.z - rotationSpeedRef.current.z) * 0.1;

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

        // Change target speeds at regular intervals
        const changeTargetSpeed = () => {
            setRandomTargetSpeed();
        };
        const speedChangeInterval = setInterval(changeTargetSpeed, 2000); // Change speed every 0.2 seconds

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
                dodecahedron.rotation.x -= displacementY * 0.0003; // Adjust sensitivity as needed
                dodecahedron.rotation.y -= displacementX * 0.0003; // Adjust sensitivity as needed

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
                adjustCameraXY();

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

            // Change the size of the IcosahedronGeometry
            sizeRef.current = calculateSize(windowWidth); // Example: Adjust size based on window width
            const newGeometry = createIcosahedron(sizeRef.current);
            icosahedron.geometry.dispose(); // Dispose of the old geometry to free up memory
            icosahedron.geometry = newGeometry; // Assign the new geometry
        };

        // Event listeners
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('scroll', onScroll);
        window.addEventListener('resize', onResize);

        // Cleanup
        return () => {
            clearInterval(speedChangeInterval); // Clear the interval
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

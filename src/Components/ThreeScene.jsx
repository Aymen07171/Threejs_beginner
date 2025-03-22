import { useEffect, useRef } from "react";
import * as THREE from "three";
import "../index.css";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const ThreeScene = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    console.log("ThreeScene mounted");

    // Initialize Three.js scene
    const scene = new THREE.Scene();

    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      45,
      sizes.width / sizes.height,
      0.1,
      100
    );
    camera.position.z = 20;

    // Lighting
    const light = new THREE.PointLight(0xffffff, 500, 500);
    light.position.set(0, 10, 10);
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    // Geometry and material
    const geometry = new THREE.SphereGeometry(3, 64, 64);
    const material = new THREE.MeshStandardMaterial({ color: "#00ff83" });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Renderer setup using the canvas from JSX
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.5;

    // Animation loop
    let animationFrameId;
    const animate = () => {
      controls.update();
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();
      renderer.setSize(sizes.width, sizes.height);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup function
    return () => {
      
      // console.log("ThreeScene unmounted");
      // Remove event listener
      window.removeEventListener("resize", handleResize);
      // Cancel animation frame
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      // Remove objects from scene
      scene.remove(mesh);
      scene.remove(light);
      scene.remove(ambientLight);
      // Dispose of resources
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      controls.dispose();
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 1,
      }}
    >
      <canvas ref={canvasRef} />
    </div>
  );
};

export default ThreeScene;
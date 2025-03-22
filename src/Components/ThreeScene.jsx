import { useEffect, useRef } from "react";
import * as THREE from "three";
import "../index.css";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";
import Header from "./Header";

const ThreeScene = () => {
  const canvasRef = useRef(null);
  const headerRef = useRef(null);

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
    // light.intensity = 1.2;
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    // Geometry and material
    const geometry = new THREE.SphereGeometry(3, 64, 64);
    const material = new THREE.MeshStandardMaterial({ color: "#00ff83", roughness: 0.5, metalness: 0.5 });
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

    // TimeLine Magic 
    const tl = gsap.timeline({ defaults: { duration: 1 } });
    tl.fromTo(mesh.scale, 
        { z: 0, x: 0, y: 0 }, 
        { z: 1, x: 1, y: 1, ease: "elastic.out(1, 0.3)" }
    )
    .fromTo(headerRef.current, 
        { y: "-100%", opacity: 0 }, 
        { y: "0%", opacity: 1, ease: "power4.out" }
    );

    // Mouse Animation Color 
    let mouseDown = false;
    let rgb = [];
    window.addEventListener("mousedown", () => (mouseDown = true));
    window.addEventListener("mouseup", () => (mouseDown = false));

    const handleMouseMove = (e) => {
      if (mouseDown) {
        rgb = [
          Math.round((e.pageX / sizes.width) * 255),
          Math.round((e.pageY / sizes.height) * 255),
          150,
        ];
    
        const newColor = new THREE.Color(`rgb(${rgb.join(",")})`);
        
        gsap.to(mesh.material.color, {
          r: newColor.r,
          g: newColor.g,
          b: newColor.b,
          duration: 0.5,
        });
      }
    };
    
    window.addEventListener("mousemove", handleMouseMove);

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
      // Remove event listeners
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", () => (mouseDown = true));
      window.removeEventListener("mouseup", () => (mouseDown = false));
      
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
    <div style={{ position: 'relative' }}>
      <div 
        ref={headerRef} 
        style={{ zIndex: 10 }}
        className="absolute top-0 left-0 w-full"
      >
        <Header />
      </div>
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
    </div>
  );
};

export default ThreeScene;
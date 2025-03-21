import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import '../index.css';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const ThreeScene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Safety check to ensure mountRef is available
    if (!mountRef.current) return;

    // Create scene, camera and renderer
    const scene = new THREE.Scene();

    // Sizes
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    // Fix PerspectiveCamera parameters (fov, aspect, near, far)
    const camera = new THREE.PerspectiveCamera(
      45, sizes.width/sizes.height, 0.1, 100
    );
    camera.position.z = 20;

    // Lights - add BEFORE rendering
    const light = new THREE.PointLight(0xffffff, 500, 500);  // Reduced intensity from 500 to 1
    light.position.set(0, 10, 10);
    scene.add(light);
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    // Create some geometry
    const geometry = new THREE.SphereGeometry(3, 64, 64);

    // Change to MeshStandardMaterial or MeshPhongMaterial to work with lights
    const material = new THREE.MeshStandardMaterial({ color: '#00ff83' });
    const mesh = new THREE.Mesh(geometry, material);

    // Add the mesh to the scene
    scene.add(mesh);

    // Create renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(sizes.width, sizes.height);

    // Add the renderer to the mountRef instead of document.body
    mountRef.current.appendChild(renderer.domElement);

    // Add OrbitControls - now using renderer.domElement which is inside mountRef
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.5;
    controls.dampingFactor = 0.1;
    controls.rotateSpeed = 0.5;

    // Create an animation loop to continuously render
    const animate = () => {
      // Update controls in the animation loop
      controls.update();
      
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    
    // Start the animation loop
    animate();

    // Resize event handler
    const handleResize = () => {
      // Update sizes
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;

      // Update camera
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();
      
      // Update renderer
      renderer.setSize(sizes.width, sizes.height);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      controls.dispose(); // Properly dispose controls
      
      // Make sure mountRef is still available during cleanup
      if (mountRef.current) {
        // Remove renderer from mountRef
        if (renderer.domElement && renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
      }
    };
  }, []);

  return (
    <div className='absolute top-0 left-0 z-1'>
      {/* <h1 className="text-red-500 absolute top-5 left-1/2 transform -translate-x-1/2">Give it a spin</h1> */}
      <div ref={mountRef}  />
    </div>
  );
};

export default ThreeScene;
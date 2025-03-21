import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeScene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // === THREE.JS CODE START ===
    
    // Create scene, camera and renderer
    const scene = new THREE.Scene();
    
    // Fix PerspectiveCamera parameters (fov, aspect, near, far)
    const camera = new THREE.PerspectiveCamera(
      45,800,600                              // Field of view                       // Far clipping plane
    );
    
    // Create some geometry
    const geometry = new THREE.SphereGeometry(3, 64, 64);
    const material = new THREE.MeshBasicMaterial({ color: '#5F99AE' }); // Changed to MeshBasicMaterial
    const mesh = new THREE.Mesh(geometry, material);
    
    // Add the mesh to the scene
    scene.add(mesh);
    
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(800, 600);
    
    // Add the renderer to the DOM
    document.body.appendChild(renderer.domElement);
    
    // Render the scene
    renderer.render(scene, camera);
    
    // Cleanup function
    return () => {
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef}  />;
};

export default ThreeScene;
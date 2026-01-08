import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 15;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xa855f7, 1.5);
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x22d3ee, 1.5);
    pointLight2.position.set(-10, -10, 10);
    scene.add(pointLight2);

    // Create floating geometric shapes
    const shapes: THREE.Mesh[] = [];
    const geometries = [
      new THREE.TorusGeometry(1, 0.4, 16, 100),
      new THREE.OctahedronGeometry(1),
      new THREE.IcosahedronGeometry(1),
      new THREE.TetrahedronGeometry(1),
    ];

    for (let i = 0; i < 12; i++) {
      const geometry = geometries[Math.floor(Math.random() * geometries.length)];
      const material = new THREE.MeshStandardMaterial({
        color: Math.random() > 0.5 ? 0xa855f7 : 0x22d3ee,
        wireframe: Math.random() > 0.5,
        transparent: true,
        opacity: 0.3,
        metalness: 0.8,
        roughness: 0.2,
      });

      const mesh = new THREE.Mesh(geometry, material);
      
      // Random position
      mesh.position.x = (Math.random() - 0.5) * 30;
      mesh.position.y = (Math.random() - 0.5) * 30;
      mesh.position.z = (Math.random() - 0.5) * 20;
      
      // Random rotation
      mesh.rotation.x = Math.random() * Math.PI;
      mesh.rotation.y = Math.random() * Math.PI;
      
      // Random scale
      const scale = 0.5 + Math.random() * 1.5;
      mesh.scale.setScalar(scale);

      shapes.push(mesh);
      scene.add(mesh);
    }

    // Create particle field
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 3000;
    const posArray = new Float32Array(particlesCount * 3);
    const colorsArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 50;
      posArray[i + 1] = (Math.random() - 0.5) * 50;
      posArray[i + 2] = (Math.random() - 0.5) * 30;

      // Random purple or cyan color
      if (Math.random() > 0.5) {
        colorsArray[i] = 0.66;     // R
        colorsArray[i + 1] = 0.33;  // G
        colorsArray[i + 2] = 0.97;  // B
      } else {
        colorsArray[i] = 0.13;      // R
        colorsArray[i + 1] = 0.83;  // G
        colorsArray[i + 2] = 0.93;  // B
      }
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Animation
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Animate shapes
      shapes.forEach((shape, index) => {
        shape.rotation.x = elapsedTime * 0.2 * (index % 2 === 0 ? 1 : -1);
        shape.rotation.y = elapsedTime * 0.3 * (index % 3 === 0 ? 1 : -1);
        
        // Floating motion
        shape.position.y += Math.sin(elapsedTime + index) * 0.003;
      });

      // Rotate particles slowly
      particles.rotation.y = elapsedTime * 0.02;
      particles.rotation.x = elapsedTime * 0.01;

      // Pulse lights
      pointLight1.intensity = 1.5 + Math.sin(elapsedTime * 2) * 0.3;
      pointLight2.intensity = 1.5 + Math.cos(elapsedTime * 2) * 0.3;

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      renderer.dispose();
      geometries.forEach(geo => geo.dispose());
      particlesGeometry.dispose();
      particlesMaterial.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 z-0"
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default ThreeBackground;

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const AINetworkBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationIdRef = useRef<number | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 50;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    // Create AI Network Nodes
    const createNetworkNodes = () => {
      const nodeGroup = new THREE.Group();
      const nodeCount = 50;
      const nodes: THREE.Vector3[] = [];

      // Brand colors
      const primaryColor = new THREE.Color(0x6C63FF);
      const secondaryColor = new THREE.Color(0xFF6B6B);
      const accentColor = new THREE.Color(0x60A5FA);

      // Create nodes
      for (let i = 0; i < nodeCount; i++) {
        const geometry = new THREE.SphereGeometry(0.8, 16, 16);
        const material = new THREE.MeshBasicMaterial({
          color: Math.random() > 0.7 ? primaryColor : 
                 Math.random() > 0.5 ? secondaryColor : accentColor,
          transparent: true,
          opacity: 0.6
        });
        
        const node = new THREE.Mesh(geometry, material);
        
        // Position nodes in a loose grid with some randomness
        const gridSize = 8;
        const spacing = 15;
        const x = ((i % gridSize) - gridSize / 2) * spacing + (Math.random() - 0.5) * 5;
        const y = (Math.floor(i / gridSize) - Math.floor(nodeCount / gridSize) / 2) * spacing + (Math.random() - 0.5) * 5;
        const z = (Math.random() - 0.5) * 30;
        
        node.position.set(x, y, z);
        nodes.push(node.position);
        nodeGroup.add(node);
      }

      return { nodeGroup, nodes };
    };

    // Create connections between nodes
    const createConnections = (nodes: THREE.Vector3[]) => {
      const connectionGroup = new THREE.Group();
      const material = new THREE.LineBasicMaterial({
        color: 0x6C63FF,
        transparent: true,
        opacity: 0.2
      });

      // Create connections between nearby nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const distance = nodes[i].distanceTo(nodes[j]);
          
          // Only connect nodes that are reasonably close
          if (distance < 25 && Math.random() > 0.8) {
            const geometry = new THREE.BufferGeometry().setFromPoints([nodes[i], nodes[j]]);
            const line = new THREE.Line(geometry, material);
            connectionGroup.add(line);
          }
        }
      }

      return connectionGroup;
    };

    // Create subtle floating particles
    const createDataParticles = () => {
      const particleGeometry = new THREE.BufferGeometry();
      const particleCount = 200;
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);
      const sizes = new Float32Array(particleCount);

      const color1 = new THREE.Color(0x6C63FF);
      const color2 = new THREE.Color(0xFF6B6B);

      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 100;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 50;

        const color = Math.random() > 0.5 ? color1 : color2;
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;

        sizes[i] = Math.random() * 2 + 0.5;
      }

      particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      particleGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

      const particleMaterial = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          mouse: { value: new THREE.Vector2(0, 0) }
        },
        vertexShader: `
          attribute float size;
          attribute vec3 color;
          varying vec3 vColor;
          uniform float time;
          uniform vec2 mouse;
          
          void main() {
            vColor = color;
            
            vec3 pos = position;
            // Subtle floating animation
            pos.y += sin(time * 0.5 + position.x * 0.01) * 2.0;
            pos.x += cos(time * 0.3 + position.y * 0.01) * 1.0;
            
            // Gentle mouse interaction
            vec2 mouseInfluence = mouse * 0.1;
            pos.xy += mouseInfluence;
            
            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            gl_PointSize = size * (300.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          varying vec3 vColor;
          
          void main() {
            vec2 center = gl_PointCoord - vec2(0.5);
            float distance = length(center);
            float alpha = 1.0 - smoothstep(0.0, 0.5, distance);
            gl_FragColor = vec4(vColor, alpha * 0.4);
          }
        `,
        blending: THREE.AdditiveBlending,
        depthTest: false,
        transparent: true,
        vertexColors: true
      });

      return new THREE.Points(particleGeometry, particleMaterial);
    };

    // Create geometric grid overlay
    const createGeometricGrid = () => {
      const gridGroup = new THREE.Group();
      const gridSize = 20;
      const divisions = 40;
      
      const gridHelper = new THREE.GridHelper(gridSize, divisions, 0x6C63FF, 0x6C63FF);
      gridHelper.material.opacity = 0.1;
      gridHelper.material.transparent = true;
      gridHelper.rotation.x = Math.PI / 2;
      gridHelper.position.z = -20;
      
      gridGroup.add(gridHelper);
      return gridGroup;
    };

    // Initialize scene elements
    const { nodeGroup, nodes } = createNetworkNodes();
    const connections = createConnections(nodes);
    const particles = createDataParticles();
    const grid = createGeometricGrid();
    
    scene.add(nodeGroup);
    scene.add(connections);
    scene.add(particles);
    scene.add(grid);

    // Mouse interaction
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const handleScroll = () => {
      scrollRef.current = window.scrollY * 0.001;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    // Elegant animation loop
    const clock = new THREE.Clock();
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Animate network nodes with subtle pulsing
      nodeGroup.children.forEach((node, index) => {
        const mesh = node as THREE.Mesh;
        const material = mesh.material as THREE.MeshBasicMaterial;
        
        // Subtle pulsing based on time and position
        const pulse = Math.sin(elapsedTime * 0.5 + index * 0.1) * 0.1 + 0.9;
        material.opacity = pulse * 0.6;
        
        // Gentle floating
        mesh.position.y += Math.sin(elapsedTime * 0.3 + index * 0.1) * 0.01;
      });

      // Update particle system
      const particleMaterial = particles.material as THREE.ShaderMaterial;
      particleMaterial.uniforms.time.value = elapsedTime;
      particleMaterial.uniforms.mouse.value.set(mouseRef.current.x, mouseRef.current.y);

      // Animate connections with data flow effect
      connections.children.forEach((line, index) => {
        const lineMaterial = (line as THREE.Line).material as THREE.LineBasicMaterial;
        const flow = Math.sin(elapsedTime * 2 + index * 0.5) * 0.5 + 0.5;
        lineMaterial.opacity = flow * 0.3;
      });

      // Smooth camera movement influenced by mouse
      const targetX = mouseRef.current.x * 2;
      const targetY = mouseRef.current.y * 2;
      
      camera.position.x += (targetX - camera.position.x) * 0.02;
      camera.position.y += (targetY - camera.position.y) * 0.02;
      camera.position.z = 50 + scrollRef.current * 5;
      
      // Subtle rotation
      nodeGroup.rotation.y += 0.001;
      connections.rotation.y += 0.001;

      renderer.render(scene, camera);
      animationIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
      
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ 
        background: 'linear-gradient(135deg, #0A0A0A 0%, #111111 50%, #0A0A0A 100%)'
      }}
    />
  );
};

export default AINetworkBackground; 
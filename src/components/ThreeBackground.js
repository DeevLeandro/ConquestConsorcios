// components/ThreeBackground.jsx (Versão Corrigida)
import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader, AdditiveBlending, BackSide } from 'three';
import { OrbitControls } from '@react-three/drei';

// Componente de partículas
function Particles() {
  const particlesRef = useRef();
  const count = 500;

  const positions = new Float32Array(count * 3);
  const sizes = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    // Posições em um anel
    const radius = 5 + Math.random() * 10;
    const theta = Math.random() * Math.PI * 2;
    
    positions[i * 3] = Math.cos(theta) * radius;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 2] = Math.sin(theta) * radius;
    
    sizes[i] = Math.random() * 0.1 + 0.05;
  }

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.001;
      particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        sizeAttenuation
        transparent
        opacity={0.8}
        color="#00aaff"
        blending={AdditiveBlending}
      />
    </points>
  );
}

// Componente de cartão flutuante
function FloatingCard({ imageUrl, position, index }) {
  const meshRef = useRef();
  const texture = useLoader(TextureLoader, imageUrl);
  
  useFrame((state) => {
    if (meshRef.current) {
      // Rotação suave
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2 + index) * 0.2;
      
      // Flutuação
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + index) * 0.2;
      
      // Escala dinâmica
      const scale = 1 + Math.sin(state.clock.elapsedTime * 0.3 + index) * 0.1;
      meshRef.current.scale.setScalar(scale);
    }
  });

  return (
    <mesh ref={meshRef} position={position} castShadow receiveShadow>
      <planeGeometry args={[3, 2]} />
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  );
}

// Componente de texto flutuante (usando geometria básica)
function FloatingText() {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[0, 2, 0]}>
      {/* Letra C */}
      <mesh position={[-1.5, 0, 0]}>
        <boxGeometry args={[0.5, 1, 0.2]} />
        <meshStandardMaterial color="#00aaff" emissive="#0066cc" emissiveIntensity={0.5} />
      </mesh>
      
      {/* Letra O */}
      <mesh position={[-0.5, 0, 0]}>
        <torusGeometry args={[0.3, 0.1, 16, 100]} />
        <meshStandardMaterial color="#00ffaa" emissive="#00aa66" emissiveIntensity={0.5} />
      </mesh>
      
      {/* Letra N */}
      <mesh position={[0.5, 0, 0]}>
        <boxGeometry args={[0.1, 1, 0.2]} />
        <meshStandardMaterial color="#aaff00" emissive="#66aa00" emissiveIntensity={0.5} />
      </mesh>
      
      {/* Letra Q */}
      <mesh position={[1.5, 0, 0]}>
        <torusGeometry args={[0.3, 0.1, 16, 100]} />
        <mesh position={[0.2, 0.2, 0]}>
          <boxGeometry args={[0.1, 0.4, 0.2]} />
          <meshStandardMaterial color="#ffaa00" emissive="#aa6600" emissiveIntensity={0.5} />
        </mesh>
        <meshStandardMaterial color="#ffaa00" emissive="#aa6600" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}

// Luzes
function Lighting() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#00aaff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff00aa" />
      <directionalLight
        position={[5, 5, 5]}
        intensity={0.8}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
    </>
  );
}

// Cena principal
function Scene({ images }) {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
    }
  });

  // Posições dos cartões em um círculo
  const cardPositions = [
    [-4, 0, 2],
    [4, 0, 2],
    [-4, 0, -2],
    [4, 0, -2],
  ];

  return (
    <group ref={groupRef}>
      <Lighting />
      <Particles />
      <FloatingText />
      
      {/* Cartões flutuantes */}
      {images.slice(0, 4).map((imageUrl, index) => (
        <FloatingCard
          key={index}
          imageUrl={imageUrl}
          position={cardPositions[index]}
          index={index}
        />
      ))}
      
      {/* Plano de fundo */}
      <mesh position={[0, 0, -10]} rotation={[0, 0, 0]}>
        <sphereGeometry args={[15, 32, 32]} />
        <meshBasicMaterial color="#001133" transparent opacity={0.1} side={BackSide} />
      </mesh>
    </group>
  );
}

// Componente principal
export default function ThreeBackground({ images }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-gray-900 via-blue-900 to-gray-900" />
    );
  }

  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        style={{
          background: 'linear-gradient(180deg, #0a0a2a 0%, #001133 50%, #0a0a2a 100%)'
        }}
      >
        <Scene images={images} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={true}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 4}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}
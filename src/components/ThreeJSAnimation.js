import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Text, Center } from '@react-three/drei';
import * as THREE from 'three';

function RotatingIcon({ children, position, rotationSpeed = 1 }) {
  const meshRef = useRef();
  
  useFrame((state) => {
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    meshRef.current.rotation.y += 0.01 * rotationSpeed;
  });

  return (
    <mesh ref={meshRef} position={position}>
      {children}
    </mesh>
  );
}

function IconsScene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, 10]} intensity={0.5} color="#00A8E8" />
      
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <RotatingIcon position={[-3, 0, 0]} rotationSpeed={0.8}>
          <torusGeometry args={[1, 0.3, 16, 100]} />
          <meshStandardMaterial color="#00A8E8" metalness={0.8} roughness={0.2} />
        </RotatingIcon>
      </Float>

      <Float speed={1.5} rotationIntensity={1} floatIntensity={0.5}>
        <RotatingIcon position={[0, 0, 0]} rotationSpeed={1}>
          <octahedronGeometry args={[1.2, 0]} />
          <meshStandardMaterial color="#007EA7" metalness={0.9} roughness={0.1} />
        </RotatingIcon>
      </Float>

      <Float speed={2.5} rotationIntensity={0.7} floatIntensity={0.5}>
        <RotatingIcon position={[3, 0, 0]} rotationSpeed={1.2}>
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#003459" metalness={0.7} roughness={0.3} />
        </RotatingIcon>
      </Float>

      <Center position={[0, -3, 0]}>
        <Text
          font="https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxK.woff"
          fontSize={0.8}
          color="#FFFFFF"
          anchorX="center"
          anchorY="middle"
        >
          CONQUEST
          <meshStandardMaterial color="#FFFFFF" metalness={0.5} roughness={0.5} />
        </Text>
      </Center>
    </>
  );
}

export default function ThreeJSAnimation() {
  return (
    <div className="threejs-container">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <Suspense fallback={null}>
          <IconsScene />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
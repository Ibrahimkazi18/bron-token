'use client'

import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls, useTexture } from '@react-three/drei'
import { Suspense } from 'react'

type Props = {
  className?: string;
};

function Token() {
  const texture = useTexture('/images/BronTokenLogo.png')

  return (
    <group rotation={[0, Math.PI / 2, 0]} scale={2.2}>
      <mesh>
        <cylinderGeometry args={[1, 1, 0.05, 64, 1, false]} />
        <meshStandardMaterial attach="material-0" color="gold" metalness={1} roughness={0.3} />
        <meshStandardMaterial attach="material-1" map={texture} metalness={0.8} roughness={0.2} />
        <meshStandardMaterial attach="material-2" map={texture} metalness={0.8} roughness={0.2} />
      </mesh>
      <directionalLight position={[0, 5, 0]} intensity={2.0} />
    </group>
  )
}

export default function Token3D({ className = ''}: Props) {
  return (
    <div className={`${className}`}>
      <Canvas camera={{ position: [0, 5, 0], fov: 50 }}>
        <ambientLight intensity={1.0} />
        <hemisphereLight color={'white'} groundColor={'white'} intensity={1.0} />
        <Suspense fallback={null}>
          <Token />
          <Environment preset='apartment' />
          <OrbitControls enableRotate={true} enableZoom={false} />
        </Suspense>
      </Canvas>
    </div>
  )
}
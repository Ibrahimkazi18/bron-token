'use client'

import { useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'
import { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'

export default function Basketball({ gameActive }: { gameActive: boolean }) {
  const { scene } = useGLTF('/basketball.glb')
  const rigidBodyRef = useRef<any>(null)

  const [dragStart, setDragStart] = useState<[number, number] | null>(null)
  const [dragVector, setDragVector] = useState<THREE.Vector3 | null>(null)

  const getTrajectoryPoints = (
  start: THREE.Vector3,
  velocity: THREE.Vector3,
  steps = 30,
  dt = 1 / 60 // smaller step time for better accuracy
): THREE.Vector3[] => {
  const gravity = new THREE.Vector3(0, -9.81, 0)
  const drag = 0.01 // fake air resistance
  const points: THREE.Vector3[] = []

  let position = start.clone()
  let vel = velocity.clone()

  for (let i = 0; i < steps; i++) {
    // Add current position to list
    points.push(position.clone())

    // Update velocity with gravity and drag
    vel.add(gravity.clone().multiplyScalar(dt))
    vel.multiplyScalar(1 - drag) // simulate slight air drag

    // Update position
    position = position.clone().add(vel.clone().multiplyScalar(dt))
  }

  return points
}

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (!gameActive) return;
      setDragStart([e.clientX, e.clientY])
    }

    const handleTouchStart = (e: TouchEvent) => {
      if (!gameActive) return;
      const touch = e.touches[0]
      setDragStart([touch.clientX, touch.clientY])
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!dragStart) return

      const [startX, startY] = dragStart
      const deltaX = e.clientX - startX
      const deltaY = e.clientY - startY

      const vector = new THREE.Vector3(-deltaX * 0.1, deltaY * 0.1, -deltaY * 0.1)
      setDragVector(vector)
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!dragStart) return
      const touch = e.touches[0]
      const [startX, startY] = dragStart
      const deltaX = touch.clientX - startX
      const deltaY = touch.clientY - startY
      setDragVector(new THREE.Vector3(-deltaX * 0.1, deltaY * 0.1, -deltaY * 0.1))
    }

    const handleMouseUp = () => {
      if (!rigidBodyRef.current || !dragVector) {
        setDragStart(null)
        return
      }

      rigidBodyRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true)
      rigidBodyRef.current.setAngvel({ x: 0, y: 0, z: 0 }, true)
       // Apply impulse with speed factor
  const throwStrength = 0.47 // adjust this
  rigidBodyRef.current.applyImpulse(dragVector.clone().multiplyScalar(throwStrength), true)

      setDragStart(null)
      setDragVector(null)
    }

    const handleTouchEnd = () => {
    handleMouseUp()
    }

    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)

    window.addEventListener('touchstart', handleTouchStart)
    window.addEventListener('touchmove', handleTouchMove)
    window.addEventListener('touchend', handleTouchEnd)

    return () => {
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)

      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)

    }
  }, [dragStart, dragVector])

  return (
    <>
      <RigidBody
        ref={rigidBodyRef}
        colliders="ball"
        restitution={0.7}
        friction={0.5}
        name="basketball"
        ccd
      >
        <primitive
          object={scene.clone()}
          scale={0.75}
          position={[0, 2.5, 4.5]}
          name="basketball"
        />
      </RigidBody>

      {/* 👇 Realistic trajectory dots */}
      {dragVector &&
        getTrajectoryPoints(new THREE.Vector3(0, 0.5, 4.5), dragVector).map(
          (point, index) => (
            <mesh key={index} position={point}>
              <sphereGeometry args={[0.05, 8, 8]} />
              <meshStandardMaterial color="black" />
            </mesh>
          )
        )}
    </>
  )
}

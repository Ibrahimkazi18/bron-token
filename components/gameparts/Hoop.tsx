import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Hoop({ onScore, gameActive = true }: { onScore?: () => void, gameActive?: boolean }) {
  const hoopRef = useRef<any>(null);
  const sensorRef = useRef<any>(null);

  const initialHoopPos = new THREE.Vector3(0, 0, 0);
  const initialSensorPos = new THREE.Vector3(0, 5.5, -8);

  useEffect(() => {
    if (!gameActive) {
      hoopRef.current?.setNextKinematicTranslation(initialHoopPos);
      sensorRef.current?.setNextKinematicTranslation(initialSensorPos);
    }
  }, [gameActive]);

  useFrame(({ clock }) => {
    if (!gameActive) return;

    const t = clock.getElapsedTime();
    const x = Math.sin(t * 0.4) * 3;

    hoopRef.current?.setNextKinematicTranslation(new THREE.Vector3(x, 0, 0));
    sensorRef.current?.setNextKinematicTranslation(new THREE.Vector3(x, 5.5, -8)); // new Y
  });

  return (
    <>
      {/* Moving Hoop Group */}
      <RigidBody ref={hoopRef} type="kinematicPosition" colliders="trimesh">
        <group>
          {/* Stand */}
          <mesh position={[0, 2.5, -8.9]}>
            <boxGeometry args={[0.5, 10, 0.3]} />
            <meshStandardMaterial color="#232b2b" />
          </mesh>

          {/* Backboard */}
          <mesh position={[0, 7, -8.7]}>
            <boxGeometry args={[6.8, 4, 0.1]} />
            <meshStandardMaterial color="#7b1113" />
          </mesh>

          {/* Ring */}
          <mesh position={[0, 6.5, -7.68]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[1, 0.05, 16, 100]} />
            <meshStandardMaterial color="maroon" />
          </mesh>

          {/* Net */}
          <mesh position={[0, 6.05, -7.68]}>
            <cylinderGeometry args={[1, 0.7, 0.8, 12, 1, true]} />
            <meshStandardMaterial color="white" wireframe transparent />
          </mesh>

          {/* Outline box - hoop */}
          <group>
            <mesh position={[0, 7.5, -8.6]}>
              <planeGeometry args={[2, 0.1]} />
              <meshBasicMaterial color="white" />
            </mesh>
            <mesh position={[0, 6.5, -8.6]}>
              <planeGeometry args={[2, 0.1]} />
              <meshBasicMaterial color="white" />
            </mesh>
            <mesh position={[1, 7, -8.6]}>
              <planeGeometry args={[0.1, 1]} />
              <meshBasicMaterial color="white" />
            </mesh>
            <mesh position={[-1, 7, -8.6]}>
              <planeGeometry args={[0.1, 1]} />
              <meshBasicMaterial color="white" />
            </mesh>
          </group>

          {/* Outline box - full backboard */}
          <group>
            <mesh position={[0, 8.6, -8.6]}>
              <planeGeometry args={[6.1, 0.1]} />
              <meshBasicMaterial color="white" />
            </mesh>
            <mesh position={[0, 5.4, -8.6]}>
              <planeGeometry args={[6.1, 0.1]} />
              <meshBasicMaterial color="white" />
            </mesh>
            <mesh position={[3, 7, -8.6]}>
              <planeGeometry args={[0.1, 3.1]} />
              <meshBasicMaterial color="white" />
            </mesh>
            <mesh position={[-3, 7, -8.6]}>
              <planeGeometry args={[0.1, 3.1]} />
              <meshBasicMaterial color="white" />
            </mesh>
          </group>
        </group>
      </RigidBody>

      {/* Sensor (attached to moving hoop) */}
      <RigidBody ref={sensorRef} type="kinematicPosition" sensor>
        <CuboidCollider
          args={[0.5, 0.1, 1]}
          position={[0, 0, 0]}
          onIntersectionEnter={({ other }) => {
            const otherRigidBody = other.rigidBodyObject;
            if (otherRigidBody?.name === "basketball") {
              onScore?.();
            }
          }}
        />
        <mesh>
          <boxGeometry args={[0.5, 0.2, 2]} />
          <meshStandardMaterial color="white" opacity={0} transparent />
        </mesh>
      </RigidBody>
    </>
  );
}

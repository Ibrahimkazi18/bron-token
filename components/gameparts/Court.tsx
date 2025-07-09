import { useTexture } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import * as THREE from 'three';

// Basketball Court
export default function Court() {
    const texture1 = useTexture('/images/wooden-floor.jpg');
    const texture2 = useTexture('/images/ceiling.jpg');
    // Enable repeating
  texture1.wrapS = THREE.RepeatWrapping
  texture1.wrapT = THREE.RepeatWrapping
  texture1.rotation = Math.PI / 2
  texture2.wrapS = THREE.RepeatWrapping
  texture2.wrapT = THREE.RepeatWrapping

  // Number of times to repeat the texture
  texture1.repeat.set(5, 5)
  texture2.repeat.set(2, 2)
  return (
    <>
      <group position={[0, 0, 0]}>
        {/* Wood-like ground */}
        <RigidBody type="fixed" colliders="trimesh">
            <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                <planeGeometry args={[20, 20]} />
                <meshStandardMaterial map={texture1} />
            </mesh>
            {/* Roof */}
            <mesh rotation={[Math.PI / 2, 0, 0]} position={[0,18,0]} receiveShadow>
                <planeGeometry args={[40, 20]} />
                <meshStandardMaterial map={texture2} />
            </mesh>
            
        {/* Half court line */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 3]}>
                <planeGeometry args={[20, 0.1]} />
                <meshBasicMaterial color="black" />
            </mesh>
        {/* Circle */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 3]}>
                <ringGeometry args={[3, 3.05, 64]} />
                <meshBasicMaterial color="black"/>
            </mesh>
        {/* 3pt arc */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, -12]}>
                <ringGeometry args={[8.5, 8.6, 64, 1, Math.PI, Math.PI]} />
                <meshBasicMaterial color="black" />
            </mesh>
        {/* paint area */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, -5.7]}>
                <planeGeometry args={[4.4, 0.1]} /> {/* line in between the semicircle */}
                <meshBasicMaterial color="black" />
            </mesh>
            
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[2.15, 0.01, -7.7]}>
                <planeGeometry args={[0.1, 4.6]} /> {/* right line */}
                <meshBasicMaterial color="black" />
            </mesh>

            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-2.15, 0.01, -7.7]}>
                <planeGeometry args={[0.1, 4.6]} /> {/* left line */}
                <meshBasicMaterial color="black" />
            </mesh>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, -5.7]}>
                <ringGeometry args={[2.1, 2.2, 64, 1, Math.PI, Math.PI]} /> {/*inner something circle */}
                <meshBasicMaterial color="black" />
            </mesh>
            </RigidBody>
    </group>
    </>
  )
}
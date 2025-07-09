import { useGLTF } from "@react-three/drei"
import { RigidBody } from "@react-three/rapier"

// CHAIRS
export default function Chairs() {
  const { scene } = useGLTF('/chair.glb')

  return (
    <RigidBody type="fixed" colliders="trimesh">
    {/* Bottom left row*/}
    <primitive object={scene.clone()} position={[-12,3,9]} rotation={[0,Math.PI/1.6,0]} scale={0.0025} />
    <primitive object={scene.clone()} position={[-12,3,7.5]} rotation={[0,Math.PI/1.6,0]} scale={0.0025} />
    <primitive object={scene.clone()} position={[-12,3,6]} rotation={[0,Math.PI/1.6,0]} scale={0.0025} />
    <primitive object={scene.clone()} position={[-12,3,4.5]} rotation={[0,Math.PI/1.6,0]} scale={0.0025} />
    <primitive object={scene.clone()} position={[-12,3,3]} rotation={[0,Math.PI/1.6,0]} scale={0.0025} />
    <primitive object={scene.clone()} position={[-12,3,1.5]} rotation={[0,Math.PI/1.6,0]} scale={0.0025} />
    <primitive object={scene.clone()} position={[-12,3,0]} rotation={[0,Math.PI/1.6,0]} scale={0.0025} />
    <primitive object={scene.clone()} position={[-12,3,-1.5]} rotation={[0,Math.PI/1.6,0]} scale={0.0025} />
    <primitive object={scene.clone()} position={[-12,3,-3]} rotation={[0,Math.PI/1.6,0]} scale={0.0025} />
    <primitive object={scene.clone()} position={[-12,3,-4.5]} rotation={[0,Math.PI/1.6,0]} scale={0.0025} />

    {/* Middle left row*/}
    <primitive object={scene.clone()} position={[-15,5,9]} rotation={[0,Math.PI/1.6,0]} scale={0.0025} />
    <primitive object={scene.clone()} position={[-15,5,7.5]} rotation={[0,Math.PI/1.6,0]} scale={0.0025} />
    <primitive object={scene.clone()} position={[-15,5,6]} rotation={[0,Math.PI/1.6,0]} scale={0.0025} />
    <primitive object={scene.clone()} position={[-15,5,4.5]} rotation={[0,Math.PI/1.6,0]} scale={0.0025} />
    <primitive object={scene.clone()} position={[-15,5,3]} rotation={[0,Math.PI/1.6,0]} scale={0.0025} />
    <primitive object={scene.clone()} position={[-15,5,1.5]} rotation={[0,Math.PI/1.6,0]} scale={0.0025} />
    <primitive object={scene.clone()} position={[-15,5,0]} rotation={[0,Math.PI/1.6,0]} scale={0.0025} />
    <primitive object={scene.clone()} position={[-15,5,-1.5]} rotation={[0,Math.PI/1.6,0]} scale={0.0025} />
    <primitive object={scene.clone()} position={[-15,5,-3]} rotation={[0,Math.PI/1.6,0]} scale={0.0025} />
    <primitive object={scene.clone()} position={[-15,5,-4.5]} rotation={[0,Math.PI/1.6,0]} scale={0.0025} />

    {/* Top left row*/}
    <primitive object={scene.clone()} position={[-19,7,9]} rotation={[0,Math.PI/1.6,0]} scale={0.0025} />
    <primitive object={scene.clone()} position={[-19,7,7.5]} rotation={[0,Math.PI/1.6,0]} scale={0.0025} />
    <primitive object={scene.clone()} position={[-19,7,6]} rotation={[0,Math.PI/1.6,0]} scale={0.0025} />
    <primitive object={scene.clone()} position={[-19,7,4.5]} rotation={[0,Math.PI/1.6,0]} scale={0.0025} />
    <primitive object={scene.clone()} position={[-19,7,3]} rotation={[0,Math.PI/1.6,0]} scale={0.0025} />
    <primitive object={scene.clone()} position={[-19,7,1.5]} rotation={[0,Math.PI/1.6,0]} scale={0.0025} />
    <primitive object={scene.clone()} position={[-19,7,0]} rotation={[0,Math.PI/1.6,0]} scale={0.0025} />
    <primitive object={scene.clone()} position={[-19,7,-1.5]} rotation={[0,Math.PI/1.6,0]} scale={0.0025} />
    <primitive object={scene.clone()} position={[-19,7,-3]} rotation={[0,Math.PI/1.6,0]} scale={0.0025} />
    <primitive object={scene.clone()} position={[-19,7,-4.5]} rotation={[0,Math.PI/1.6,0]} scale={0.0025} />
    <primitive object={scene.clone()} position={[-19,7,-6]} rotation={[0,Math.PI/1.6,0]} scale={0.0025} />
    <primitive object={scene.clone()} position={[-19,7,-7.5]} rotation={[0,Math.PI/1.6,0]} scale={0.0025} />
    <primitive object={scene.clone()} position={[-19,7,-9]} rotation={[0,Math.PI/1.6,0]} scale={0.0025} />
    
    {/* Bottom right row*/}
    <primitive object={scene.clone()} position={[12,3,9]} rotation={[0,Math.PI/0.62,0]} scale={0.0025} />
    <primitive object={scene.clone()} position={[12,3,7.5]} rotation={[0,Math.PI/0.62,0]} scale={0.0025} />
    <primitive object={scene.clone()} position={[12,3,6]} rotation={[0,Math.PI/0.62,0]} scale={0.0025} />
    <primitive object={scene.clone()} position={[12,3,4.5]} rotation={[0,Math.PI/0.62,0]} scale={0.0025} />
    <primitive object={scene.clone()} position={[12,3,3]} rotation={[0,Math.PI/0.62,0]} scale={0.0025} />
    <primitive object={scene.clone()} position={[12,3,1.5]} rotation={[0,Math.PI/0.62,0]} scale={0.0025} />
    <primitive object={scene.clone()} position={[12,3,0]} rotation={[0,Math.PI/0.62,0]} scale={0.0025} />
    <primitive object={scene.clone()} position={[12,3,-1.5]} rotation={[0,Math.PI/0.62,0]} scale={0.0025} />
    <primitive object={scene.clone()} position={[12,3,-3]} rotation={[0,Math.PI/0.62,0]} scale={0.0025} />
    <primitive object={scene.clone()} position={[12,3,-4.5]} rotation={[0,Math.PI/0.62,0]} scale={0.0025} />
    
    {/* Middle right row*/}
    <primitive object={scene.clone()} position={[15,5,9]} rotation={[0,Math.PI/0.62,0]} scale={0.0025} />
    <primitive object={scene.clone()} position={[15,5,7.5]} rotation={[0,Math.PI/0.62,0]} scale={0.0025} />
    <primitive object={scene.clone()} position={[15,5,6]} rotation={[0,Math.PI/0.62,0]} scale={0.0025} />
    <primitive object={scene.clone()} position={[15,5,4.5]} rotation={[0,Math.PI/0.62,0]} scale={0.0025} />
    <primitive object={scene.clone()} position={[15,5,3]} rotation={[0,Math.PI/0.62,0]} scale={0.0025} />
    <primitive object={scene.clone()} position={[15,5,1.5]} rotation={[0,Math.PI/0.62,0]} scale={0.0025} />
    <primitive object={scene.clone()} position={[15,5,0]} rotation={[0,Math.PI/0.62,0]} scale={0.0025} />
    <primitive object={scene.clone()} position={[15,5,-1.5]} rotation={[0,Math.PI/0.62,0]} scale={0.0025} />
    <primitive object={scene.clone()} position={[15,5,-3]} rotation={[0,Math.PI/0.62,0]} scale={0.0025} />
    <primitive object={scene.clone()} position={[15,5,-4.5]} rotation={[0,Math.PI/0.62,0]} scale={0.0025} />

    {/* Top right row*/}
    <primitive object={scene.clone()} position={[19,7,9]} rotation={[0,Math.PI/0.62,0]} scale={0.0025} />
    <primitive object={scene.clone()} position={[19,7,7.5]} rotation={[0,Math.PI/0.62,0]} scale={0.0025} />
    <primitive object={scene.clone()} position={[19,7,6]} rotation={[0,Math.PI/0.62,0]} scale={0.0025} />
    <primitive object={scene.clone()} position={[19,7,4.5]} rotation={[0,Math.PI/0.62,0]} scale={0.0025} />
    <primitive object={scene.clone()} position={[19,7,3]} rotation={[0,Math.PI/0.62,0]} scale={0.0025} />
    <primitive object={scene.clone()} position={[19,7,1.5]} rotation={[0,Math.PI/0.62,0]} scale={0.0025} />
    <primitive object={scene.clone()} position={[19,7,0]} rotation={[0,Math.PI/0.62,0]} scale={0.0025} />
    <primitive object={scene.clone()} position={[19,7,-1.5]} rotation={[0,Math.PI/0.62,0]} scale={0.0025} />
    <primitive object={scene.clone()} position={[19,7,-3]} rotation={[0,Math.PI/0.62,0]} scale={0.0025} />
    <primitive object={scene.clone()} position={[19,7,-4.5]} rotation={[0,Math.PI/0.62,0]} scale={0.0025} />
    <primitive object={scene.clone()} position={[19,7,-6]} rotation={[0,Math.PI/0.62,0]} scale={0.0025} />
    <primitive object={scene.clone()} position={[19,7,-7.5]} rotation={[0,Math.PI/0.62,0]} scale={0.0025} />
    <primitive object={scene.clone()} position={[19,7,-9]} rotation={[0,Math.PI/0.62,0]} scale={0.0025} />
    </RigidBody>
  )
}
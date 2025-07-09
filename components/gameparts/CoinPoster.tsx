import { useTexture } from "@react-three/drei"
import { RigidBody } from "@react-three/rapier"

export default function CoinPoster() {
  const texture = useTexture('/images/BronTokenLogo.png')

  return (
    <RigidBody type="fixed" colliders="trimesh">
    <mesh position={[0, 13, -9.9]} rotation={[0, 0, 0]}>
      <planeGeometry args={[4.5, 4]} />
      <meshStandardMaterial map={texture} transparent={true}/>
    </mesh>
    </RigidBody>
  )
}
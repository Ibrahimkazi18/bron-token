import { RigidBody } from "@react-three/rapier";

// Stands for simulating a basketball court, and the backwalls
export default function Stands() {
  return (
    <RigidBody type="fixed" colliders="trimesh">
      {/* Left stand 1 */}
      <mesh position={[-12.5, 1, 0]}>
        <boxGeometry args={[5, 2, 20]} />
        <meshStandardMaterial color="#1e1e2f" />
      </mesh>

      {/* Left stand 1 barricade */}
      <mesh position={[-10.1, 2.5, 4]}>
        <boxGeometry args={[0.2, 1, 20]} />
        <meshStandardMaterial color="#e86100"/>
      </mesh>

      {/* Left stand 2 */}
      <mesh position={[-15.5, 3, 0]}>
        <boxGeometry args={[5, 2, 20]} />
        <meshStandardMaterial color="#1e1e2f" />
      </mesh>

      {/* Left stand 2 barricade */}
      <mesh position={[-13.1, 4.5, 4]}>
        <boxGeometry args={[0.2, 1, 20]} />
        <meshStandardMaterial color="#e86100"/>
      </mesh>

      {/* Left stand 3 */}
      <mesh position={[-18.5, 5, 0]}>
        <boxGeometry args={[5, 2, 20]} />
        <meshStandardMaterial color="#1e1e2f" />
      </mesh>

      {/* Left stand 3 barricade */}
      <mesh position={[-16.1, 6.5, 4]}>
        <boxGeometry args={[0.2, 1, 20]} />
        <meshStandardMaterial color="#e86100"/>
      </mesh>

      {/*Bottom  Left stairs */}
      <mesh position={[-8.75,0,-8]}>
        <boxGeometry args={[0.5, 1, 4]} />
        <meshStandardMaterial color="white" />
      </mesh>
      <mesh position={[-9.25,0,-8]}>
        <boxGeometry args={[0.5, 2, 4]} />
        <meshStandardMaterial color="white" />
      </mesh>
      <mesh position={[-9.75,0,-8]}>
        <boxGeometry args={[0.5, 3, 4]} />
        <meshStandardMaterial color="white" />
      </mesh>

      {/*Middle Left stairs*/}
      <mesh position={[-14.75,4,-8]}>
        <boxGeometry args={[0.5, 1, 4]} />
        <meshStandardMaterial color="white" />
      </mesh>
      <mesh position={[-15.25,4,-8]}>
        <boxGeometry args={[0.5, 2, 4]} />
        <meshStandardMaterial color="white" />
      </mesh>
      <mesh position={[-15.75,4,-8]}>
        <boxGeometry args={[0.5, 3, 4]} />
        <meshStandardMaterial color="white" />
      </mesh>

      {/*Upper  Left stairs*/}
      <mesh position={[-11.75,2,-8]}>
        <boxGeometry args={[0.5, 1, 4]} />
        <meshStandardMaterial color="white" />
      </mesh>
      <mesh position={[-12.25,2,-8]}>
        <boxGeometry args={[0.5, 2, 4]} />
        <meshStandardMaterial color="white" />
      </mesh>
      <mesh position={[-12.75,2,-8]}>
        <boxGeometry args={[0.5, 3, 4]} />
        <meshStandardMaterial color="white" />
      </mesh>

      {/*Bottom Right stairs */}
      <mesh position={[8.75,0,-8]}>
        <boxGeometry args={[0.5, 1, 4]} />
        <meshStandardMaterial color="white" />
      </mesh>
      <mesh position={[9.25,0,-8]}>
        <boxGeometry args={[0.5, 2, 4]} />
        <meshStandardMaterial color="white" />
      </mesh>
      <mesh position={[9.75,0,-8]}>
        <boxGeometry args={[0.5, 3, 4]} />
        <meshStandardMaterial color="white" />
      </mesh>

      {/*Middle Right stairs*/}
      <mesh position={[14.75,4,-8]}>
        <boxGeometry args={[0.5, 1, 4]} />
        <meshStandardMaterial color="white" />
      </mesh>
      <mesh position={[15.25,4,-8]}>
        <boxGeometry args={[0.5, 2, 4]} />
        <meshStandardMaterial color="white" />
      </mesh>
      <mesh position={[15.75,4,-8]}>
        <boxGeometry args={[0.5, 3, 4]} />
        <meshStandardMaterial color="white" />
      </mesh>

      {/*Upper Right stairs*/}
      <mesh position={[11.75,2,-8]}>
        <boxGeometry args={[0.5, 1, 4]} />
        <meshStandardMaterial color="white" />
      </mesh>
      <mesh position={[12.25,2,-8]}>
        <boxGeometry args={[0.5, 2, 4]} />
        <meshStandardMaterial color="white" />
      </mesh>
      <mesh position={[12.75,2,-8]}>
        <boxGeometry args={[0.5, 3, 4]} />
        <meshStandardMaterial color="white" />
      </mesh>

      {/* Upper Left wall */}
      <mesh position={[-21, 5.5 , 0]}>
        <boxGeometry args={[2, 25, 100]} />
        <meshStandardMaterial color="#003153" />
      </mesh>

      {/* Right stand 1 */}
      <mesh position={[12.5, 1, 0]}>
        <boxGeometry args={[5, 2, 20]} />
        <meshStandardMaterial color="#1e1e2f" />
      </mesh>

      {/* Right stand 1 barricade */}
      <mesh position={[10.1, 2.5, 4]}>
        <boxGeometry args={[0.2, 1, 20]} />
        <meshStandardMaterial color="#e86100"/>
      </mesh>

      {/* Right stand 2 */}
      <mesh position={[15.5, 3, 0]}>
        <boxGeometry args={[5, 2, 20]} />
        <meshStandardMaterial color="#1e1e2f" />
      </mesh>

      {/* Right stand 2 barricade */}
      <mesh position={[13.1, 4.5, 4]}>
        <boxGeometry args={[0.2, 1, 20]} />
        <meshStandardMaterial color="#e86100"/>
      </mesh>

      {/* Right stand 3 */}
      <mesh position={[18.5, 5, 0]}>
        <boxGeometry args={[5, 2, 20]} />
        <meshStandardMaterial color="#1e1e2f" />
      </mesh>

      {/* Right stand 3 barricade */}
      <mesh position={[16.1, 6.5, 4]}>
        <boxGeometry args={[0.2, 1, 20]} />
        <meshStandardMaterial color="#e86100"/>
      </mesh>

      {/* Right Upper wall*/}
      <mesh position={[21, 5.5 , 0]}>
        <boxGeometry args={[2, 25, 100]} />
        <meshStandardMaterial color="#003153" />
      </mesh>

      {/* Upper wall behind the hoop */}
      <mesh position={[0, 5.5, -11]}>
        <boxGeometry args={[110, 25, 2]} />
        <meshStandardMaterial color="#003153" />
      </mesh>

      {/* Lower wall behind the hoop */}
      <mesh position={[0, 1, -10.99]}>
        <boxGeometry args={[100, 2, 2]} />
        <meshStandardMaterial color="#be0032" />
      </mesh>

      {/* Lower wall upper lining behind the hoop */}
      <mesh position={[0, 2, -10.98]}>
        <boxGeometry args={[100, 0.25, 2]} />
        <meshStandardMaterial color="#da9100" />
      </mesh>

      {/* Lower wall lower lining behind the hoop */}
      <mesh position={[0, 0.1, -10.98]}>
        <boxGeometry args={[100, 0.25, 2]} />
        <meshStandardMaterial color="#da9100" />
      </mesh>

      {/* Upper wall behind the ball */}
      <mesh position={[0, 5.5, 11]}>
        <boxGeometry args={[110, 25, 2]} />
        <meshStandardMaterial color="#003153" />
      </mesh>

      {/* Middle wall behind the hoop */}
      <mesh position={[0, 13, -10.99]}>
        <boxGeometry args={[100, 4, 2]} />
        <meshStandardMaterial color="#be0032" />
      </mesh>

      {/* Middle wall upper lining behind the hoop */}
      <mesh position={[0, 15, -10.98]}>
        <boxGeometry args={[100, 0.25, 2]} />
        <meshStandardMaterial color="#da9100" />
      </mesh>

      {/* Middle wall lower lining behind the hoop */}
      <mesh position={[0, 11, -10.98]}>
        <boxGeometry args={[100, 0.25, 2]} />
        <meshStandardMaterial color="#da9100" />
      </mesh>

      {/* Middle Left wall*/}
      <mesh position={[-20.9, 13 , 0]}>
        <boxGeometry args={[2, 4, 100]} />
        <meshStandardMaterial color="#be0032" />
      </mesh>

      {/* Middle Left wall upper lining*/}
      <mesh position={[-20.89, 15, 0]}>
        <boxGeometry args={[2, 0.25, 100]} />
        <meshStandardMaterial color="#da9100" />
      </mesh>

      {/* Middle Left wall lower lining*/}
      <mesh position={[-20.89, 11, 0]}>
        <boxGeometry args={[2, 0.25, 100]} />
        <meshStandardMaterial color="#da9100" />
      </mesh>

      {/* Middle Right wall*/}
      <mesh position={[20.9, 13 , 0]}>
        <boxGeometry args={[2, 4, 100]} />
        <meshStandardMaterial color="#be0032" />
      </mesh>

      {/* Middle Right wall upper lining*/}
      <mesh position={[20.89, 15, 0]}>
        <boxGeometry args={[2, 0.25, 100]} />
        <meshStandardMaterial color="#da9100" />
      </mesh>

      {/* Middle Right wall lower lining*/}
      <mesh position={[20.89, 11, 0]}>
        <boxGeometry args={[2, 0.25, 100]} />
        <meshStandardMaterial color="#da9100" />
      </mesh>

    </RigidBody>
  )
}
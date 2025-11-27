import { Canvas } from "@react-three/fiber";
import { XR, Controllers, Hands } from "@react-three/xr";
import { OrbitControls } from "@react-three/drei";

export default function VRChatRoom() {
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <Canvas style={{width: '100vw'}}>
        <XR>
          <Controllers />
          <Hands />

          <ambientLight intensity={0.5} />
          <directionalLight position={[2, 2, 2]} />

          <mesh position={[0, 1, -2]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="hotpink" />
          </mesh>
        </XR>

        <OrbitControls />
      </Canvas>
    </div>
  );
}

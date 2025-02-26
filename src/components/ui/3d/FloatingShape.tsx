
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import { Suspense } from "react";

export const FloatingShape = () => {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas 
        camera={{ position: [0, 0, 5] }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <mesh>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial
              color="#4f46e5"
              wireframe
              transparent
              opacity={0.2}
            />
          </mesh>
          <OrbitControls
            enableZoom={false}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

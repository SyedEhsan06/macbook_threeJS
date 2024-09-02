import { useGLTF, useScroll, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React from "react";
import * as THREE from "three";

const Macbook = ({ onScreenRotationChange }) => {
  const { scene } = useGLTF("/mac.glb");
  const tex = useTexture("/red.jpg");
  const meshes = {};

  // Traverse through the loaded model and store references to each mesh
  scene.traverse((child) => {
    meshes[child.name] = child;
  });

  // Apply texture and material properties to the matte material
  meshes.matte.material.map = tex;
  meshes.matte.material.roughness = 0.5;
  meshes.matte.material.metalness = 0.5;
  meshes.matte.material.emissiveIntensity = 0;

  // Get scroll data from useScroll hook
  const data = useScroll();

  // Update the screen rotation based on the scroll position
  useFrame(() => {
    const rotation = THREE.MathUtils.degToRad(180 - data.offset * 90);
    meshes.screen.rotation.x = rotation;

    if (onScreenRotationChange) {
      onScreenRotationChange(rotation); // Call the callback function with the updated rotation
    }
  });

  return (
    <group position={[0, -6, 20]}>
      <primitive object={scene} scale={[0.5, 0.5, 0.5]} />
    </group>
  );
};

export default Macbook;

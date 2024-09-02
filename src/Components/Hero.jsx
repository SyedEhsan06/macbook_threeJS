import React, { useState } from "react";
import Macbook from "./Macbook";
import { Canvas } from "@react-three/fiber";
import { Environment, ScrollControls } from "@react-three/drei";
import "./Hero.css";

const Hero = () => {
  const [screenRotation, setScreenRotation] = useState(0); // State to manage screen rotation

  const handleScreenRotation = (rotation) => {
    setScreenRotation(rotation); // Update the screen rotation state
  };

  // Convert radians to degrees
  const deg = screenRotation * (180 / Math.PI);

  // Calculate opacity and blur dynamically based on deg
  const opacity = Math.max(0, 1 - deg / 180); // Adjust the divisor as needed for a smoother transition
  const blur = Math.min(10, deg / 1090); // Adjust the divisor as needed for the desired blur effect

  return (
    <div className="w-full h-full overflow-hidden relative">
      {/* Apply dynamic opacity and blur */}
      <div
        className="macbook-text"
        style={{
          opacity: opacity,
          filter: `blur(${blur}px)`,
          transition: "opacity 0.3s ease, filter 0.3s ease", // Smooth transition for both opacity and blur
        }}
      >
        MacBook Pro.
      </div>
      
      <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center text-white text-2xl">
        Scroll
      </div>
      <Canvas camera={{ position: [0, -6, 100], fov: 15 }}>
        <Environment
          files={[
            "https://dl.polyhaven.org/file/ph-assets/HDRIs/exr/4k/studio_small_09_4k.exr",
          ]}
        />
        <ScrollControls pages={3}>
          <Macbook onScreenRotationChange={handleScreenRotation} />{" "}
          {/* Pass callback */}
        </ScrollControls>
      </Canvas>
    </div>
  );
};

export default Hero;

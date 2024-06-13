import ObjectDetection from "@/components/ObjectDetection";
import React from "react";

const Home = () => {
  return (
    <main className="flex flex-col items-center min-h-screen px-8 py-2">
      <h1 className="text-3xl font-extrabold tracking-tighter text-center md:text-6xl lg:text:8xl md:px-6 gradient-title">
        Object Detection
      </h1>
      <ObjectDetection />
    </main>
  );
};

export default Home;

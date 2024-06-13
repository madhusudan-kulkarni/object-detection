import ObjectDetection from "@/components/ObjectDetection";
import React from "react";

const Home = () => {
  return (
    <main className="flex flex-col items-center justify-between max-h-screen min-h-screen overflow-hidden">
      <h1 className="mt-2 text-3xl font-extrabold tracking-tighter text-center md:text-4xl lg:text-5xl gradient-title">
        Object Detection
      </h1>
      <div className="w-full max-w-4xl h-[calc(100vh-6rem)] mb-8 px-4">
        <ObjectDetection />
      </div>
    </main>
  );
};

export default Home;

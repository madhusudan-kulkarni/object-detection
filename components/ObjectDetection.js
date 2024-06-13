"use client";

import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { load as cocoSSDLoad } from "@tensorflow-models/coco-ssd";
import * as tf from "@tensorflow/tfjs";
import { renderPredictions } from "@/utils/render-predictions";

let detectInterval;

const ObjectDetection = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  const runCoco = async () => {
    setIsLoading(true);
    const net = await cocoSSDLoad();
    setIsLoading(false);

    detectInterval = setInterval(() => {
      runObjectDetection(net);
    }, 100);
  };

  const runObjectDetection = async (net) => {
    if (
      canvasRef.current &&
      webcamRef.current &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      canvasRef.current.width = video.videoWidth;
      canvasRef.current.height = video.videoHeight;

      // Perform detection
      const detectedObjects = await net.detect(video);

      const context = canvasRef.current.getContext("2d");
      renderPredictions(detectedObjects, context);
    }
  };

  const showWebcam = () => {
    if (webcamRef.current && webcamRef.current.video.readyState === 4) {
      const video = webcamRef.current.video;
      video.width = video.videoWidth;
      video.height = video.videoHeight;
    }
  };

  useEffect(() => {
    runCoco();
    showWebcam();
  }, []);

  return (
    <div className="flex items-center justify-center w-full h-full">
      {isLoading ? (
        <div className="gradient-title">Loading AI Model</div>
      ) : (
        <div className="relative w-full h-full max-h-full overflow-hidden rounded-lg shadow-lg">
          {/* webcam */}
          <Webcam
            className="object-cover w-full h-full rounded-lg"
            muted
            mirrored
            audio={false}
            ref={webcamRef}
          />
          {/* canvas */}
          <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 object-cover w-full h-full rounded-lg z-[99999]"
          />
        </div>
      )}
    </div>
  );
};

export default ObjectDetection;

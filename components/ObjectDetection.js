"use client";

import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { load as cocoSSDLoad } from "@tensorflow-models/coco-ssd";
import * as tf from "@tensorflow/tfjs";

let detectInterval;

const ObjectDetection = () => {
  const webcamRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  const runCoco = async () => {
    setIsLoading(true);
    const net = await cocoSSDLoad();
    setIsLoading(false);

    detectInterval = setInterval(() => {
      // runObjectDetection(net);
    }, 10);
  };

  const showWebcam = () => {
    if (
      webcamRef.current !== null &&
      webcamRef.current.video?.readyState === 4
    ) {
      const myVideoWidth = webcamRef.current.video.videoWidth;
      const myVideoHeight = webcamRef.current.video.videoHeight;

      webcamRef.current.video.width = myVideoWidth;
      webcamRef.current.video.height = myVideoHeight;
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
          <Webcam
            className="object-cover w-full h-full rounded-lg"
            muted
            mirrored
          />
        </div>
      )}
    </div>
  );
};

export default ObjectDetection;

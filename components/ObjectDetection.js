"use client";

import React, { useEffect, useRef } from "react";
import Webcam from "react-webcam";

const ObjectDetection = () => {
  const webcamRef = useRef(null);

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
    showWebcam();
  }, []);

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="relative w-full h-full max-h-full overflow-hidden rounded-lg shadow-lg">
        <Webcam
          className="object-cover w-full h-full rounded-lg"
          muted
          mirrored
        />
      </div>
    </div>
  );
};

export default ObjectDetection;

import { throttle } from "lodash";

export const renderPredictions = (predictions, context) => {
  // Clear canvas
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);

  // Set font style
  const font = "16px sans-serif";
  context.font = font;
  context.textBaseline = "top";

  // Mirror the canvas
  context.scale(-1, 1);

  let isAudioPlaying = false; // Flag to track if audio is already playing

  predictions.forEach((prediction) => {
    const [x, y, width, height] = prediction.bbox;

    // check if the prediction is a person
    const isPerson = prediction.class === "cell phone";

    // Adjust the bounding box size to make it slightly smaller
    const padding = 2;
    const adjustedX = x + padding;
    const adjustedY = y + padding;
    const adjustedWidth = width - 2 * padding;
    const adjustedHeight = height - 2 * padding;

    // Draw bounding box with rounded corners
    context.strokeStyle = "#FF0000"; // High-contrast color for the border
    context.lineWidth = 2; // Thinner line width for a more balanced border
    context.beginPath();
    context.moveTo(-adjustedX - adjustedWidth + 10, adjustedY);
    context.arcTo(-adjustedX, adjustedY, -adjustedX, adjustedY + 10, 10);
    context.arcTo(
      -adjustedX,
      adjustedY + adjustedHeight,
      -adjustedX - 10,
      adjustedY + adjustedHeight,
      10
    );
    context.arcTo(
      -adjustedX - adjustedWidth,
      adjustedY + adjustedHeight,
      -adjustedX - adjustedWidth,
      adjustedY + adjustedHeight - 10,
      10
    );
    context.arcTo(
      -adjustedX - adjustedWidth,
      adjustedY,
      -adjustedX - adjustedWidth + 10,
      adjustedY,
      10
    );
    context.closePath();
    context.stroke();

    // Draw label background with semi-transparency
    const labelPadding = 5; // Padding for label background
    const labelText = `${prediction.class} (${Math.round(
      prediction.score * 100
    )}%)`;
    const labelWidth = context.measureText(labelText).width + labelPadding * 2;
    context.fillStyle = "rgba(0, 0, 0, 0.7)"; // Semi-transparent black for the label background
    context.fillRect(
      -adjustedX - adjustedWidth,
      adjustedY - 25,
      labelWidth,
      20
    );

    // Draw text
    context.fillStyle = "#FFFFFF"; // Use white text color for better visibility
    context.fillText(
      labelText,
      -adjustedX - adjustedWidth + labelPadding,
      adjustedY - 25
    );

    if (isPerson && !isAudioPlaying) {
      playAudio();
      isAudioPlaying = true;
    } else if (!isPerson) {
      isAudioPlaying = false;
    }
  });

  // Reset transformation matrix to default after drawing all predictions
  context.setTransform(1, 0, 0, 1, 0, 0);
};

const playAudio = throttle(() => {
  const audio = new Audio("/alert.mp3");
  audio.play();
}, 3000);

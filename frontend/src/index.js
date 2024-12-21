import React, { useState, useEffect } from "react";

// Color table for gradient transitions
const colors = [
  [62, 35, 255],
  [60, 255, 60],
  [255, 35, 98],
  [45, 175, 230],
  [255, 0, 255],
  [255, 128, 0],
];

export default function GradientBackground() {
  const [step, setStep] = useState(0); // Current step in the transition
  const [colorIndices, setColorIndices] = useState([0, 1, 2, 3]); // Indices of current and next color pairs

  const gradientSpeed = 0.002; // Speed of gradient transition

  // Function to update the gradient based on step and color indices
  const updateGradient = () => {
    const c0_0 = colors[colorIndices[0]];
    const c0_1 = colors[colorIndices[1]];
    const c1_0 = colors[colorIndices[2]];
    const c1_1 = colors[colorIndices[3]];

    const istep = 1 - step;

    // Calculate the RGB values for the left and right gradient colors
    const r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
    const g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
    const b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
    const color1 = `rgb(${r1},${g1},${b1})`;

    const r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
    const g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
    const b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
    const color2 = `rgb(${r2},${g2},${b2})`;

    // Set the background gradient style for the component
    document.body.style.background = `-webkit-gradient(linear, left top, right top, from(${color1}), to(${color2}))`;
    document.body.style.background = `-moz-linear-gradient(left, ${color1} 0%, ${color2} 100%)`;
  };

  // Update color indices and step when necessary
  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prevStep) => {
        const newStep = prevStep + gradientSpeed;
        if (newStep >= 1) {
          setStep(0); // Reset the step when it reaches 1
          setColorIndices((prevIndices) => {
            // Pick two new target color indices (different from current ones)
            const newColorIndices = [...prevIndices];
            newColorIndices[0] = prevIndices[1];
            newColorIndices[2] = prevIndices[3];
            newColorIndices[1] =
              (prevIndices[1] +
                Math.floor(1 + Math.random() * (colors.length - 1))) %
              colors.length;
            newColorIndices[3] =
              (prevIndices[3] +
                Math.floor(1 + Math.random() * (colors.length - 1))) %
              colors.length;
            return newColorIndices;
          });
        }
        return newStep;
      });
    }, 10); // Update every 10ms

    // Cleanup the interval when component unmounts
    return () => clearInterval(interval);
  }, [step, colorIndices]);

  // Render component
  useEffect(() => {
    updateGradient(); // Update the gradient each time step or colorIndices change
  }, [step, colorIndices]);

  return (
    <div>
      <h1>Gradient Background Transition</h1>
      <p>Watch the background colors transition smoothly!</p>
    </div>
  );
}

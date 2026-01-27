// Spinner.tsx
import React from "react";
import styled, { keyframes } from "styled-components";

// Keyframes for rotating animation
const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

// Spinner styled component
const SpinnerWrapper = styled.div<{
  size?: number;
  color?: string;
  spinColor?: string;
  borderSize?: number;
  delay?: number;
}>`
  border: ${({ borderSize }) => borderSize || "2"}px solid
    ${({ color }) => color || "#f3f3f3"};
  border-top: ${({ borderSize }) => borderSize || "2"}px solid
    ${({ spinColor }) => spinColor || "#1E1E24"};
  border-radius: 50%;
  width: ${({ size }) => size || 40}px;
  height: ${({ size }) => size || 40}px;
  animation: ${rotate} ${({ delay }) => delay || 1.2}s linear infinite;
`;

// Spinner component with props for size and color
interface SpinnerProps {
  size?: number;
  color?: string;
  spinColor?: string;
  borderSize?: number;
  delay?: number;
}

function Spinner({
  size = 40,
  color = "#f3f3f3",
  spinColor = "#1E1E24",
  borderSize = 2,
  delay = 1.2,
}: SpinnerProps): JSX.Element {
  return (
    <SpinnerWrapper
      size={size}
      color={color}
      spinColor={spinColor}
      borderSize={borderSize}
      delay={delay}
    />
  );
}

export default Spinner;

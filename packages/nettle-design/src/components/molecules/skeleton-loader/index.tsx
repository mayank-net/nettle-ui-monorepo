import React from "react";
import styled, { keyframes } from "styled-components";
import FlexBox from "../../atoms/flexbox";

// Keyframes for gradient animation
const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
`;

// Styled loader component
const LoaderWrapper = styled(FlexBox)`
  justify-content: space-between;
  width: 100%; // Full width of the parent
  height: 110px; // Adjust height to match the loader in the image
  background-color: transparent;
  flex-direction: column;
`;

const LoaderBar = styled(FlexBox)`
  height: 100%;
  border-radius: 10px;
  margin-bottom: 10px;
  background: linear-gradient(
    270deg,
    #978b19,
    #302b63,
    #24243e,
    #0f0c29,
    #302b63,
    #1d1293
  );
  background-size: 400% 400%;
  animation: ${gradientAnimation} 2s ease infinite;

  &:nth-child(1) {
    width: 100%;
  }
  &:nth-child(2) {
    width: 100%;
  }
  &:nth-child(3) {
    width: 100%;
  }
  &:nth-child(4) {
    width: 40%;
  }
`;

function SkeletonLoader(): JSX.Element {
  return (
    <LoaderWrapper>
      <LoaderBar />
      <LoaderBar />
      <LoaderBar />
      <LoaderBar />
    </LoaderWrapper>
  );
}

export default SkeletonLoader;

import React from "react";
import { FlexBox, Spinner, Text, View } from "nettle-design/src";
import styled from "styled-components";

import NettleLogo from "./svg-logo";

const StyledGradientBackground = styled(FlexBox)`
  width: 100vw;
  height: 100dvh;
  background-color: #0b0b0f;
  background: radial-gradient(
      circle at 40% 90%,
      rgba(255, 230, 0, 0.12),
      transparent 40%
    ),
    radial-gradient(circle at 60% 90%, rgba(29, 18, 147, 0.25), transparent 40%),
    radial-gradient(circle at 50% 50%, rgba(15, 15, 20, 1), #050505);

  position: relative;
  overflow: hidden;

  &:before {
    content: "";
    position: absolute;
    inset: 0;
    background-image: radial-gradient(
      rgba(255, 255, 255, 0.05) 1px,
      transparent 1px
    );
    background-size: 32px 32px;
    mask-image: radial-gradient(circle at center, black, transparent 80%);
  }
`;

const GlassCircle = styled(FlexBox)`
  position: relative;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 50%;
  padding: 40px;
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.4);
  height: 200px;
  width: 200px;
`;

export function LoadingComponent(): JSX.Element {
  return (
    <View position="fixed" style={{ zIndex: 9999 }}>
      <StyledGradientBackground alignItems="center" justifyContent="center">
        <GlassCircle
          flexDirection={"column"}
          alignItems="center"
          justifyContent="center"
        >
          <FlexBox>
            <NettleLogo />
          </FlexBox>
          <FlexBox mt={4} alignItems={"center"} justifyContent={"center"}>
            <FlexBox>
              <Spinner
                size={24}
                color={"#AF631E"}
                spinColor={"rgba(255, 255, 255, 0.05)"}
                borderSize={3}
              />
            </FlexBox>
            <FlexBox>
              <Text
                style={{
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  textAlign: "center",
                }}
                color={"text2"}
                fontSize={0}
              >
                Initializing Secure Session
              </Text>
            </FlexBox>
          </FlexBox>
        </GlassCircle>
      </StyledGradientBackground>
    </View>
  );
}

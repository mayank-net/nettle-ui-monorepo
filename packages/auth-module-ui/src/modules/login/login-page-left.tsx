import React from "react";
import { Atom, Gear, Sparkle } from "@phosphor-icons/react";
import { FlexBox, NettleIcon, Text } from "nettle-design/src";
import styled from "styled-components";
import { ThemeMode, useThemeMode } from "theme/src/provider";

import NettleLogo from "../../components/svg-logo";

const StyledGradientBackground = styled(FlexBox)<{ themeMode: ThemeMode }>`
  width: 100vw;
  height: 100dvh;
  position: relative;
  overflow: hidden;
  background-color: #020408;

  background-image: radial-gradient(
      circle at 80% 20%,
      rgba(84, 105, 250, 0.25) 0%,
      transparent 45%
    ),
    radial-gradient(
      circle at 20% 80%,
      rgba(175, 99, 30, 0.3) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at center,
      rgba(26, 56, 147, 0.15) 0%,
      transparent 70%
    );

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    background-image: radial-gradient(#af631e 1.5px, transparent 1.5px),
      radial-gradient(rgba(175, 99, 30, 0.4) 2px, transparent 2px);
    background-size: 20px 20px;
    background-position: center center;
    opacity: 0.3;
    mask-image: radial-gradient(circle at center, black 60%, transparent 100%);
  }

  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    opacity: 0.04;
    filter: brightness(0.5) contrast(150%);
  }

  @media (max-width: 1100px) {
    display: none;
  }
`;

const StyledTagContainer = styled(FlexBox)`
  padding: 6px 12px;
  border-radius: 8px;
  background-color: #000a15;
`;

function LoginPageLeft(): JSX.Element {
  const [themeMode] = useThemeMode();
  return (
    <StyledGradientBackground themeMode={themeMode} flex={3}>
      <FlexBox alignItems={"center"} flex={1} px={31} maxWidth={"465px"}>
        <FlexBox flexDirection={"column"} flex={1}>
          <FlexBox>
            <NettleLogo size={48} iconColor="#D3A353" textColor="#FFFFFF" />
          </FlexBox>
          <FlexBox mt={6}>
            <Text fontSize={8} fontWeight={"bold"} color={"text1"}>
              Autonomous Data Processing for your Enterprise
            </Text>
          </FlexBox>
          <FlexBox mt={6} style={{ gap: "8px" }}>
            <StyledTagContainer alignItems={"center"} flexShrink={0}>
              <NettleIcon icon={Sparkle} size={18} color={"#9f85ff"} />
              <FlexBox ml={1}>
                <Text fontSize={1} fontWeight={"regular"} color={"text1"}>
                  Fully Autonomous
                </Text>
              </FlexBox>
            </StyledTagContainer>
            <StyledTagContainer alignItems={"center"} flexShrink={0}>
              <NettleIcon icon={Atom} size={18} color={"#9f85ff"} />
              <FlexBox ml={1}>
                <Text fontSize={1} fontWeight={"regular"} color={"text1"}>
                  Self-healing
                </Text>
              </FlexBox>
            </StyledTagContainer>
            <StyledTagContainer alignItems={"center"} flexShrink={0}>
              <NettleIcon icon={Gear} size={18} color={"#9f85ff"} />
              <FlexBox ml={1}>
                <Text fontSize={1} fontWeight={"regular"} color={"text1"}>
                  Zero maintenance
                </Text>
              </FlexBox>
            </StyledTagContainer>
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </StyledGradientBackground>
  );
}

export default LoginPageLeft;

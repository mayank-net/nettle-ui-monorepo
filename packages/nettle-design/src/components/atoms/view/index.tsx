import React from "react";
import styled, { CSSProperties } from "styled-components";
import FlexBox from "../flexbox";
import { ThemeMode, useThemeMode } from "theme/src/provider";
import themeGet from "@styled-system/theme-get";

const StyledView = styled(FlexBox)<{
  position?: "fixed" | "relative" | "absolute";
  themeMode: ThemeMode;
}>`
  align-items: center;
  flex: 1;
  background-color: ${(props) =>
    props.themeMode === "dark"
      ? themeGet(`colors.black`)
      : themeGet(`colors.white`)};
  width: 100vw;
  height: 100dvh;
  flex-direction: column;
  overflow: scroll;
  scrollbar-width: none; /* For Firefox */
  -ms-overflow-style: none; /* For Internet Explorer and Edge */
  &::-webkit-scrollbar {
    display: none; /* For Chrome, Safari, and Opera */
  }
  position: ${(props) => props?.position || "relative"};
`;

interface Props {
  children: React.ReactNode;
  position?: "fixed" | "relative" | "absolute";
  style?: CSSProperties;
}

function View({ children, position }: Props) {
  const [themeMode] = useThemeMode();
  return (
    <StyledView themeMode={themeMode} position={position}>
      {children}
    </StyledView>
  );
}

export default View;

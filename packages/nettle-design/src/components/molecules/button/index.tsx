import React from "react";
import FlexBox from "../../atoms/flexbox";
import styled from "styled-components";
import Text from "../../atoms/text";

interface Props {
  label: string;
  variant?: "primary" | "secondary" | "tertiary";
  onClick: () => void;
  background?: string;
  textColorInverted?: boolean;
  icon?: React.ReactNode;
  iconPlacement?: "left" | "right";
  size?: "md" | "sm" | "lg";
  borderColor?: string;
  textVariant?: "bold" | "regular";
  hover?: boolean;
}

const StyledGradientContainer = styled(FlexBox)<{ textColorInverted: boolean }>`
  padding: 12px 28px;
  border-radius: 12px;
  position: relative;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex: 1;
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);

  /* 1. THE BASE: Deep Blue */
  background: linear-gradient(180deg, #5469fa 0%, #1a3893 100%);
  color: ${(props) => (props.textColorInverted ? "#000000" : "#ffffff")};

  /* 2. THE BORDER: A 1px semi-transparent stroke */
  /* We use border-box so the border doesn't change the button size */
  border: 1px solid rgba(255, 255, 255, 0.15);

  /* 3. DEPTH: Dual shadow system */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2),
    /* External drop shadow */ inset 0 1px 0 rgba(255, 255, 255, 0.2); /* Inner top "highlight" */

  &:hover {
    transform: translateY(-2px);

    /* Brighten the border on hover to look like a "glow" */
    border-color: rgba(218, 185, 154, 0.4); /* Subtle hint of your brown/gold */

    background: linear-gradient(180deg, #6274ff 0%, #1a3893 100%);

    box-shadow: 0 12px 20px rgba(26, 56, 147, 0.3),
      /* Deep blue glow */ inset 0 1px 0 rgba(255, 255, 255, 0.4); /* Sharper inner highlight */
  }

  &:active {
    transform: translateY(0px) scale(0.98);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  }
`;
const StyledPrimaryContainer = styled(FlexBox)<{
  background: string;
  size?: "sm" | "md" | "lg";
  borderColor?: string;
  textColorInverted: boolean;
  hover: boolean;
}>`
  padding: ${(props) => (props.size === "sm" ? "8px 16px" : "12px 28px")};
  border-radius: 12px;
  background-color: ${(props) => props.background};
  border: 1px solid
    ${(props) => props.borderColor || "rgba(255, 255, 255, 0.06)"};
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex: 1;
  position: relative;
  overflow: hidden;
  color: ${(props) => (props.textColorInverted ? "#1A1A1A" : "#FFFFFF")};
  font-weight: 500;
  letter-spacing: 0.01em;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);

  &:hover {
    ${(props) =>
      props.hover &&
      `
      transform: translateY(-2px);
      filter: brightness(1.05);
      background-image: linear-gradient(rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.03));
      box-shadow: 
        0 6px 12px rgba(0, 0, 0, 0.15),
        inset 0 1px 0 rgba(255, 255, 255, 0.1);
    `}
  }

  & > * {
    transition: transform 0.4s ease;
  }
`;

const StyledTertiaryContainer = styled(FlexBox)<{ textColorInverted: boolean }>`
  padding: 12px 0px;
  border-radius: 10px;
  background-color: transparent;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex: 1;
  color: ${(props) => (props.textColorInverted ? "#000000" : "#ffffff")};
`;

function Button({
  label,
  background = "transparent",
  onClick,
  textColorInverted = false,
  textVariant = "bold",
  icon,
  borderColor,
  iconPlacement = "right",
  variant = "primary",
  size = "md",
  hover = false,
}: Props): JSX.Element {
  if (variant === "primary") {
    if (background === "gradient") {
      return (
        <StyledGradientContainer
          textColorInverted={textColorInverted}
          onClick={onClick}
        >
          <Text fontSize={1} fontWeight={textVariant}>
            {label}
          </Text>
        </StyledGradientContainer>
      );
    }
    if (size === "sm") {
      return (
        <StyledPrimaryContainer
          textColorInverted={textColorInverted}
          size={size}
          background={background}
          onClick={onClick}
          borderColor={borderColor}
          hover={hover}
        >
          <FlexBox
            alignItems={"center"}
            flexDirection={iconPlacement === "left" ? "row" : "row-reverse"}
          >
            {icon && (
              <FlexBox
                mr={label ? (iconPlacement === "left" ? 1 : 0) : 0}
                ml={label ? (iconPlacement === "left" ? 0 : 1) : 0}
              >
                {icon}
              </FlexBox>
            )}
            <Text fontSize={0} fontWeight={textVariant}>
              {label}
            </Text>
          </FlexBox>
        </StyledPrimaryContainer>
      );
    }
    return (
      <StyledPrimaryContainer
        textColorInverted={textColorInverted}
        borderColor={borderColor}
        background={background}
        onClick={onClick}
        hover={hover}
      >
        <FlexBox
          alignItems={"center"}
          flexDirection={iconPlacement === "left" ? "row" : "row-reverse"}
        >
          {icon && (
            <FlexBox
              mr={label ? (iconPlacement === "left" ? 1 : 0) : 0}
              ml={label ? (iconPlacement === "left" ? 0 : 1) : 0}
            >
              {icon}
            </FlexBox>
          )}
          <Text fontSize={1} fontWeight={textVariant}>
            {label}
          </Text>
        </FlexBox>
      </StyledPrimaryContainer>
    );
  } else if (variant === "tertiary") {
    if (size === "sm") {
      return (
        <StyledTertiaryContainer
          textColorInverted={textColorInverted}
          onClick={onClick}
        >
          <FlexBox
            alignItems={"center"}
            flexDirection={iconPlacement === "left" ? "row" : "row-reverse"}
          >
            {icon && (
              <FlexBox
                mr={label ? (iconPlacement === "left" ? 1 : 0) : 0}
                ml={label ? (iconPlacement === "left" ? 0 : 1) : 0}
              >
                {icon}
              </FlexBox>
            )}
            <Text fontSize={1} fontWeight={"regular"}>
              {label}
            </Text>
          </FlexBox>
        </StyledTertiaryContainer>
      );
    }
    return (
      <StyledTertiaryContainer
        textColorInverted={textColorInverted}
        onClick={onClick}
      >
        <FlexBox
          alignItems={"center"}
          flexDirection={iconPlacement === "left" ? "row" : "row-reverse"}
        >
          {icon && (
            <FlexBox
              mr={label ? (iconPlacement === "left" ? 1 : 0) : 0}
              ml={label ? (iconPlacement === "left" ? 0 : 1) : 0}
            >
              {icon}
            </FlexBox>
          )}
          <Text fontSize={1} fontWeight={textVariant}>
            {label}
          </Text>
        </FlexBox>
      </StyledTertiaryContainer>
    );
  }

  return (
    <StyledPrimaryContainer
      textColorInverted={textColorInverted}
      borderColor={borderColor}
      background={background}
      onClick={onClick}
      hover={hover}
    >
      <FlexBox
        alignItems={"center"}
        flexDirection={iconPlacement === "left" ? "row" : "row-reverse"}
      >
        {icon && (
          <FlexBox
            mr={label ? (iconPlacement === "left" ? 1 : 0) : 0}
            ml={label ? (iconPlacement === "left" ? 0 : 1) : 0}
          >
            {icon}
          </FlexBox>
        )}
        <Text fontSize={1} fontWeight={textVariant}>
          {label}
        </Text>
      </FlexBox>
    </StyledPrimaryContainer>
  );
}

export default Button;

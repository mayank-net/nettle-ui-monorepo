import React, { useState } from "react";
import styled from "styled-components";
import FlexBox from "../../atoms/flexbox";
import Text from "../../atoms/text";
import { ThemeMode, useThemeMode } from "theme/src/provider";
import { OutlineColors, SurfaceColors } from "theme/src/types";
import themeGet from "@styled-system/theme-get";

export type SizeVariant = "sm" | "md" | "lg";

const StyledInputContainer = styled(FlexBox)<{
  themeMode: ThemeMode;
  backgroundColor: keyof SurfaceColors;
  isError?: boolean;
  paddingRight?: string;
  isFocused?: boolean;
  sizeVariant: SizeVariant;
  borderColor?: keyof OutlineColors;
}>`
  padding: 0px ${(props) => (props.paddingRight ? props.paddingRight : "12px")}
    0px 12px;
  border-radius: ${(props) => (props.sizeVariant === "sm" ? "8px" : "10px")};
  background-color: ${(props) =>
    themeGet(`colors.surface.${props.themeMode}.${props.backgroundColor}`)};
  flex: 1;
  border: 0.5px solid
    ${(props) =>
      props.isError
        ? themeGet(`colors.outline.${props.themeMode}.error`)
        : props.isFocused
        ? themeGet(`colors.outline.${props.themeMode}.outline1`)
        : props.borderColor
        ? themeGet(`colors.outline.${props.themeMode}.${props.borderColor}`)
        : "transparent"};
  outline: none;
  justify-content: space-between;
  align-items: center;
`;

const StyledInput = styled.input<{
  themeMode: ThemeMode;
  sizeVariant: SizeVariant;
}>`
  background-color: transparent;
  outline: none;
  border: 0px;
  &::placeholder {
    color: ${(props) => themeGet(`colors.text.${props.themeMode}.text2`)};
  }
  color: ${(props) => themeGet(`colors.text.${props.themeMode}.text1`)};
  font-weight: 400;
  font-size: ${(props) => (props.sizeVariant === "sm" ? "12px" : "14px")};
  // font-family: DM Sans;
  line-height: 20px;
  width: 100%;
  height: 100%;
  padding-right: 8px;
`;

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholderText: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  variant?: "default";
  backgroundColor?: keyof SurfaceColors;
  label?: string;
  isError?: boolean;
  errorText?: string;
  sizeVariant?: SizeVariant;
  icon?: React.ReactNode;
  noFocus?: boolean;
  borderColor?: keyof OutlineColors;
}

function Input({
  placeholderText,
  value,
  onChange,
  label,
  variant = "default",
  backgroundColor = "surface4",
  isError = false,
  errorText = "",
  sizeVariant = "md",
  noFocus = false,
  icon,
  borderColor,
  ...rest
}: Props): JSX.Element {
  const [themeMode] = useThemeMode();
  const [isFocused, setIsFocused] = useState(false);

  return (
    <FlexBox flex={1} flexDirection={"column"}>
      {label && (
        <FlexBox mb={2}>
          <Text fontSize={1} fontWeight={"semibold"} color={"text1"}>
            {label}
          </Text>
        </FlexBox>
      )}
      <FlexBox flexDirection={"column"}>
        <FlexBox
          height={
            sizeVariant === "lg"
              ? "48px"
              : sizeVariant === "md"
              ? "40px"
              : "32px"
          }
        >
          <StyledInputContainer
            sizeVariant={sizeVariant}
            themeMode={themeMode}
            isError={isError}
            backgroundColor={backgroundColor}
            paddingRight={icon ? "0px" : "12px"}
            isFocused={isFocused && !noFocus}
            borderColor={borderColor}
          >
            <StyledInput
              themeMode={themeMode}
              sizeVariant={sizeVariant}
              placeholder={placeholderText}
              onChange={onChange}
              value={value}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              {...rest}
            />
            {icon && icon}
          </StyledInputContainer>
        </FlexBox>
        {isError && errorText && (
          <FlexBox mt={1}>
            <Text fontSize={0} fontWeight={"regular"} color={"error"}>
              {errorText}
            </Text>
          </FlexBox>
        )}
      </FlexBox>
    </FlexBox>
  );
}

export default Input;

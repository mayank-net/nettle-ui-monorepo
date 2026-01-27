import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import themeGet from "@styled-system/theme-get";
import { ThemeMode, useThemeMode } from "theme/src/provider";
import FlexBox from "../../atoms/flexbox";
import Text from "../../atoms/text";
import Portal from "./portal"; // update this path if needed

export interface OptionMenuItem {
  key: string;
  label: string;
}

interface Props {
  menuItems: OptionMenuItem[];
  onClick: (arg: OptionMenuItem) => void;
  children: React.ReactNode;
  size?: "sm" | "md";
  onBlurCallback?: () => void;
  onFocusCallback?: () => void;
  isRightAligned?: boolean;
}

const StyledContainer = styled(FlexBox)`
  align-items: center;
  cursor: pointer;
  position: relative;
`;

const StyledMenuContainer = styled(FlexBox)<{ themeMode: ThemeMode }>`
  border-radius: 8px;
  box-shadow: ${(props) =>
    props.themeMode === "dark"
      ? "0px 0px 16px 8px #0000006b"
      : "0px 8px 16px 0px #0000006b"};
  background-color: ${(props) =>
    themeGet(`colors.surface.${props.themeMode}.surface3`)};
  cursor: pointer;
  white-space: nowrap;
  position: absolute;
`;

const StyledMenuItemContainer = styled(FlexBox)<{ themeMode: ThemeMode }>`
  &:hover {
    background-color: ${(props) =>
      props.themeMode === "dark"
        ? themeGet(`colors.surface.${props.themeMode}.surface5`)
        : themeGet(`colors.surface.${props.themeMode}.surface2`)};
  }
  border-radius: 8px;
  padding: 8px 16px;
  justify-content: space-between;
`;

function OptionComponentWrapper({
  menuItems,
  onClick,
  children,
  size = "md",
  onFocusCallback,
  onBlurCallback,
  isRightAligned = false,
}: Props): JSX.Element {
  const [themeMode] = useThemeMode();
  const [isOpen, setIsOpen] = useState(false);
  const [menuStyle, setMenuStyle] = useState({ top: 0, left: 0, width: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleOpen = () => {
    setIsOpen(true);
    if (onFocusCallback) {
      onFocusCallback();
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    if (onBlurCallback) {
      onBlurCallback();
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node) &&
      !menuRef.current?.contains(event.target as Node)
    ) {
      handleClose();
    }
  };

  const updateMenuPosition = () => {
    if (containerRef.current) {
      if (isRightAligned) {
        const rect = containerRef.current.getBoundingClientRect();
        const left = rect.left - rect.width - 56;
        const top = rect.bottom + 8; // 8px spacing (mt={2})
        const width = rect.width;

        // You can add horizontal overflow adjustment here if needed
        setMenuStyle({ top, left, width });
      } else {
        const rect = containerRef.current.getBoundingClientRect();
        const left = rect.left;
        const top = rect.bottom + 8; // 8px spacing (mt={2})
        const width = rect.width;

        // You can add horizontal overflow adjustment here if needed
        setMenuStyle({ top, left, width });
      }
    }
  };

  const handleOptionClick = (item: OptionMenuItem) => {
    onClick(item);
    handleClose();
  };

  useEffect(() => {
    if (isOpen) {
      updateMenuPosition();
      document.addEventListener("mousedown", handleClickOutside);
      window.addEventListener("resize", updateMenuPosition);
      window.addEventListener("scroll", updateMenuPosition, true);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", updateMenuPosition);
      window.removeEventListener("scroll", updateMenuPosition, true);
    };
  }, [isOpen]);

  return (
    <>
      <FlexBox flexDirection="column" ref={containerRef}>
        <StyledContainer onClick={handleOpen}>{children}</StyledContainer>
      </FlexBox>

      {isOpen && (
        <Portal>
          <StyledMenuContainer
            ref={menuRef}
            themeMode={themeMode}
            style={{
              top: `${menuStyle.top}px`,
              left: `${menuStyle.left}px`,
              minWidth: `${menuStyle.width}px`,
              zIndex: 1000,
            }}
            flexDirection="column"
          >
            {menuItems.map((item) => (
              <StyledMenuItemContainer
                themeMode={themeMode}
                key={item.key}
                onClick={() => handleOptionClick(item)}
              >
                <Text
                  fontSize={size === "md" ? 2 : 0}
                  fontWeight="regular"
                  color="text1"
                >
                  {item.label}
                </Text>
              </StyledMenuItemContainer>
            ))}
          </StyledMenuContainer>
        </Portal>
      )}
    </>
  );
}

export default OptionComponentWrapper;

import React from "react";
import { IconProps } from "@phosphor-icons/react";
import { useThemeMode } from "theme/src/provider";

import colors from "theme/src/colors";

interface IconColors {
  icon1: string;
  icon2: string;
  brand: string;
  error: string;
  warning: string;
  success: string;
}

interface NettleIconProps extends IconProps {
  icon: React.ElementType<IconProps>;
  color?: string | keyof IconColors;
}

const NettleIcon: React.FC<NettleIconProps> = ({
  icon: Icon,
  size,
  color,
  weight,
  mirrored,
  ...props
}) => {
  const [themeMode] = useThemeMode(); // Access the theme

  // Dynamically resolve color based on themeMode and provided color
  const iconColor =
    colors.icon[themeMode][color as unknown as keyof IconColors] || color; // Default to `icon1` color or a fallback
  return (
    <Icon
      size={size}
      color={iconColor}
      weight={weight}
      mirrored={mirrored}
      {...props}
    />
  );
};

export default NettleIcon;

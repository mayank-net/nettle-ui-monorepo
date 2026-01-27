import {
  FontWeights,
  Fonts,
  IconSizes,
  FontSizes,
  FixedLineHeights,
} from "./types";

const fontSizes: FontSizes = [12, 14, 16, 18, 20, 24, 32, 36, 48];

const fonts: Fonts = {
  // base: "DM Sans",
  base: "",
};

const fontWeights: FontWeights = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

const iconSizes: IconSizes = [12, 16, 20, 24, 32, 40];

const singleLineHeights: FixedLineHeights = [
  14, 20, 20, 24, 24, 28, 40, 48, 60,
] as const;

const longformLineHeights: FixedLineHeights = [
  16,
  20,
  24,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
] as const;

export default {
  fontSizes,
  fontWeights,
  iconSizes,
  fonts,
  singleLineHeights,
  longformLineHeights,
};

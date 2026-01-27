export interface Color {
  0: string;
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  1000: string;
  1100: string;
}

export interface AlertColor {
  100: string;
  200: string;
}

export interface Colors {
  "grey-light": Color;
  "brand-light": Color;
  "error-light": AlertColor;
  "warning-light": AlertColor;
  "success-light": AlertColor;
  "grey-dark": Color;
  "brand-dark": Color;
  "error-dark": AlertColor;
  "warning-dark": AlertColor;
  "success-dark": AlertColor;
  white: string;
  black: string;
}

export type ColorProp = `${keyof Colors}.${keyof Color}`;

export interface TextColors {
  text1: string;
  text2: string;
  text3: string;
  brand: string;
  brand2: string;
  brand3: string;
  error: string;
  warning: string;
  success: string;
}

export interface IconColors {
  icon1: string;
  icon2: string;
  icon3: string;
  icon4: string;
  brand: string;
  error: string;
  warning: string;
  success: string;
}
export interface OutlineColors {
  outline1: string;
  outline2: string;
  outline3: string;
  outline4: string;
  outline5: string;
  brand: string;
  brand2: string;
  error: string;
}

export interface SurfaceColors {
  surface1: string;
  surface2: string;
  surface3: string;
  surface4: string;
  surface5: string;
  brand: string;
  brand2: string;
  brand3: string;
  brand4: string;
  brand5: string;
  error: string;
  warning: string;
  success: string;
}

export type TextColorProps = `text.${keyof TextColors}`;

export interface AllColors extends Colors {
  text: { light: TextColors; dark: TextColors };
  icon: { light: IconColors; dark: IconColors };
  outline: { light: OutlineColors; dark: OutlineColors };
  surface: { light: SurfaceColors; dark: SurfaceColors };
}

export type WeightValue = 400 | 500 | 600 | 700;
export type StringWeightValue = "400" | "500" | "600" | "700";

export interface FontWeights {
  regular: WeightValue;
  medium: WeightValue;
  semibold: WeightValue;
  bold: WeightValue;
}

export interface Fonts {
  base: string;
}

// Typescript doesn't support range of number as indexes so this is the
// best way to do this. keyof array returns indexes as string while we expect them
// to be numbers
export type FontSizeKeys = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type LineHeightForms = "single" | "longform";
export type FontSizes = Array<number> & { [k in FontSizeKeys]: number };
export type IconSizeKeys = 0 | 1 | 2 | 3 | 4 | 5;
export type IconSizes = { [k in IconSizeKeys]: number };
export type FixedLineHeights = {
  [k in FontSizeKeys]: number | undefined;
};

export interface Typography {
  fontSizes: FontSizes;
  fontWeights: FontWeights;
  iconSizes: IconSizes;
  fonts: Fonts;
}

export type BorderKeys = 0 | 1 | 2;
export type Borders = { [k in BorderKeys]: number };
export type RadiiKeys = 0 | 1 | 2 | 3;
export type Radii = { [k in RadiiKeys]: number };
export const SpacingsKeys = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
] as const;

export type Spacings = { [k in (typeof SpacingsKeys)[number]]: number };

export interface Spaces {
  space: Spacings;
  sizes: Spacings;
  minWidths: Spacings;
  maxWidths: Spacings;
  minHeights: Spacings;
  maxHeights: Spacings;
  heights: Spacings;
  radii: Radii;
  borders: Borders;
  baseSize: number;
  baseSpace: number;
}

export interface Theme extends Spaces, Typography {
  colors: AllColors;
  colorPalette: Colors;
  themeName: string;
}

import {
  Colors,
  TextColors,
  IconColors,
  AllColors,
  OutlineColors,
  SurfaceColors,
} from "./types";

const paletteDark = {
  "grey-dark": {
    0: "#000000",
    50: "#151519",
    100: "#1E1E24",
    200: "#26262E",
    300: "#3B3B47",
    400: "#5D5D64",
    500: "#77777D",
    600: "#8E8E94",
    700: "#A5A5A9",
    800: "#B3B3B6",
    900: "#EDEDEF",
    1000: "#F8F8FB",
    1100: "#FFFFFF",
  },
  "brand-dark": {
    0: "#080A0A",
    50: "#192A2B",
    100: "#1A3738",
    200: "#184446",
    300: "#14575A",
    400: "#0C7175",
    500: "#1A3893",
    600: "#5469FA",
    700: "#47C2C6",
    800: "#6FC7C9",
    900: "#9ED8DA",
    1000: "#CBE9EA",
    1100: "#FFFFFF",
  },
  "error-dark": {
    100: "#F51F0A",
    200: "#6D2626",
  },
  "warning-dark": {
    100: "#E48329",
    200: "#804F21",
  },
  "success-dark": {
    100: "#00BC62",
    200: "#195F3D",
  },
};

const paletteLight = {
  "grey-light": {
    0: "#FFFFFF",
    50: "#F8F8FB",
    100: "#EDEDEF",
    200: "#B3B3B6",
    300: "#A5A5A9",
    400: "#8E8E94",
    500: "#77777D",
    600: "#5D5D64",
    700: "#3B3B47",
    800: "#26262E",
    900: "#1E1E24",
    1000: "#151519",
    1100: "#000000",
  },
  "brand-light": {
    0: "#FFFFFF",
    50: "#CBE9EA",
    100: "#9ED8DA",
    200: "#6FC7C9",
    300: "#47C2C6",
    400: "#1AAFB4",
    500: "#1A3893",
    600: "#0C7175",
    700: "#14575A",
    800: "#184446",
    900: "#1A3738",
    1000: "#192A2B",
    1100: "#080A0A",
  },
  "error-light": {
    100: "#6D2626",
    200: "#DF5050",
  },
  "warning-light": {
    100: "#804F21",
    200: "#E48329",
  },
  "success-light": {
    100: "#195F3D",
    200: "#00BC62",
  },
};

const palette: Colors = {
  ...paletteDark,
  ...paletteLight,
  white: "#FFFFFF",
  black: "#000000",
};

const surfaceDark: SurfaceColors = {
  surface1: palette["grey-dark"][0],
  surface2: palette["grey-dark"][50],
  surface3: palette["grey-dark"][100],
  surface4: palette["grey-dark"][200],
  surface5: palette["grey-dark"][300],
  brand: palette["brand-dark"][100],
  brand2: palette["brand-dark"][200],
  brand3: palette["brand-dark"][50],
  brand4: palette["brand-dark"][500],
  brand5: palette["brand-dark"][600],
  success: palette["success-dark"][100],
  warning: palette["warning-dark"][100],
  error: palette["error-dark"][100],
};

const surfaceLight: SurfaceColors = {
  surface1: palette["grey-light"][0],
  surface2: palette["grey-light"][50],
  surface3: palette["grey-light"][100],
  surface4: palette["grey-light"][200],
  surface5: palette["grey-light"][300],
  brand: palette["brand-light"][100],
  brand2: palette["brand-light"][200],
  brand3: palette["brand-light"][50],
  brand4: palette["brand-light"][500],
  brand5: palette["brand-light"][600],
  success: palette["success-light"][200],
  warning: palette["warning-light"][200],
  error: palette["error-light"][200],
};

const outlineLight: OutlineColors = {
  outline1: palette["grey-light"][300],
  outline2: palette["grey-light"][200],
  outline3: palette["grey-light"][100],
  outline4: palette["brand-light"][200],
  outline5: palette["grey-light"][700],
  brand: palette["brand-light"][500],
  brand2: palette["brand-light"][600],
  error: palette["error-light"][200],
};

const outlineDark: OutlineColors = {
  outline1: palette["grey-dark"][300],
  outline2: palette["grey-dark"][200],
  outline3: palette["grey-dark"][100],
  outline4: palette["brand-dark"][200],
  outline5: palette["grey-dark"][700],
  brand: palette["brand-dark"][500],
  brand2: palette["brand-dark"][600],
  error: palette["error-dark"][100],
};

const textLight: TextColors = {
  text1: palette.black,
  text2: palette["grey-light"][500],
  text3: palette["grey-light"][500],
  brand: palette["brand-light"][500],
  brand2: palette["brand-light"][300],
  brand3: palette["brand-light"][600],
  error: palette["error-light"][200],
  warning: palette["warning-light"][200],
  success: palette["success-light"][200],
};

const textDark: TextColors = {
  text1: palette.white,
  text2: palette["grey-dark"][700],
  text3: palette["grey-dark"][500],
  brand: palette["brand-dark"][500],
  brand2: palette["brand-dark"][300],
  brand3: palette["brand-dark"][600],
  error: palette["error-dark"][100],
  warning: palette["warning-dark"][100],
  success: palette["success-dark"][100],
};

const iconLight: IconColors = {
  icon1: palette.black,
  icon2: palette["grey-light"][500],
  icon3: palette["brand-light"][200],
  icon4: palette["grey-light"][200],
  brand: palette["brand-light"][600],
  error: palette["error-light"][200],
  warning: palette["warning-light"][200],
  success: palette["success-light"][200],
};

const iconDark: IconColors = {
  icon1: palette.white,
  icon2: palette["grey-dark"][500],
  icon3: palette["brand-dark"][200],
  icon4: palette["grey-dark"][700],
  brand: palette["brand-dark"][600],
  error: palette["error-dark"][200],
  warning: palette["warning-dark"][100],
  success: palette["success-dark"][100],
};

const colors: AllColors = {
  ...palette,
  text: {
    light: textLight,
    dark: textDark,
  },
  icon: {
    light: iconLight,
    dark: iconDark,
  },
  outline: {
    light: outlineLight,
    dark: outlineDark,
  },
  surface: {
    light: surfaceLight,
    dark: surfaceDark,
  },
};

export default colors;

export const colorPalette = palette;

import { Borders, Radii, Spacings, SpacingsKeys } from "./types";

const radii: Radii = [0, 4, 8, 12];
const borders: Borders = [0, 1, 2];
const baseSize: number = 8;
const baseSpace: number = 4;

// Typescript does not have a way to specify range of array
// or infer range from a constant array. So we typecast into unknown
// then into Spacings
const sizes: Spacings = SpacingsKeys.map<number>(
  (el, index) => baseSize * index
) as unknown as Spacings;

const minWidths = SpacingsKeys.map<number>(
  (el, index) => baseSize * index
) as unknown as Spacings;

const maxWidths = SpacingsKeys.map<number>(
  (el, index) => baseSize * index
) as unknown as Spacings;

const minHeights = SpacingsKeys.map<number>(
  (el, index) => baseSize * index
) as unknown as Spacings;

const maxHeights = SpacingsKeys.map<number>(
  (el, index) => baseSize * index
) as unknown as Spacings;

const heights = SpacingsKeys.map<number>(
  (el, index) => baseSize * index
) as unknown as Spacings;

const space = SpacingsKeys.map<number>(
  (el, index) => baseSpace * index
) as unknown as Spacings;

export default {
  space,
  sizes,
  minWidths,
  maxWidths,
  minHeights,
  maxHeights,
  heights,
  radii,
  borders,
  baseSize,
  baseSpace,
};

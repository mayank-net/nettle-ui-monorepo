import * as CSS from "csstype";
import { Spacings, FontSizeKeys, FontWeights } from "theme/src/types";

/**
 * Prop definitions in styled-system are very generic and confusing. We copy their prop
 * definitions from the package and define our own simplified versions
 */

/**
 * *************************************
 * Spacings
 * *************************************
 */

export interface SpaceProps {
  m?: keyof Spacings;
  margin?: keyof Spacings;
  mt?: keyof Spacings;
  marginTop?: keyof Spacings;
  mr?: keyof Spacings;
  marginRight?: keyof Spacings;
  mb?: keyof Spacings;
  marginBottom?: keyof Spacings;
  ml?: keyof Spacings;
  marginLeft?: keyof Spacings;
  mx?: keyof Spacings;
  marginX?: keyof Spacings;
  my?: keyof Spacings;
  marginY?: keyof Spacings;
  p?: keyof Spacings;
  padding?: keyof Spacings;
  pt?: keyof Spacings;
  paddingTop?: keyof Spacings;
  pr?: keyof Spacings;
  paddingRight?: keyof Spacings;
  pb?: keyof Spacings;
  paddingBottom?: keyof Spacings;
  pl?: keyof Spacings;
  paddingLeft?: keyof Spacings;
  px?: keyof Spacings;
  paddingX?: keyof Spacings;
  py?: keyof Spacings;
  paddingY?: keyof Spacings;
}

/**
 * *************************************
 * FlexBox
 * *************************************
 */

export interface FlexProps {
  flex?: CSS.Property.Flex;
}

export interface FlexBasisProps {
  flexBasis?: CSS.Property.FlexBasis;
}

export interface AlignItemsProps {
  alignItems?: CSS.Property.AlignItems;
}

export interface AlignContentProps {
  alignContent?: CSS.Property.AlignContent;
}

export interface JustifyItemsProps {
  justifyItems?: CSS.Property.JustifyItems;
}

export interface JustifyContentProps {
  justifyContent?: CSS.Property.JustifyContent;
}

export interface FlexWrapProps {
  flexWrap?: CSS.Property.FlexWrap;
}

export interface FlexDirectionProps {
  flexDirection?: CSS.Property.FlexDirection;
}

export interface JustifySelfProps {
  justifySelf?: CSS.Property.JustifySelf;
}

export interface AlignSelfProps {
  alignSelf?: CSS.Property.AlignSelf;
}

export interface FlexGrowProps {
  flexGrow?: CSS.Property.FlexGrow;
}

export interface FlexShrinkProps {
  flexShrink?: CSS.Property.FlexShrink;
}

export interface FlexboxProps
  extends AlignItemsProps,
    AlignContentProps,
    JustifyItemsProps,
    JustifyContentProps,
    FlexWrapProps,
    FlexDirectionProps,
    FlexProps,
    FlexGrowProps,
    FlexShrinkProps,
    FlexBasisProps,
    JustifySelfProps,
    AlignSelfProps {}

/**
 * *************************************
 * Layout
 * *************************************
 */

export interface WidthProps {
  width?: CSS.Property.Width;
}

export interface HeightProps {
  height?: keyof Spacings;
}

export interface MaxWidthProps {
  maxWidth?: CSS.Property.Width;
}

export interface MinWidthProps {
  minWidth?: CSS.Property.Width;
}

export interface MaxHeightProps {
  maxHeight?: keyof Spacings;
}

export interface MinHeightProps {
  minHeight?: keyof Spacings;
}

export interface SizeProps {
  size?: keyof Spacings;
}
export interface OverflowProps {
  overflow?: CSS.Property.Overflow;
  overflowX?: CSS.Property.OverflowX;
  overflowY?: CSS.Property.OverflowY;
}

export interface LayoutProps
  extends HeightProps,
    MinHeightProps,
    MaxHeightProps,
    SizeProps,
    OverflowProps {}

/**
 * *************************************
 * Text
 * *************************************
 */

export interface TextAlignProps {
  textAlign?: CSS.Property.TextAlign;
}

export interface FontSizeProps {
  fontSize?: FontSizeKeys;
}

export interface FontWeightProps {
  fontWeight?: keyof FontWeights;
}

export interface TextOverflowProps {
  textOverflow?: "ellipsis";
}

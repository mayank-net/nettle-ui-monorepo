// import { IntrinsicAttributes } from 'react';
import {
  space,
  flex,
  flexBasis,
  layout,
  textAlign,
  width,
  minWidth,
  maxWidth,
} from "styled-system";
import {
  SpaceProps,
  FlexProps,
  FlexBasisProps,
  TextAlignProps,
  LayoutProps,
  WidthProps,
  MinWidthProps,
  MaxWidthProps,
} from "../../../props";
import cleanComponentProps from "../../../utils/cleanComponentProps";

export interface BoxProps
  extends React.HTMLAttributes<HTMLDivElement>,
    SpaceProps,
    FlexProps,
    FlexBasisProps,
    LayoutProps,
    TextAlignProps,
    WidthProps,
    MinWidthProps,
    MaxWidthProps {}

const BoxBase = cleanComponentProps<BoxProps, HTMLDivElement>("div", [
  ...(flex.propNames ? flex.propNames : []),
  ...(flexBasis.propNames ? flexBasis.propNames : []),
  ...(space.propNames ? space.propNames : []),
  ...(layout.propNames ? layout.propNames : []),
  ...(textAlign.propNames ? textAlign.propNames : []),
  ...(width.propNames ? width.propNames : []),
  ...(minWidth.propNames ? minWidth.propNames : []),
  ...(maxWidth.propNames ? maxWidth.propNames : []),
  "theme",
])`
      ${space}
      ${flex}
      ${flexBasis}
      ${layout}
      ${textAlign}
      ${width}
      ${minWidth}
  `;

BoxBase.displayName = "Box";

export default BoxBase;

import {
  fontSize,
  fontWeight,
  space,
  textStyle,
  textAlign,
  maxWidth,
  width,
} from "styled-system";
import {
  SpaceProps,
  TextAlignProps,
  FontSizeProps,
  FontWeightProps,
  TextOverflowProps,
  WidthProps,
  MaxWidthProps,
} from "../../../props";
import cleanComponentProps from "../../../utils/cleanComponentProps";
import { TextColors } from "theme/src/types";
import { themeGet } from "@styled-system/theme-get";

export interface TextProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "color">,
    FontSizeProps,
    FontWeightProps,
    SpaceProps,
    TextAlignProps,
    TextOverflowProps,
    WidthProps,
    MaxWidthProps {
  color?: keyof TextColors;
}
/** text component */

const Text = cleanComponentProps<TextProps>("span", [
  "color",
  "theme",
  "textOverflow",
  ...(fontSize.propNames ? fontSize.propNames : []),
  ...(fontWeight.propNames ? fontWeight.propNames : []),
  ...(textStyle.propNames ? textStyle.propNames : []),
  ...(textAlign.propNames ? textAlign.propNames : []),
  ...(space.propNames ? space.propNames : []),
  ...(maxWidth.propNames ? maxWidth.propNames : []),
  ...(width.propNames ? width.propNames : []),
])`
  ${fontSize}
  ${fontWeight}
  ${space}
  ${textAlign}
  ${width}
  ${maxWidth}
  ${(props: any) =>
    props.color &&
    `color: ${themeGet(`colors.text.${props.theme.themeMode}.${props.color}`)(
      props
    )};`}
  line-height: ${(props: any) =>
    themeGet(`singleLineHeights.${props.fontSize}`)(props)}px;
  ${(props: any) =>
    props.textOverflow === "ellipsis" &&
    `
    display: inline-block;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    vertical-align: middle;
    `}
`;

Text.defaultProps = {
  fontSize: 1,
};

Text.displayName = "Text";

export default Text;

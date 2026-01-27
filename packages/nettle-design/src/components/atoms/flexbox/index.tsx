import { flexbox } from "styled-system";
import { FlexboxProps } from "../../../props";
import cleanComponentProps from "../../../utils/cleanComponentProps";
// Tuxedo imports
import Box, { BoxProps } from "../box";

export interface FlexBoxProps extends BoxProps, FlexboxProps {
  inline?: boolean;
}

const FlexBox = cleanComponentProps<FlexBoxProps>(Box, [
  "inline",
  ...(flexbox.propNames ? flexbox.propNames : []),
  "theme",
])`
  ${flexbox}
  display: ${(props: any) => (props.inline ? "inline-flex" : "flex")};
`;

FlexBox.displayName = "FlexBox";

export default FlexBox;

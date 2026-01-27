import { WarningCircle } from "@phosphor-icons/react";
import { FlexBox } from "nettle-design/src";
import { toast } from "react-toastify";

export function toastSuccess(text: string) {
  toast(text, {
    position: "bottom-center",
    className: "custom-toast-success",
    hideProgressBar: true,
    icon: (
      <FlexBox mr={2}>
        <WarningCircle size={22} color={"#00BC62"} />
      </FlexBox>
    ),
    closeButton: () => null,
  });
}

export function toastError(text: string) {
  toast(text, {
    position: "bottom-center",
    className: "custom-toast-error",
    hideProgressBar: true,
    icon: (
      <FlexBox mr={2}>
        <WarningCircle size={22} color={"#df5050"} />
      </FlexBox>
    ),
    closeButton: () => null,
  });
}

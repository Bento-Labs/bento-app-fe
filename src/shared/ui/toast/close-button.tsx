import { ComponentProps } from "react";
import { CloseButton as ToastifyCloseButton } from "react-toastify";

import { Icon } from "../icon";

export const CloseButton = (
  props: ComponentProps<typeof ToastifyCloseButton>
) => {
  return (
    <Icon
      className="absolute right-2.5 top-2.5 size-3 cursor-pointer text-darkCoral"
      name="cross"
      onClick={props.closeToast}
    />
  );
};

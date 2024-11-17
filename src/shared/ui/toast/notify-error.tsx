import { ToastOptions, toast } from "react-toastify";

import { ErrorToast } from "./error-toast";
import { ErrorData } from "./types";

export const notifyError = (
  message: string,
  description?: string,
  options?: ToastOptions<ErrorData> | undefined
) => {
  return toast(<ErrorToast details={description} message={message} />, {
    ...options,
    data: { message },
  });
};

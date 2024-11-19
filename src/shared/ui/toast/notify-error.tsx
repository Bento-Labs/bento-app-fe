import { ToastOptions, toast } from "react-toastify";

import { ErrorData } from "./types";

// export const notifyError = (
//   message: string,
//   description?: string,
//   options?: ToastOptions<ErrorData> | undefined
// ) => {
//   return toast(<ErrorToast details={description} message={message} />, {
//     ...options,
//     data: { message },
//   });
// };

export const notifyError = (
  message: string,
  _description?: string,
  options?: ToastOptions<ErrorData>
) => {
  return toast.error(message, options);
};

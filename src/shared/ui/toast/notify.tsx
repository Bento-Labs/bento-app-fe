import { ToastOptions, ToastPromiseParams, toast } from "react-toastify";

import { ErrorData } from "./types";

export const notifyError = (
  message: string,
  _description?: string,
  options?: ToastOptions<ErrorData>
) => {
  return toast.error(message, options);
};

export const notifySuccess = (message: string) => {
  return toast.success(message);
};

export const notifyPromise = <T,>(
  promise: Promise<T>,
  promiseParams: ToastPromiseParams<T>,
  options?: ToastOptions<T>
) => {
  return toast.promise<T>(promise, promiseParams, options);
};

export const notify = (message: string, options?: ToastOptions) => {
  return toast(message, options);
};

import {
  HttpRequestError,
  RpcRequestError,
  UserRejectedRequestError,
  WebSocketRequestError,
} from "viem";

import { notifyError } from "./notify-error";

export const catchError = (error: unknown) => {
  console.error(error);
  if (error instanceof UserRejectedRequestError) {
    return;
  }

  if (error instanceof RpcRequestError) {
    return notifyError(error.shortMessage, error.details);
  }

  if (error instanceof HttpRequestError) {
    return notifyError(error.shortMessage, error.details);
  }

  if (error instanceof WebSocketRequestError) {
    return notifyError(error.shortMessage, error.details);
  }

  if (
    error instanceof Object &&
    "message" in error &&
    typeof error.message === "string"
  ) {
    return notifyError(error.message);
  }

  return notifyError("Something went wrong");
};

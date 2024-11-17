import { PropsWithChildren } from "react";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { rqClient } from "./client";

export const Provider = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={rqClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

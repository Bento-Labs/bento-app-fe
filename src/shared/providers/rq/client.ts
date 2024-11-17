import { QueryClient } from "@tanstack/react-query";

export const rqClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

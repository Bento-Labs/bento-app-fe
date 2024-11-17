import { createContext, useContext } from "react";

import invariant from "tiny-invariant";

export interface ModalContextType {
  isOpen: boolean;
  onChange: (isOpen: boolean) => void;
}

export const ModalContext = createContext<ModalContextType | undefined>(
  undefined
);

export function useModalContext() {
  const ctx = useContext(ModalContext);

  invariant(ctx, "useModalContext must be used within ModalContext");

  return ctx;
}

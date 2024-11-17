import type { ReactNode } from "react";
import { useCallback, useMemo, useState } from "react";

import { AnimatePresence } from "framer-motion";

import type { ModalContextType } from "./context";

import { Body } from "./body";
import { Content } from "./content";
import { ModalContext } from "./context";
import { Overlay } from "./overlay";

export interface ModalProps {
  children?: ((props: ModalContextType) => ReactNode) | ReactNode;
  onClose: (isOpen: false) => void;
}

export function Modal(props: ModalProps) {
  const { children, onClose } = props;

  const [isOpen, setIsOpen] = useState(true);

  const handleChange = useCallback(() => {
    setIsOpen(false);
  }, []);

  const ctx = useMemo(
    () => ({ isOpen, onChange: handleChange }),
    [isOpen, handleChange]
  );

  return (
    <ModalContext.Provider value={ctx}>
      <AnimatePresence onExitComplete={() => onClose?.(false)}>
        {isOpen &&
          (typeof children === "function" ? children?.(ctx) : children)}
      </AnimatePresence>
    </ModalContext.Provider>
  );
}

Modal.Overlay = Overlay;
Modal.Content = Content;
Modal.Body = Body;

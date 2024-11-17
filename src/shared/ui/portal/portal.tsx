import type { PropsWithChildren } from "react";
import { useRef } from "react";
import { createPortal } from "react-dom";

interface Props {
  className?: string;
  portalElement?: HTMLElement | null;
}

export function Portal({
  className,
  portalElement: portalElementProp,
  children,
}: PropsWithChildren<Props>) {
  const portalElementRef = useRef(
    portalElementProp ?? getDefaultPortalElement(className)
  );

  return (
    <>
      {portalElementRef.current
        ? createPortal(children, portalElementRef.current)
        : children}
    </>
  );
}

function getDefaultPortalElement(className: string | undefined) {
  const portal = document.getElementById("portal-root");
  if (className) portal?.classList.add(className);

  if (portal) return portal;

  const root = document.getElementById("root") ?? document.body;
  const fallbackPortal = document.createElement("div");
  fallbackPortal.id = "portal-root";
  root.appendChild(fallbackPortal);
  if (className) {
    fallbackPortal.classList.add(className);
  }

  return fallbackPortal;
}

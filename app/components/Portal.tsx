import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

type PortalProps = {
  children: React.ReactNode;
  targetId: string;
};

export default function Portal({ children, targetId }: PortalProps) {
  const [mounted, setMounted] = useState(false);
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const target = document.getElementById(targetId);
    setPortalElement(target);
    setMounted(true);
  }, [targetId]);

  if (!mounted || !portalElement) return null;

  return createPortal(children, portalElement);
}

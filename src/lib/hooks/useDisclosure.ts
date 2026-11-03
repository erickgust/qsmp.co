import { useEffect, useId, useRef, useState } from "react";

export function useDisclosure() {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  useEffect(() => {
    const root = rootRef.current;
    if (!isOpen || !root) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      // Stop the Escape from also closing a surrounding <dialog>
      event.preventDefault();
      event.stopPropagation();
      setIsOpen(false);
      buttonRef.current?.focus();
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!root.contains(event.target as Node)) setIsOpen(false);
    };
    const onFocusOut = (event: FocusEvent) => {
      if (event.relatedTarget && !root.contains(event.relatedTarget as Node)) setIsOpen(false);
    };

    root.addEventListener("keydown", onKeyDown);
    root.addEventListener("focusout", onFocusOut);
    document.addEventListener("pointerdown", onPointerDown);

    return () => {
      root.removeEventListener("keydown", onKeyDown);
      root.removeEventListener("focusout", onFocusOut);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [isOpen]);

  return {
    isOpen,
    close: () => setIsOpen(false),
    rootRef,
    buttonProps: {
      ref: buttonRef,
      type: "button" as const,
      "aria-expanded": isOpen,
      "aria-controls": panelId,
      onClick: () => setIsOpen((open) => !open),
    },
    panelProps: { id: panelId, hidden: !isOpen },
  };
}

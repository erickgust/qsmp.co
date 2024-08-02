import React from "react";

interface ModalProps {
  isOpen: boolean;
  toggleModal: () => void;

  children: React.ReactNode;
}

export function Modal({ isOpen, toggleModal, children }: ModalProps) {
  const modalClasses = isOpen ? "block" : "hidden";

  function clickingOutside(event: React.MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) {
      toggleModal();
    }
  }

  return (
    <div
      onClick={clickingOutside}
      id="modal"
      className={`fixed inset-0 h-full z-50 flex items-center justify-center ${modalClasses} bg-neutral-900/70`}
    >
      <div className="relative md:max-w-4xl bg-white p-8 md:px-16 md:py-14 shadow-lg w-10/12">
        {children}
      </div>
    </div>
  );
}

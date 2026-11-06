import React, { useEffect, useRef } from 'react'
import clsx from 'clsx'

type ModalProps = {
  isOpen: boolean
  onClose: () => void

  children: React.ReactNode
} & React.ComponentPropsWithoutRef<'dialog'>

// Children must fill the dialog (padding goes on them) so a click on the dialog itself is a backdrop click
export function Modal({
  isOpen,
  onClose,
  children,
  className,
  ...props
}: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return

    if (isOpen && !dialog.open) dialog.showModal()
    if (!isOpen && dialog.open) dialog.close()
  }, [isOpen])

  return (
    // oxlint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions -- the keyboard path is the native Escape
    <dialog
      ref={ref}
      // Escape closes the dialog natively, bypassing React state; the close event also fires (async) when isOpen turns false
      onClose={() => isOpen && onClose()}
      onClick={(event) => event.target === event.currentTarget && onClose()}
      className={clsx('backdrop:bg-neutral-900/70', className)}
      {...props}
    >
      {children}
    </dialog>
  )
}

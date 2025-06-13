import * as React from 'react'
import { X } from 'lucide-react'
import clsx from 'clsx'
import { Dialog } from 'radix-ui'
import './Dialog.css'
type ModalDialogProps = {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  title?: string
  children?: React.ReactNode
  className?: string
}

const ModalDialog: React.FC<ModalDialogProps> = ({
  isOpen,
  setIsOpen,
  title,
  children,
  className,
}) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-[#000000B2] backdrop-blur-[2px] z-40" />
        <Dialog.Content
          className={clsx(
            'fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
            'bg-white rounded-lg shadow-lg p-0 w-full max-w-[90%] md:max-w-md mx-auto md:my-0 my-3 overflow-y-auto',
            'hide-scrollbar',
            className,
          )}
        >
          <div className="sticky top-[0.3px] z-10 bg-white px-6 pt-6 pb-2">
            <div className="flex items-center justify-between">
              <Dialog.Title className="lg:text-[25px] sm:text-lg text-[16px] text-[#19191A] font-semibold">{title}</Dialog.Title>
              <Dialog.Close asChild>
                <button
                  aria-label="Close"
                  className="text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
                >
                  <X className="w-6 h-6 text-[#9CA3AF]" />
                </button>
              </Dialog.Close>
            </div>
          </div>

          <div className="px-6 pb-6 pt-2">{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default ModalDialog

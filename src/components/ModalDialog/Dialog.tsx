import * as React from "react";
import { X } from "lucide-react";
import clsx from "clsx";
import { Dialog } from "radix-ui";

type ModalDialogProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  title?: string;
  children?: React.ReactNode;
  className?: string;
};

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
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-40" />
        <Dialog.Content
          className={clsx(
            "fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
            "bg-white rounded-lg shadow-lg p-6 w-full max-w-[90%] md:max-w-md mx-auto",
            className
          )}
        >
          <div className="flex items-center justify-between mb-4">
            <Dialog.Title className="text-lg font-semibold">{title}</Dialog.Title>
            <Dialog.Close asChild>
              <button
                aria-label="Close"
                className="text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5 text-[#9CA3AF]" />
              </button>
            </Dialog.Close>
          </div>
          <div>{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ModalDialog;

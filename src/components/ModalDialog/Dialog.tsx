import * as React from "react";
import { Dialog } from "radix-ui";
import { X } from "lucide-react";
import clsx from "clsx";

type ModalDialogProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    trigger: React.ReactNode;
    onSubmit?: (event: React.FormEvent<HTMLFormElement>) => Promise<void> | void;
    title: string;
    children: React.ReactNode;
    className?: string;
};

const ModalDialog: React.FC<ModalDialogProps> = ({
    open,
    onOpenChange,
    trigger,
    onSubmit,
    title,
    children,
    className,
}) => {
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (onSubmit) {
            await onSubmit(event);
        }
        onOpenChange(false);
    };

    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50 z-40" />
                <Dialog.Content
                    className={clsx(
                        "fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
                        "bg-white rounded-lg shadow-lg p-6 w-full max-w-md",
                        className
                    )}
                >
                    <div className="flex items-center justify-between mb-4">
                        <Dialog.Title className="text-lg font-semibold">{title}</Dialog.Title>
                        <Dialog.Close asChild>
                            <button
                                aria-label="Close"
                                className="text-gray-500 hover:text-gray-700 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </Dialog.Close>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {children}
                        <button
                            type="submit"
                            className="w-full mt-2 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
                        >
                            Submit
                        </button>
                    </form>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

export default ModalDialog
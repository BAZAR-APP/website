'use client'

import { Dialog } from 'radix-ui'

interface OverlayLoaderProps {
  open: boolean
}

const OverlayLoader = ({ open }: OverlayLoaderProps) => {
  return (
    <Dialog.Root open={open}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm" />
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-white border-t-transparent" />
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default OverlayLoader

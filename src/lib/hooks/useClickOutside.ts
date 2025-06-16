import { useEffect } from 'react'

export function useClickOutside<T extends HTMLElement>(
  ref: React.RefObject<T>,
  callback: () => void,
  active: boolean = true
) {
  useEffect(() => {
    if (!active) return

    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref, callback, active])
}

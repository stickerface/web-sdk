// eslint-disable-next-line no-unused-vars
import { MutableRefObject, useEffect } from 'react'

export function handleClickOutside(
  ref: MutableRefObject<any>,
  handler: () => void
) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target)) {
        handler()
      }
    }
    document.addEventListener('mousedown', (e) => handleClickOutside(e))

    return () => {
      document.removeEventListener('mousedown', (e) => handleClickOutside(e))
    }
  }, [ref])
}

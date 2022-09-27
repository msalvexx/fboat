import React, { MutableRefObject } from 'react'

export const useOutsideClick = (callback: () => void): MutableRefObject<any> => {
  const ref = React.useRef<any>()

  React.useEffect(() => {
    const handleClick = (event: Event): void => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback()
      }
    }

    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [ref])

  return ref
}

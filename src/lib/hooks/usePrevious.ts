import { useRef, useEffect } from 'react'

const usePrevious = <T extends {}>(value: T): T | undefined => {
  const ref = useRef<T | undefined>(undefined)

  useEffect(() => {
    ref.current = value
  }, [value])

  // oxlint-disable-next-line react/refs -- returning the previous render's value is this hook's purpose
  return ref.current
}

export default usePrevious

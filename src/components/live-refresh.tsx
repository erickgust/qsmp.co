'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const REFRESH_INTERVAL = 60_000

export function LiveRefresh() {
  const router = useRouter()

  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | undefined
    const refresh = () => router.refresh()
    const start = () => {
      timer = setInterval(refresh, REFRESH_INTERVAL)
    }

    const onVisibilityChange = () => {
      clearInterval(timer)
      if (document.hidden) return
      refresh()
      start()
    }

    if (!document.hidden) start()
    document.addEventListener('visibilitychange', onVisibilityChange)
    return () => {
      clearInterval(timer)
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [router])

  return null
}

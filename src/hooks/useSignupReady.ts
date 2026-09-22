import { useEffect, useState } from 'react'
export function useSignupReady() {
  const [ready, setReady] = useState<boolean | null>(null)
  useEffect(() => {
    const controller = new AbortController()
    void fetch('/api/readiness', { signal: controller.signal })
      .then((res) => res.ok ? res.json() : null)
      .then((data) => setReady(data?.signupReady === true))
      .catch(() => { if (!controller.signal.aborted) setReady(false) })
    return () => controller.abort()
  }, [])
  return ready
}

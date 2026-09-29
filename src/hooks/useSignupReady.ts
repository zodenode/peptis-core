import { useEffect, useState } from 'react'
export function useSignupStatus() {
  const [status, setStatus] = useState<{ signupReady: boolean | null; emailReady: boolean | null }>({ signupReady: null, emailReady: null })
  useEffect(() => {
    const controller = new AbortController()
    void fetch('/api/readiness', { signal: controller.signal })
      .then(res => res.ok ? res.json() : null)
      .then(data => setStatus({ signupReady: data?.signupReady === true, emailReady: data?.emailReady === true }))
      .catch(() => { if (!controller.signal.aborted) setStatus({ signupReady: false, emailReady: false }) })
    return () => controller.abort()
  }, [])
  return status
}
export function useSignupReady() { return useSignupStatus().signupReady }

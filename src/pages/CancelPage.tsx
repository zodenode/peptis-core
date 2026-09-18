import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Footer } from '../components/layout/Footer'
import { Header } from '../components/layout/Header'
import { track } from '../lib/analytics'
import { cancelReservation } from '../lib/reservations'

export function CancelPage() {
  const [params] = useSearchParams()
  const token = params.get('token') ?? ''
  const [state, setState] = useState<'idle' | 'working' | 'done' | 'error'>('idle')

  const handleCancel = async () => {
    setState('working')
    const result = await cancelReservation(token)
    if (result.ok) {
      track('reservation_cancelled')
      setState('done')
    } else {
      setState('error')
    }
  }

  return (
    <div className="site">
      <Header variant="quiz" />
      <main className="notice-page">
        <section className="section">
          <div className="notice-inner">
            <p className="eyebrow">Update list</p>
            <h1>Cancel your updates</h1>
            {!token ? (
              <p>
                This page needs the cancellation link from your confirmation email. Open that link
                to cancel, or contact us and we will take care of it.
              </p>
            ) : state === 'done' ? (
              <>
                <p>
                  Your updates are cancelled. You will no longer receive product or launch
                  emails, and nothing was ever charged.
                </p>
                <p>
                  If you change your mind, you can take the quiz again at any time and leave a
                  new email.
                </p>
                <Link className="btn btn-primary" to="/">
                  Return home
                </Link>
              </>
            ) : (
              <>
                <p>
                  Cancelling removes you from product and launch emails. There is nothing to
                  refund because nothing was charged.
                </p>
                {state === 'error' ? (
                  <p className="form-error" role="alert">
                    We could not cancel just now. Please try again, or contact us if it keeps
                    failing.
                  </p>
                ) : null}
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleCancel}
                  disabled={state === 'working'}
                >
                  {state === 'working' ? 'Cancelling…' : 'Cancel my updates'}
                </button>
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

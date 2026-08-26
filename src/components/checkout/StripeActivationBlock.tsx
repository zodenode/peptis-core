import { useEffect, useRef } from 'react'
import { track } from '../../lib/analytics'

const wallets = ['Apple Pay', 'Google Pay', 'Link'] as const

export function StripeActivationBlock() {
  const viewed = useRef(false)

  useEffect(() => {
    if (viewed.current) return
    viewed.current = true
    track('stripe_activation_block_viewed')
  }, [])

  return (
    <section className="activation-block" aria-labelledby="activation-payment-title">
      <div className="activation-lock" aria-hidden="true">✓</div>
      <div>
        <p className="quiz-kicker">Future payment activation</p>
        <h2 id="activation-payment-title">No payment required today</h2>
        <p>
          A $0 reservation does not need a PaymentIntent. Wallets will become available only if
          services launch, you are eligible, and you affirmatively activate a paid plan.
        </p>
      </div>
      <div className="wallet-preview" role="img" aria-label="Preview of wallet options available at future activation: Apple Pay, Google Pay and Link">
        {wallets.map((wallet) => (
          <div className="wallet-pill" key={wallet} aria-hidden="true">
            <strong>{wallet}</strong>
            <span>Available at activation</span>
          </div>
        ))}
      </div>
      <p className="activation-footnote">
        This is a preview. No wallet or card details are requested or stored with your reservation.
      </p>
    </section>
  )
}

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
      <div className="wallet-preview" aria-label="Wallet options available at future activation">
        {wallets.map((wallet) => (
          <button
            type="button"
            className="wallet-pill"
            key={wallet}
            aria-disabled="true"
            aria-label={`${wallet} preview. Available when you activate your plan.`}
            onClick={() => track('wallet_preview_clicked', { wallet })}
          >
            <strong>{wallet}</strong>
            <span>Available at activation</span>
          </button>
        ))}
      </div>
      <p className="activation-footnote">
        This is a preview. No wallet or card details are requested or stored with your reservation.
      </p>
    </section>
  )
}

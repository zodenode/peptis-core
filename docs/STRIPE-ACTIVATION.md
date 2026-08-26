# Stripe activation architecture

The Peptis Core Continuity founding reservation is **$0 today**. It does not
create a PaymentIntent, collect payment details, or load the Stripe SDK. Payment
wallets cannot process a $0 PaymentIntent, so Apple Pay, Google Pay, and Link are
shown only as previews of future activation options.

## Future activation flow

1. Peptis confirms that clinical services have launched in the member's state.
2. A future backend performs eligibility and launch-term checks outside this
   front-end reservation flow.
3. After the member affirmatively chooses to activate, the server creates a
   Stripe Customer and either:
   - a SetupIntent to save an authorized payment method before subscription
     creation; or
   - a subscription and its payment flow when an immediate charge is due.
4. The client receives only a short-lived client secret and mounts Stripe's
   Payment Element or Express Checkout Element inside
   `StripeActivationBlock`.
5. The server treats verified webhooks—not a client redirect—as the source of
   truth for activation and billing state.

Express Checkout can offer Apple Pay, Google Pay, and Link depending on device,
browser, wallet setup, currency, and Stripe account configuration. Apple Pay
also requires domain registration with Stripe. Wallet availability must not be
promised before Stripe reports it for the current session.

## Backend requirements

- An authenticated endpoint that creates or reuses a Stripe Customer.
- An activation endpoint that validates state availability, eligibility state,
  current launch terms, price ID, and affirmative member consent before
  creating a SetupIntent or subscription.
- Idempotency keys on Stripe creation requests.
- A webhook endpoint that verifies Stripe signatures and handles at minimum:
  `setup_intent.succeeded`, `invoice.paid`, `invoice.payment_failed`,
  `customer.subscription.updated`, and `customer.subscription.deleted`.
- Durable storage linking the internal member/reservation ID to Stripe Customer
  and subscription IDs.
- Privacy, consent, audit, retry, and customer-support procedures.

Use `VITE_PUBLIC_STRIPE_PUBLISHABLE_KEY` only for Stripe's publishable key.
Never place a Stripe secret key or webhook secret in Vite client variables,
source code, or browser storage.

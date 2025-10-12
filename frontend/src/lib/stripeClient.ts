import { loadStripe } from "@stripe/stripe-js"

let stripePromise: ReturnType<typeof loadStripe>

export function getStripe() {
  if (!stripePromise) {
    const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY

    if (!publishableKey) {
      console.warn("VITE_STRIPE_PUBLISHABLE_KEY is not set. Stripe checkout will not initialize.")
    }

    stripePromise = loadStripe(publishableKey ?? "")
  }

  return stripePromise
}

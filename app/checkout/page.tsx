import { Metadata } from 'next'
import { CheckoutClient } from '@/components/checkout/CheckoutClient'

export const metadata: Metadata = {
  title: 'Checkout | Dhanya Trail',
  robots: { index: false, follow: false },
}

export default function CheckoutPage() {
  return (
    <div style={{ background: 'var(--cream)', minHeight: '80vh', padding: 'var(--space-2xl) 0 var(--space-3xl)' }}>
      <div className="container">
        <CheckoutClient />
      </div>
    </div>
  )
}

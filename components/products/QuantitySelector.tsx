'use client'

interface QuantitySelectorProps {
  value: number
  onChange: (val: number) => void
  min?: number
  max?: number
}

export function QuantitySelector({ value, onChange, min = 1, max = 20 }: QuantitySelectorProps) {
  return (
    <div className="qty-selector" role="group" aria-label="Quantity">
      <button
        className="qty-btn"
        onClick={() => onChange(Math.max(min, value - 1))
        }
        aria-label="Decrease quantity"
        disabled={value <= min}
      >
        −
      </button>
      <span className="qty-value" aria-live="polite">{value}</span>
      <button
        className="qty-btn"
        onClick={() => onChange(Math.min(max, value + 1))}
        aria-label="Increase quantity"
        disabled={value >= max}
      >
        +
      </button>
    </div>
  )
}

'use client'

import { ProductVariant } from '@/lib/types'
import { formatWeight } from '@/lib/types'

interface WeightSelectorProps {
  variants: ProductVariant[]
  selectedWeight: number
  onSelect: (weight: number) => void
}

export function WeightSelector({ variants, selectedWeight, onSelect }: WeightSelectorProps) {
  const sortedVariants = [...variants].sort((a, b) => a.weight_grams - b.weight_grams)

  return (
    <div>
      <div className="product-weight-label">Select Weight</div>
      <div className="weight-pills">
        {sortedVariants.map(variant => {
          const isUnavailable = !variant.price_not_configured && variant.inventory_packs === 0
          const isSelected = variant.weight_grams === selectedWeight
          return (
            <button
              key={variant.weight_grams}
              className={`weight-pill ${
                isSelected ? 'active' : ''
              } ${isUnavailable ? 'unavailable' : ''}`}
              onClick={() => !isUnavailable && onSelect(variant.weight_grams)}
              disabled={isUnavailable}
              aria-pressed={isSelected}
              title={isUnavailable ? 'Out of stock' : ''}
            >
              {formatWeight(variant.weight_grams)}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// Delivery charges, worked out from the order value and the delivery PIN code.
// Used by both the checkout page (to show the charge) and the order API (to calculate the real total).

export const FREE_DELIVERY_ABOVE = 1499

export const DELIVERY_RATES = {
  hisar: 0,
  ncr: 60,
  rest: 100,
}

// Hisar city PIN codes (free delivery)
const HISAR_PINCODES = ['125001', '125004', '125005', '125006', '125011']

// Delhi NCR: Delhi (110xxx), Faridabad (121xxx), Gurugram (122xxx), Ghaziabad (2010xx), Noida / Greater Noida (2013xx)
const NCR_PREFIXES = ['110', '121', '122', '2010', '2013']

export type DeliveryZone = 'hisar' | 'ncr' | 'rest'

export function isValidPincode(pin: string): boolean {
  return /^[1-9][0-9]{5}$/.test(pin.trim())
}

export function deliveryZone(pin: string): DeliveryZone {
  const p = pin.trim()
  if (HISAR_PINCODES.includes(p)) return 'hisar'
  if (NCR_PREFIXES.some(prefix => p.startsWith(prefix))) return 'ncr'
  return 'rest'
}

export function deliveryFee(subtotal: number, pin: string): number {
  if (subtotal >= FREE_DELIVERY_ABOVE) return 0
  return DELIVERY_RATES[deliveryZone(pin)]
}

export const ZONE_LABELS: Record<DeliveryZone, string> = {
  hisar: 'Hisar',
  ncr: 'Delhi NCR',
  rest: 'Rest of India',
}

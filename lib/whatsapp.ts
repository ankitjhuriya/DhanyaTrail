import { CartItem, Settings } from './types'

export function generateWhatsAppMessage(
  cartItems: CartItem[],
  settings: Settings,
  total: number
): string {
  const intro = settings.whatsapp_default_message || 'Hello Dhanya Trail, I would like to place an order.'

  const itemLines = cartItems.map(item => {
    const weightLabel = item.weight === 1000 ? '1 kg' : `${item.weight} g`
    return `${item.productName} — ${weightLabel} × ${item.quantity}`
  })

  const totalLine = `Total: ₹${Math.round(total).toLocaleString('en-IN')}`
  const closing = 'Please confirm my order.'

  const message = [
    intro,
    '',
    ...itemLines,
    '',
    totalLine,
    '',
    closing,
  ].join('\n')

  return message
}

export function buildWhatsAppUrl(phone: string, message: string): string {
  const cleanPhone = phone.replace(/\D/g, '')
  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`
}

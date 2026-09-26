'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartItem } from './types'

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  addItem: (item: CartItem) => void
  removeItem: (productId: string, weight: number) => void
  updateQuantity: (productId: string, weight: number, quantity: number) => void
  clearCart: () => void
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
  getTotal: () => number
  getItemCount: () => number
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (newItem) => {
        const items = get().items
        const existingIndex = items.findIndex(
          i => i.productId === newItem.productId && i.weight === newItem.weight
        )

        if (existingIndex >= 0) {
          const updated = [...items]
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: updated[existingIndex].quantity + newItem.quantity,
          }
          set({ items: updated, isOpen: true })
        } else {
          set({ items: [...items, newItem], isOpen: true })
        }
      },

      removeItem: (productId, weight) => {
        set(state => ({
          items: state.items.filter(
            i => !(i.productId === productId && i.weight === weight)
          ),
        }))
      },

      updateQuantity: (productId, weight, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId, weight)
          return
        }
        set(state => ({
          items: state.items.map(i =>
            i.productId === productId && i.weight === weight
              ? { ...i, quantity }
              : i
          ),
        }))
      },

      clearCart: () => set({ items: [] }),

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set(state => ({ isOpen: !state.isOpen })),

      getTotal: () => {
        return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0)
      },

      getItemCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0)
      },
    }),
    {
      name: 'dhanya-trail-cart',
      partialize: (state) => ({ items: state.items }),
    }
  )
)

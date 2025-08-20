// src/context/CartContext.tsx
import { createContext, useContext, ReactNode } from 'react'
import { useCart } from '../customHooks/cartHook'

// Tomamos el tipo que devuelve el hook para no duplicar interfaces
type CartContextValue = ReturnType<typeof useCart>

const CartContext = createContext<CartContextValue | undefined>(undefined)

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const cart = useCart() // una sola instancia global
  return (
    <CartContext.Provider value={cart}>
      {children}
    </CartContext.Provider>
  )
}

export const useCartContext = (): CartContextValue => {
  const ctx = useContext(CartContext)
  if (!ctx) {
    throw new Error('useCartContext debe usarse dentro de <CartProvider>')
  }
  return ctx
}

import { useState, useEffect } from 'react'
import { Product } from '../types/Product'

export interface CartItem {
  product: Product
  quantity: number
  selectedColor?: string
  selectedSize?: string
}

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const storedCart = localStorage.getItem('cart')
    return storedCart ? JSON.parse(storedCart) : []
  })

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (item: CartItem) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(
        i =>
          i.product.id === item.product.id &&
          i.selectedColor === item.selectedColor &&
          i.selectedSize === item.selectedSize
      )

      if (existingIndex !== -1) {
        const updated = [...prev]
        updated[existingIndex].quantity += item.quantity
        return updated
      }

      return [...prev, item]
    })
  }

  const removeFromCart = (productId: number, color?: string, size?: string) => {
    setCart(prev =>
      prev.filter(
        i =>
          !(
            i.product.id === productId &&
            i.selectedColor === color &&
            i.selectedSize === size
          )
      )
    )
  }

  const getTotalItems = () => cart.reduce((sum, i) => sum + i.quantity, 0)

  return { cart, addToCart, removeFromCart, getTotalItems }
}

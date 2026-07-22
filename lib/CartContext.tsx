'use client'
import React, { createContext, useContext, useState, useEffect } from 'react'
import { getCart, createCart, addToCart as apiAddToCart, updateLineItem as apiUpdateLineItem, removeLineItem as apiRemoveLineItem, getRegions, MedusaCart } from './medusa'

interface CartContextType {
  cart: MedusaCart | null
  loading: boolean
  addToCart: (variantId: string, quantity: number) => Promise<void>
  updateLineItem: (lineId: string, quantity: number) => Promise<void>
  removeLineItem: (lineId: string) => Promise<void>
  refreshCart: () => Promise<void>
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<MedusaCart | null>(null)
  const [loading, setLoading] = useState(true)

  async function loadOrCreateCart() {
    try {
      setLoading(true)
      let cartId = localStorage.getItem('medusa_cart_id')
      if (cartId) {
        try {
          const data = await getCart(cartId)
          setCart(data)
          setLoading(false)
          return
        } catch (e) {
          console.error("Cart expired or not found, creating new one...")
          localStorage.removeItem('medusa_cart_id')
        }
      }
      
      // Fetch regions first
      const regions = await getRegions()
      const regionId = regions?.[0]?.id
      const newCart = await createCart(regionId)
      localStorage.setItem('medusa_cart_id', newCart.id)
      setCart(newCart)
    } catch (err) {
      console.error("Error initializing cart:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadOrCreateCart()
  }, [])

  async function refreshCart() {
    const cartId = localStorage.getItem('medusa_cart_id')
    if (!cartId) return
    try {
      const data = await getCart(cartId)
      setCart(data)
    } catch (e) {
      console.error(e)
    }
  }

  async function addToCart(variantId: string, quantity: number) {
    let cartId = localStorage.getItem('medusa_cart_id')
    try {
      if (!cartId) {
        const regions = await getRegions()
        const regionId = regions?.[0]?.id
        const newCart = await createCart(regionId)
        cartId = newCart.id
        localStorage.setItem('medusa_cart_id', cartId)
      }
      const updated = await apiAddToCart(cartId, variantId, quantity)
      setCart(updated)
      
      // Open the minicart drawer visually
      if (typeof window !== 'undefined') {
        const drawer = document.querySelector('.rbt-minicart-wrapper-active');
        if (drawer) {
          drawer.classList.add('active');
          const body = document.querySelector('body');
          if (body) body.classList.add('rbt-minicart-active');
        }
      }
    } catch (err) {
      console.error("Error adding to cart:", err)
    }
  }

  async function updateLineItem(lineId: string, quantity: number) {
    const cartId = localStorage.getItem('medusa_cart_id')
    if (!cartId) return
    try {
      const updated = await apiUpdateLineItem(cartId, lineId, quantity)
      setCart(updated)
    } catch (err) {
      console.error(err)
    }
  }

  async function removeLineItem(lineId: string) {
    const cartId = localStorage.getItem('medusa_cart_id')
    if (!cartId) return
    try {
      const updated = await apiRemoveLineItem(cartId, lineId)
      setCart(updated)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <CartContext.Provider value={{ cart, loading, addToCart, updateLineItem, removeLineItem, refreshCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

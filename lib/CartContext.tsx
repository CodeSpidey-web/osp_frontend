'use client'
import React, { createContext, useContext, useState, useEffect } from 'react'
import { getCart, createCart, addToCart as apiAddToCart, updateLineItem as apiUpdateLineItem, removeLineItem as apiRemoveLineItem, getRegions, MedusaCart, fetchApi } from './medusa'
import { useAuth } from './AuthContext'
import { useRouter } from 'next/navigation'

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
  const { customer, loading: authLoading } = useAuth()
  const router = useRouter()

  async function loadOrCreateCart() {
    if (authLoading) return
    if (!customer) {
      localStorage.removeItem('medusa_cart_id')
      setCart(null)
      setLoading(false)
      return
    }
    try {
      setLoading(true)
      let cartId = localStorage.getItem('medusa_cart_id')
      if (!cartId) {
        try {
          const res = await fetchApi<{ cart_id: string | null }>('/store/customers/me/cart')
          if (res.cart_id) {
            cartId = res.cart_id
            localStorage.setItem('medusa_cart_id', res.cart_id)
          }
        } catch (fetchErr) {
          console.error("Failed to fetch customer cart from backend:", fetchErr)
        }
      }

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
  }, [customer, authLoading])

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
    if (!customer) {
      router.push('/login')
      return
    }
    
    // Validate live inventory stock first
    try {
      const mockVariantIds = ['variant_rpi4', 'variant_ard_kit', 'variant_uno', 'variant_sr04', 'variant_esp32', 'variant_bb'];
      if (!mockVariantIds.includes(variantId)) {
        const invRes = await fetchApi<{ inventory: Record<string, number> }>(`/store/inventory?variant_ids=${variantId}`);
        const stock = invRes.inventory[variantId] ?? 0;
        if (stock === 0) {
          alert("Sorry, this item is currently out of stock!");
          return;
        }
      }
    } catch (e) {
      console.warn("Failed to check inventory before adding to cart:", e);
    }

    let cartId = localStorage.getItem('medusa_cart_id')
    try {
      if (!cartId) {
        const regions = await getRegions()
        const regionId = regions?.[0]?.id
        const newCart = await createCart(regionId)
        cartId = newCart.id
        localStorage.setItem('medusa_cart_id', cartId)
      }
      
      let updated;
      try {
        updated = await apiAddToCart(cartId, variantId, quantity)
      } catch (apiErr) {
        // If the cart doesn't exist (404 Not Found), clear it and create a new one
        if (apiErr instanceof Error && apiErr.message.includes('404')) {
          console.warn("Cart not found on server (possibly expired or database reset), creating a new one...")
          localStorage.removeItem('medusa_cart_id')
          const regions = await getRegions()
          const regionId = regions?.[0]?.id
          const newCart = await createCart(regionId)
          cartId = newCart.id
          localStorage.setItem('medusa_cart_id', cartId)
          
          // Retry adding to the new cart
          updated = await apiAddToCart(cartId, variantId, quantity)
        } else {
          throw apiErr
        }
      }
      
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
      setLoading(true)
      const updated = await apiUpdateLineItem(cartId, lineId, quantity)
      setCart(updated)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  async function removeLineItem(lineId: string) {
    const cartId = localStorage.getItem('medusa_cart_id')
    if (!cartId) return
    try {
      setLoading(true)
      const updated = await apiRemoveLineItem(cartId, lineId)
      setCart(updated)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
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

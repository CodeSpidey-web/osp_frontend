'use client'
import { useState, useEffect } from 'react'
import { getProducts, getProduct, getCategories, MedusaProduct, MedusaCategory } from './medusa'

export function useProducts(params?: { q?: string; category_id?: string[]; limit?: number }) {
  const [products, setProducts] = useState<MedusaProduct[]>([])
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    getProducts(params)
      .then((res) => {
        setProducts(res.products)
        setCount(res.count)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [params?.q, params?.category_id?.join(','), params?.limit])

  return { products, count, loading }
}

export function useProduct(handleOrId: string) {
  const [product, setProduct] = useState<MedusaProduct | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!handleOrId) return
    setLoading(true)
    getProduct(handleOrId)
      .then(setProduct)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [handleOrId])

  return { product, loading }
}

export function useCategories() {
  const [categories, setCategories] = useState<MedusaCategory[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return { categories, loading }
}

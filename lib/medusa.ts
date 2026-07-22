const BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || 'http://localhost:9000'
const PUBLISHABLE_API_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || 'pk_e45734850a456e6e729bf8d8b7e22dac55d7cb8e9c5141f4a2e5c9724d543356'

async function fetchApi<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BACKEND_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', 'x-publishable-api-key': PUBLISHABLE_API_KEY, ...options?.headers },
    ...options,
  })
  if (!res.ok) throw new Error(`Medusa API error: ${res.status} ${res.statusText}`)
  const json = await res.json()
  return json as T
}

export interface MedusaProduct {
  id: string
  title: string
  subtitle?: string
  description?: string
  handle?: string
  status: string
  thumbnail?: string
  images?: { id: string; url: string }[]
  collection?: { id: string; title: string }
  categories?: { id: string; name: string }[]
  variants?: MedusaProductVariant[]
  options?: { id: string; title: string; values: { value: string }[] }[]
}

export interface MedusaProductVariant {
  id: string
  title: string
  sku?: string
  prices?: { amount: number; currency_code: string }[]
  calculated_price?: { calculated_amount: number; original_amount: number; currency_code: string }
}

export interface MedusaCategory {
  id: string
  name: string
  description?: string
  handle?: string
  category_children: MedusaCategory[]
}

export interface MedusaRegion {
  id: string
  name: string
  currency_code: string
}

export interface MedusaCart {
  id: string
  currency_code: string
  items?: MedusaLineItem[]
  region?: MedusaRegion
  shipping_address?: any
  shipping_methods?: any[]
  payment_collection?: any
  total?: number
  subtotal?: number
  tax_total?: number
  discount_total?: number
  shipping_total?: number
}

export interface MedusaLineItem {
  id: string
  title: string
  quantity: number
  unit_price: number
  thumbnail?: string
  variant_sku?: string
  variant_id?: string
  product_id?: string
  product_handle?: string
  variant_title?: string
}

export interface PaginatedResponse<T> {
  products?: T[]
  product_categories?: T[]
  collections?: T[]
  count?: number
  offset?: number
  limit?: number
}

export async function getProducts(params?: {
  q?: string
  category_id?: string[]
  collection_id?: string[]
  offset?: number
  limit?: number
}): Promise<{ products: MedusaProduct[]; count: number }> {
  const q = new URLSearchParams()
  if (params?.q) q.set('q', params.q)
  if (params?.category_id) for (const id of params.category_id) q.append('category_id[]', id)
  if (params?.collection_id) for (const id of params.collection_id) q.append('collection_id[]', id)
  if (params?.offset) q.set('offset', String(params.offset))
  if (params?.limit) q.set('limit', String(params.limit))
  q.set('fields', '*variants.prices')
  const res = await fetchApi<{ products: MedusaProduct[]; count: number }>(`/store/products?${q.toString()}`)
  return res
}

export async function getProduct(handleOrId: string): Promise<MedusaProduct> {
  if (handleOrId.startsWith('prod_')) {
    const res = await fetchApi<{ product: MedusaProduct }>(`/store/products/${handleOrId}?fields=*variants.prices`)
    return res.product
  } else {
    const res = await fetchApi<{ products: MedusaProduct[] }>(`/store/products?handle=${handleOrId}&fields=*variants.prices`)
    if (!res.products || res.products.length === 0) {
      throw new Error(`Product with handle "${handleOrId}" not found`)
    }
    return res.products[0]
  }
}

export async function getCategories(): Promise<MedusaCategory[]> {
  const res = await fetchApi<{ product_categories: MedusaCategory[] }>('/store/product-categories')
  return res.product_categories
}

export async function getRegions(): Promise<MedusaRegion[]> {
  const res = await fetchApi<{ regions: MedusaRegion[] }>('/store/regions')
  return res.regions
}

export async function createCart(regionId?: string): Promise<MedusaCart> {
  const res = await fetchApi<{ cart: MedusaCart }>('/store/carts', {
    method: 'POST',
    body: JSON.stringify(regionId ? { region_id: regionId } : {}),
  })
  return res.cart
}

export async function getCart(cartId: string): Promise<MedusaCart> {
  const res = await fetchApi<{ cart: MedusaCart }>(`/store/carts/${cartId}`)
  return res.cart
}

export async function addToCart(cartId: string, variantId: string, quantity: number): Promise<MedusaCart> {
  const res = await fetchApi<{ cart: MedusaCart }>(`/store/carts/${cartId}/line-items`, {
    method: 'POST',
    body: JSON.stringify({ variant_id: variantId, quantity }),
  })
  return res.cart
}

export async function updateLineItem(cartId: string, lineId: string, quantity: number): Promise<MedusaCart> {
  const res = await fetchApi<{ cart: MedusaCart }>(`/store/carts/${cartId}/line-items/${lineId}`, {
    method: 'POST',
    body: JSON.stringify({ quantity }),
  })
  return res.cart
}

export async function removeLineItem(cartId: string, lineId: string): Promise<MedusaCart> {
  const res = await fetchApi<{ cart: MedusaCart }>(`/store/carts/${cartId}/line-items/${lineId}`, {
    method: 'DELETE',
  })
  return res.cart
}

export async function setShippingAddress(cartId: string, address: any): Promise<MedusaCart> {
  const res = await fetchApi<{ cart: MedusaCart }>(`/store/carts/${cartId}`, {
    method: 'PATCH',
    body: JSON.stringify({ shipping_address: address }),
  })
  return res.cart
}

export async function getShippingOptions(cartId: string): Promise<any[]> {
  const res = await fetchApi<{ shipping_options: any[] }>(`/store/shipping-options/${cartId}`)
  return res.shipping_options
}

export async function addShippingMethod(cartId: string, optionId: string): Promise<MedusaCart> {
  const res = await fetchApi<{ cart: MedusaCart }>(`/store/carts/${cartId}/shipping-methods`, {
    method: 'POST',
    body: JSON.stringify({ option_id: optionId }),
  })
  return res.cart
}

export async function createPaymentCollection(cartId: string): Promise<{ payment_collection: any }> {
  const res = await fetchApi<{ payment_collection: any }>(`/store/carts/${cartId}/payment-collections`, {
    method: 'POST',
    body: JSON.stringify({}),
  })
  return res
}

export async function initializePaymentSession(paymentCollectionId: string, providerId: string): Promise<any> {
  const res = await fetchApi<any>(`/store/payment-collections/${paymentCollectionId}/payment-sessions`, {
    method: 'POST',
    body: JSON.stringify({ provider_id: providerId }),
  })
  return res
}

export async function completeCart(cartId: string): Promise<{ type: string; order?: any; cart?: MedusaCart }> {
  const res = await fetchApi<{ type: string; order?: any; cart?: MedusaCart }>(`/store/carts/${cartId}/complete`, {
    method: 'POST',
  })
  return res
}

export interface MedusaOrder {
  id: string
  display_id?: number
  status?: string
  created_at?: string
  total?: number
  subtotal?: number
  tax_total?: number
  shipping_total?: number
  discount_total?: number
  items?: MedusaLineItem[]
  shipping_address?: any
  shipping_methods?: any[]
  payment_collection?: any
  region?: MedusaRegion
}

export async function getOrder(orderId: string): Promise<MedusaOrder> {
  const res = await fetchApi<{ order: MedusaOrder }>(`/store/orders/${orderId}`)
  return res.order
}

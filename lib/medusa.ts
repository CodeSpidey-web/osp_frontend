const BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || 'http://localhost:9000'
const PUBLISHABLE_API_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || 'pk_abd8e27126ac664d0d8042bea1fc954747cfdc4ad40a24974833f10a727a1211'

export async function fetchApi<T>(path: string, options?: RequestInit): Promise<T> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('medusa_auth_token') : null
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'x-publishable-api-key': PUBLISHABLE_API_KEY,
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  if (options?.headers) {
    // Merge extra headers safely
    const extraHeaders = options.headers as Record<string, string>
    Object.keys(extraHeaders).forEach((key) => {
      headers[key] = extraHeaders[key]
    })
  }

  const res = await fetch(`${BACKEND_URL}${path}`, {
    ...options,
    headers,
  })
  if (!res.ok) throw new Error(`Medusa API error: ${res.status} ${res.statusText}`)
  const json = await res.json()
  return json as T
}

export function getValidImageUrl(url?: string | null, fallback: string = '/assets/images/product-img/electronics/electro-c-01.webp', productHandle?: string): string {
  if (productHandle) {
    const handleMap: Record<string, string> = {
      'raspberry-pi-4': '/assets/images/product-img/electronics/raspberry-pi-4.png',
      'arduino-uno': '/assets/images/product-img/electronics/arduino-uno.png',
      'ultrasonic-sensor': '/assets/images/product-img/electronics/ultrasonic-sensor.png',
      'esp32-nodemcu': '/assets/images/product-img/electronics/esp32-nodemcu.png',
      'breadboard-kit': '/assets/images/product-img/electronics/breadboard-kit.png',
      'arduino-starter-kit': '/assets/images/product-img/electronics/arduino-starter-kit.png',
    };

    if (handleMap[productHandle]) {
      return handleMap[productHandle];
    }
  }
  if (!url || typeof url !== 'string') {
    return fallback;
  }
  
  let cleanUrl = url;
  if (cleanUrl.includes('/images/')) {
    const idx = cleanUrl.indexOf('/images/');
    cleanUrl = cleanUrl.substring(idx);
  }
  
  if (cleanUrl.includes('localhost:8000')) {
    return fallback;
  }
  return cleanUrl;
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
  parent_category_id?: string | null
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

export const FALLBACK_PRODUCTS: MedusaProduct[] = [
  { id: 'prod_01KXMPFA07GXQHA1J7XBV36D6W', title: 'Raspberry Pi 4 Model B', handle: 'raspberry-pi-4', status: 'published', thumbnail: '/assets/images/product-img/electronics/raspberry-pi-4.png', variants: [{ id: 'variant_rpi4', title: 'Standard', prices: [{ amount: 5900, currency_code: 'inr' }] }] },
  { id: 'prod_01KXMPFA07N0YKCHSJ4YTM1YY8', title: 'Arduino Uno R3 Ultimate Starter Kit', handle: 'arduino-starter-kit', status: 'published', thumbnail: '/assets/images/product-img/electronics/arduino-starter-kit.png', variants: [{ id: 'variant_ard_kit', title: 'Standard', prices: [{ amount: 3900, currency_code: 'inr' }] }] },
  { id: 'prod_01KXMPFA07ZP1ZV4EFF71H6MA5', title: 'Arduino Uno R3 Board', handle: 'arduino-uno', status: 'published', thumbnail: '/assets/images/product-img/electronics/arduino-uno.png', variants: [{ id: 'variant_uno', title: 'Standard', prices: [{ amount: 1800, currency_code: 'inr' }] }] },
  { id: 'prod_01KXMPFA073ERW91NFRSJ6G8RM', title: 'Ultrasonic Distance Sensor HC-SR04', handle: 'ultrasonic-sensor', status: 'published', thumbnail: '/assets/images/product-img/electronics/ultrasonic-sensor.png', variants: [{ id: 'variant_sr04', title: 'Standard', prices: [{ amount: 350, currency_code: 'inr' }] }] },
  { id: 'prod_01KXMPFA0750YDRZ1197RMNZT6', title: 'ESP32 NodeMCU Development Board', handle: 'esp32-nodemcu', status: 'published', thumbnail: '/assets/images/product-img/electronics/esp32-nodemcu.png', variants: [{ id: 'variant_esp32', title: 'Standard', prices: [{ amount: 900, currency_code: 'inr' }] }] },
  { id: 'prod_01KXMPFA07DGKTN2N4F2FGWC0H', title: 'Solderless Breadboard & Jumper Wires Set', handle: 'breadboard-kit', status: 'published', thumbnail: '/assets/images/product-img/electronics/breadboard-kit.png', variants: [{ id: 'variant_bb', title: 'Standard', prices: [{ amount: 650, currency_code: 'inr' }] }] },
]


function calculateRelevance(product: MedusaProduct, query: string): number {
  const title = (product.title || "").toLowerCase();
  const desc = (product.description || "").toLowerCase();
  const subtitle = (product.subtitle || "").toLowerCase();
  const handle = (product.handle || "").toLowerCase();
  const categoryNames = (product.categories || []).map(c => (c.name || "").toLowerCase());
  
  const cleanQuery = query.toLowerCase().trim();
  if (!cleanQuery) return 0;
  
  let totalScore = 0;
  
  // 1. Full phrase matches
  if (title === cleanQuery) {
    totalScore += 2000;
  } else if (title.startsWith(cleanQuery)) {
    totalScore += 1500;
  } else if (title.includes(cleanQuery)) {
    totalScore += 1000;
    const index = title.indexOf(cleanQuery);
    totalScore += Math.max(0, 200 - index);
  }
  
  // 2. Individual term matches (to support multi-word queries)
  const terms = cleanQuery.split(/\s+/).filter(Boolean);
  terms.forEach(term => {
    let termScore = 0;
    
    // Title matches
    if (title.split(/[^a-z0-9]+/).includes(term)) {
      termScore += 300;
    } else if (title.includes(term)) {
      termScore += 150;
    }
    
    // Category matches
    if (categoryNames.some(cat => cat.split(/[^a-z0-9]+/).includes(term))) {
      termScore += 80;
    } else if (categoryNames.some(cat => cat.includes(term))) {
      termScore += 40;
    }
    
    // Handle matches
    if (handle.includes(term)) {
      termScore += 50;
    }
    
    // Subtitle matches
    if (subtitle.includes(term)) {
      termScore += 30;
    }
    
    // Description matches
    if (desc.split(/[^a-z0-9]+/).includes(term)) {
      termScore += 20;
    } else if (desc.includes(term)) {
      termScore += 10;
    }
    
    totalScore += termScore;
  });
  
  return totalScore;
}

export async function getProducts(params?: {
  q?: string
  category_id?: string[]
  collection_id?: string[]
  offset?: number
  limit?: number
  order?: string
}): Promise<{ products: MedusaProduct[]; count: number }> {
  try {
    const q = new URLSearchParams()
    
    const isSearching = !!(params?.q && params.q.trim());
    const apiLimit = isSearching ? '120' : (params?.limit ? String(params.limit) : '12');
    const apiOffset = isSearching ? '0' : (params?.offset ? String(params.offset) : '0');

    if (params?.q) q.set('q', params.q)
    if (params?.category_id) for (const id of params.category_id) q.append('category_id[]', id)
    if (params?.collection_id) for (const id of params.collection_id) q.append('collection_id[]', id)
    q.set('offset', apiOffset)
    q.set('limit', apiLimit)
    if (params?.order && !isSearching) q.set('order', params.order)
    q.set('fields', '*variants.prices,*categories')
    
    const res = await fetchApi<{ products: MedusaProduct[]; count: number }>(`/store/products?${q.toString()}`)
    let productsList = res.products || [];
    let totalCount = res.count || 0;
    
    if (isSearching && params?.q) {
      const searchTerms = params.q;
      const scoredProducts = productsList.map(prod => ({
        product: prod,
        score: calculateRelevance(prod, searchTerms)
      }));
      
      // Sort by score descending
      scoredProducts.sort((a, b) => b.score - a.score);
      
      // Filter out products with 0 score (just in case)
      const matchedScored = scoredProducts.filter(x => x.score > 0);
      
      const sortedProducts = matchedScored.map(x => x.product);
      totalCount = sortedProducts.length;
      
      // Slice for pagination
      const start = params.offset || 0;
      const size = params.limit || 12;
      productsList = sortedProducts.slice(start, start + size);
    }
    
    return { products: productsList, count: totalCount }
  } catch (err) {
    console.warn("Using fallback products due to API fetch error:", err)
    return { products: FALLBACK_PRODUCTS, count: FALLBACK_PRODUCTS.length }
  }
}

export async function getProduct(handleOrId: string): Promise<MedusaProduct> {
  try {
    if (handleOrId.startsWith('prod_')) {
      const res = await fetchApi<{ product: MedusaProduct }>(`/store/products/${handleOrId}?fields=*variants.prices,*categories`)
      return res.product
    } else {
      const res = await fetchApi<{ products: MedusaProduct[] }>(`/store/products?handle=${handleOrId}&fields=*variants.prices,*categories`)
      if (!res.products || res.products.length === 0) {
        const found = FALLBACK_PRODUCTS.find(p => p.handle === handleOrId)
        if (found) return found
        throw new Error(`Product with handle "${handleOrId}" not found`)
      }
      return res.products[0]
    }
  } catch (err) {
    console.warn(`Using fallback product for "${handleOrId}":`, err)
    const found = FALLBACK_PRODUCTS.find(p => p.handle === handleOrId || p.id === handleOrId) || FALLBACK_PRODUCTS[0]
    return found
  }
}

export const DEFAULT_8_CATEGORIES: MedusaCategory[] = [
  { id: 'pcat_01KXMPF96V5FA4HPR9A6J0HQ34', name: 'Development Boards', category_children: [] },
  { id: 'pcat_01KXMPF96VJ93RFB9HRP57F6AY', name: 'IoT & DIY Starter Kits', category_children: [] },
  { id: 'pcat_01KXMPF96V91AKW7C87M41R6W9', name: 'Sensors & Modules', category_children: [] },
  { id: 'pcat_01KXMPF96VD41235N8B61QW7R0', name: 'Cables & Power Accessories', category_children: [] },
  { id: 'pcat_01KXMPF96VR51984C2161TY9M0', name: 'Robotics Components', category_children: [] },
  { id: 'pcat_01KXMPF96V782390F5128KW2N0', name: 'Microcontrollers & SBCs', category_children: [] },
  { id: 'pcat_01KXMPF96VA98765B4321QW9X0', name: 'Communication Modules', category_children: [] },
  { id: 'pcat_01KXMPF96VB12345C6789TY0Z0', name: 'Tools & Prototyping', category_children: [] },
];

export async function getCategories(): Promise<MedusaCategory[]> {
  try {
    const res = await fetchApi<{ product_categories: MedusaCategory[] }>(
      '/store/product-categories?include_descendants_tree=true&limit=250',
      { cache: 'no-store' }
    )
    return res.product_categories || []
  } catch (err) {
    console.warn("Using fallback categories due to API fetch error:", err)
    return []
  }
}

export async function getCategoryProductCounts(): Promise<Record<string, number>> {
  try {
    const res = await fetchApi<{ counts: Record<string, number> }>('/store/category-product-counts')
    return res.counts || {}
  } catch (err) {
    console.warn("Failed to fetch category product counts:", err)
    return {}
  }
}

export async function getRegions(): Promise<MedusaRegion[]> {
  try {
    const res = await fetchApi<{ regions: MedusaRegion[] }>('/store/regions')
    return res.regions || []
  } catch (err) {
    console.warn("Using fallback region due to API fetch error:", err)
    return [{ id: 'reg_inr', name: 'India', currency_code: 'inr' }]
  }
}

export async function createCart(regionId?: string): Promise<MedusaCart> {
  try {
    const res = await fetchApi<{ cart: MedusaCart }>('/store/carts', {
      method: 'POST',
      body: JSON.stringify(regionId ? { region_id: regionId } : {}),
    })
    return res.cart
  } catch (err) {
    console.warn("Using local cart fallback due to API fetch error:", err)
    return { id: 'cart_local_' + Date.now(), currency_code: 'inr', items: [] }
  }
}

export async function getCart(cartId: string): Promise<MedusaCart> {
  try {
    const res = await fetchApi<{ cart: MedusaCart }>(`/store/carts/${cartId}`)
    return res.cart
  } catch (err) {
    console.warn("Using local cart fallback due to API fetch error:", err)
    return { id: cartId, currency_code: 'inr', items: [] }
  }
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
  const res = await fetchApi<{ parent: MedusaCart }>(`/store/carts/${cartId}/line-items/${lineId}`, {
    method: 'DELETE',
  })
  return res.parent
}

export async function setShippingAddress(cartId: string, address: any): Promise<MedusaCart> {
  const { email, ...addressWithoutEmail } = address;
  const body: any = {
    shipping_address: addressWithoutEmail
  };
  if (email) {
    body.email = email;
  }

  const res = await fetchApi<{ cart: MedusaCart }>(`/store/carts/${cartId}`, {
    method: 'POST',
    body: JSON.stringify(body),
  })
  return res.cart
}

export async function getShippingOptions(cartId: string): Promise<any[]> {
  const res = await fetchApi<{ shipping_options: any[] }>(`/store/shipping-options?cart_id=${cartId}`)
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

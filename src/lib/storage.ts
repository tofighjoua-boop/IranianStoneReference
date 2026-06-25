import type { Article } from '@/data/articles'
import type { WorkshopItem } from '@/data/workshop-gallery'
import type { Product } from '@/data/products'

// Vercel KV when deployed, filesystem fallback for local dev
async function getStore() {
  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    const { kv } = await import('@vercel/kv')
    return kv
  }
  return null
}

// ── Filesystem fallback (local dev) ─────────────────────────────────────────
import fs from 'node:fs'
import path from 'node:path'

const DATA_DIR = path.join(process.cwd(), 'data')

function fsRead<T>(key: string): T | null {
  const filePath = path.join(DATA_DIR, `${key}.json`)
  if (!fs.existsSync(filePath)) return null
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8')) as T
  } catch {
    return null
  }
}

function fsWrite<T>(key: string, data: T): void {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true })
  fs.writeFileSync(path.join(DATA_DIR, `${key}.json`), JSON.stringify(data, null, 2), 'utf-8')
}

// ── Generic get/set ──────────────────────────────────────────────────────────
async function kvGet<T>(key: string): Promise<T | null> {
  const store = await getStore()
  if (store) return store.get<T>(key)
  return fsRead<T>(key)
}

async function kvSet<T>(key: string, value: T): Promise<void> {
  const store = await getStore()
  if (store) {
    await store.set(key, value)
  } else {
    fsWrite(key, value)
  }
}

// ── Articles ─────────────────────────────────────────────────────────────────
export async function getArticles(): Promise<Article[]> {
  const cached = await kvGet<Article[]>('articles')
  if (cached) return cached
  const { articles } = await import('@/data/articles')
  await kvSet('articles', articles)
  return articles
}

export async function saveArticles(articles: Article[]): Promise<void> {
  await kvSet('articles', articles)
}

// ── Workshop gallery ─────────────────────────────────────────────────────────
export async function getWorkshopItems(): Promise<WorkshopItem[]> {
  const cached = await kvGet<WorkshopItem[]>('workshop-gallery')
  if (cached) return cached
  const { workshopGallery } = await import('@/data/workshop-gallery')
  await kvSet('workshop-gallery', workshopGallery)
  return workshopGallery
}

export async function saveWorkshopItems(items: WorkshopItem[]): Promise<void> {
  await kvSet('workshop-gallery', items)
}

// ── Products (gallery images) ────────────────────────────────────────────────
export async function getProducts(): Promise<Product[]> {
  const cached = await kvGet<Product[]>('products')
  if (cached) return cached
  const { products } = await import('@/data/products')
  await kvSet('products', products)
  return products
}

export async function saveProducts(products: Product[]): Promise<void> {
  await kvSet('products', products)
}

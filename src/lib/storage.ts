import fs from 'node:fs'
import path from 'node:path'
import type { Article } from '@/data/articles'
import type { WorkshopItem } from '@/data/workshop-gallery'
import type { Product } from '@/data/products'

// On Vercel: use /tmp (writable, ephemeral per-container)
// Locally: use data/ in project root (persistent)
const DATA_DIR = process.env.VERCEL === '1'
  ? '/tmp/isr-data'
  : path.join(process.cwd(), 'data')

function fsRead<T>(key: string): T | null {
  try {
    const filePath = path.join(DATA_DIR, `${key}.json`)
    if (!fs.existsSync(filePath)) return null
    return JSON.parse(fs.readFileSync(filePath, 'utf-8')) as T
  } catch {
    return null
  }
}

function fsWrite<T>(key: string, data: T): void {
  try {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true })
    fs.writeFileSync(path.join(DATA_DIR, `${key}.json`), JSON.stringify(data, null, 2), 'utf-8')
  } catch {
    // Silently fail — data just won't persist this request
  }
}

async function kvGet<T>(key: string): Promise<T | null> {
  try {
    if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
      const { kv } = await import('@vercel/kv')
      return await kv.get<T>(key)
    }
  } catch {}
  return fsRead<T>(key)
}

async function kvSet<T>(key: string, value: T): Promise<void> {
  try {
    if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
      const { kv } = await import('@vercel/kv')
      await kv.set(key, value)
      return
    }
  } catch {}
  fsWrite(key, value)
}

export async function getArticles(): Promise<Article[]> {
  try {
    const cached = await kvGet<Article[]>('articles')
    if (cached && cached.length > 0) return cached
  } catch {}
  const { articles } = await import('@/data/articles')
  try { await kvSet('articles', articles) } catch {}
  return articles
}

export async function saveArticles(articles: Article[]): Promise<void> {
  try { await kvSet('articles', articles) } catch {}
}

export async function getWorkshopItems(): Promise<WorkshopItem[]> {
  try {
    const cached = await kvGet<WorkshopItem[]>('workshop-gallery')
    if (cached && cached.length > 0) return cached
  } catch {}
  const { workshopGallery } = await import('@/data/workshop-gallery')
  try { await kvSet('workshop-gallery', workshopGallery) } catch {}
  return workshopGallery
}

export async function saveWorkshopItems(items: WorkshopItem[]): Promise<void> {
  try { await kvSet('workshop-gallery', items) } catch {}
}

export async function getProducts(): Promise<Product[]> {
  try {
    const cached = await kvGet<Product[]>('products')
    if (cached && cached.length > 0) return cached
  } catch {}
  const { products } = await import('@/data/products')
  try { await kvSet('products', products) } catch {}
  return products
}

export async function saveProducts(products: Product[]): Promise<void> {
  try { await kvSet('products', products) } catch {}
}

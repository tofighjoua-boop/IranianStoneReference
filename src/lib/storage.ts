import fs from 'node:fs'
import path from 'node:path'
import type { Article } from '@/data/articles'
import type { WorkshopItem } from '@/data/workshop-gallery'
import type { Product } from '@/data/products'

const DATA_DIR = path.join(process.cwd(), 'data')
const BLOB_PREFIX = 'isr-data'

// ─── Local filesystem (dev only) ───────────────────────────────────────────

function fsRead<T>(key: string): T | null {
  try {
    const p = path.join(DATA_DIR, `${key}.json`)
    if (!fs.existsSync(p)) return null
    return JSON.parse(fs.readFileSync(p, 'utf-8')) as T
  } catch { return null }
}

function fsWrite<T>(key: string, data: T): void {
  try {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true })
    fs.writeFileSync(path.join(DATA_DIR, `${key}.json`), JSON.stringify(data, null, 2), 'utf-8')
  } catch {}
}

// ─── Vercel Blob (production) ───────────────────────────────────────────────
// Blob is persistent and shared across all serverless function instances.
// Data stored as JSON files under the isr-data/ prefix.

async function blobGet<T>(key: string): Promise<T | null> {
  try {
    const { list } = await import('@vercel/blob')
    const { blobs } = await list({ prefix: `${BLOB_PREFIX}/${key}`, limit: 5 })
    const blob = blobs.find(b => b.pathname === `${BLOB_PREFIX}/${key}.json`)
    if (!blob) return null
    // Cache-bust so we always get the latest version
    const res = await fetch(`${blob.url}?v=${Date.now()}`, { cache: 'no-store' })
    if (!res.ok) return null
    return await res.json() as T
  } catch { return null }
}

async function blobSet<T>(key: string, data: T): Promise<void> {
  const { put } = await import('@vercel/blob')
  // addRandomSuffix: false keeps the pathname stable across writes
  await put(`${BLOB_PREFIX}/${key}.json`, JSON.stringify(data, null, 2), {
    access: 'public',
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: 'application/json',
  })
}

// ─── Unified read / write ───────────────────────────────────────────────────

async function storageGet<T>(key: string): Promise<T | null> {
  if (process.env.BLOB_READ_WRITE_TOKEN) return blobGet<T>(key)
  return fsRead<T>(key)
}

async function storageSet<T>(key: string, data: T): Promise<void> {
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    await blobSet(key, data)
  } else {
    fsWrite(key, data)
  }
}

// ─── Public API ─────────────────────────────────────────────────────────────

export async function getProducts(): Promise<Product[]> {
  const saved = await storageGet<Product[]>('products')
  if (saved && saved.length > 0) return saved
  const { products } = await import('@/data/products')
  return products
}

export async function saveProducts(products: Product[]): Promise<void> {
  await storageSet('products', products)
}

export async function getArticles(): Promise<Article[]> {
  const saved = await storageGet<Article[]>('articles')
  if (saved && saved.length > 0) return saved
  const { articles } = await import('@/data/articles')
  return articles
}

export async function saveArticles(articles: Article[]): Promise<void> {
  await storageSet('articles', articles)
}

export async function getWorkshopItems(): Promise<WorkshopItem[]> {
  const saved = await storageGet<WorkshopItem[]>('workshop-gallery')
  if (saved && saved.length > 0) return saved
  const { workshopGallery } = await import('@/data/workshop-gallery')
  return workshopGallery
}

export async function saveWorkshopItems(items: WorkshopItem[]): Promise<void> {
  await storageSet('workshop-gallery', items)
}

// ─── Auto-increment product code ────────────────────────────────────────────
// Returns next available ISR-XXX code (e.g. ISR-042)

export async function nextProductCode(): Promise<string> {
  const products = await getProducts()
  let max = 0
  for (const p of products) {
    if (!p.code) continue
    const m = p.code.match(/ISR-(\d+)$/)
    if (m) max = Math.max(max, parseInt(m[1], 10))
  }
  return `ISR-${String(max + 1).padStart(3, '0')}`
}

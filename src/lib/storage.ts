import fs from 'node:fs'
import path from 'node:path'
import type { Article } from '@/data/articles'
import type { WorkshopItem } from '@/data/workshop-gallery'
import type { Product } from '@/data/products'

const DATA_DIR = path.join(process.cwd(), 'data')
const BLOB_PREFIX = 'isr-data'

// ─── Category → 2-letter prefix mapping ────────────────────────────────────
// Format: ISR-{PREFIX}-{NNN}  e.g. ISR-MA-001, ISR-TR-003
export const CATEGORY_PREFIX: Record<string, string> = {
  'sang-marmar': 'MA', // Marble (unified — covers former crystalline-marble too)
  'travertine':  'TR', // Travertine
  'onyx':        'ON', // Onyx
  'granite':     'GR', // Granite
  'washbasins':  'WB', // Washbasins
  'accessories': 'AC', // Accessories
}

export function categoryPrefix(categorySlug: string): string {
  return CATEGORY_PREFIX[categorySlug] ?? categorySlug.slice(0, 2).toUpperCase()
}

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

async function blobGet<T>(key: string): Promise<T | null> {
  try {
    const { list } = await import('@vercel/blob')
    const { blobs } = await list({ prefix: `${BLOB_PREFIX}/${key}`, limit: 5 })
    const blob = blobs.find(b => b.pathname === `${BLOB_PREFIX}/${key}.json`)
    if (!blob) return null
    const res = await fetch(blob.url, { cache: 'no-store' })
    if (!res.ok) return null
    return await res.json() as T
  } catch { return null }
}

async function blobSet<T>(key: string, data: T): Promise<void> {
  const { put } = await import('@vercel/blob')
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

// ─── Per-category sequential code generator ─────────────────────────────────
// Format: ISR-{PREFIX}-{NNN}
//
// Gap-filling strategy:
//  1. Collect all used numbers for this prefix among existing products
//  2. Scan 1, 2, 3, … and return the first number NOT already in use
//  3. This automatically reuses gaps left by deleted products

export async function nextCategoryCode(categorySlug: string): Promise<string> {
  const prefix = categoryPrefix(categorySlug)
  const re = new RegExp(`^ISR-${prefix}-(\\d+)$`)

  const products = await getProducts()
  const used = new Set<number>()
  for (const p of products) {
    if (!p.code) continue
    const m = p.code.match(re)
    if (m) used.add(parseInt(m[1], 10))
  }

  // First gap starting from 1 (fills deleted slots before appending new)
  let n = 1
  while (used.has(n)) n++

  return `ISR-${prefix}-${String(n).padStart(3, '0')}`
}

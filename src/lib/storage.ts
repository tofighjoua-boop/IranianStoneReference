import fs from 'node:fs'
import path from 'node:path'
import type { Article } from '@/data/articles'
import type { WorkshopItem } from '@/data/workshop-gallery'
import type { Product } from '@/data/products'

const DATA_DIR = path.join(process.cwd(), 'data')

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true })
}

function readJSON<T>(filename: string): T | null {
  const filePath = path.join(DATA_DIR, filename)
  if (!fs.existsSync(filePath)) return null
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8')) as T
  } catch {
    return null
  }
}

function writeJSON<T>(filename: string, data: T): void {
  ensureDir()
  fs.writeFileSync(path.join(DATA_DIR, filename), JSON.stringify(data, null, 2), 'utf-8')
}

export async function getArticles(): Promise<Article[]> {
  const cached = readJSON<Article[]>('articles.json')
  if (cached) return cached
  const { articles } = await import('@/data/articles')
  writeJSON('articles.json', articles)
  return articles
}

export async function saveArticles(articles: Article[]): Promise<void> {
  writeJSON('articles.json', articles)
}

export async function getWorkshopItems(): Promise<WorkshopItem[]> {
  const cached = readJSON<WorkshopItem[]>('workshop-gallery.json')
  if (cached) return cached
  const { workshopGallery } = await import('@/data/workshop-gallery')
  writeJSON('workshop-gallery.json', workshopGallery)
  return workshopGallery
}

export async function saveWorkshopItems(items: WorkshopItem[]): Promise<void> {
  writeJSON('workshop-gallery.json', items)
}

export async function getProducts(): Promise<Product[]> {
  const cached = readJSON<Product[]>('products.json')
  if (cached) return cached
  const { products } = await import('@/data/products')
  writeJSON('products.json', products)
  return products
}

export async function saveProducts(products: Product[]): Promise<void> {
  writeJSON('products.json', products)
}

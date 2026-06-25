import { NextRequest, NextResponse } from 'next/server'
import { getArticles, saveArticles } from '@/lib/storage'
import type { Article } from '@/data/articles'

export const dynamic = 'force-dynamic'

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const articles = await getArticles()
  const article = articles.find(a => a.slug === slug)
  if (!article) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(article)
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const body = await request.json() as Partial<Article>
  const articles = await getArticles()
  const idx = articles.findIndex(a => a.slug === slug)
  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  articles[idx] = { ...articles[idx], ...body, slug }
  await saveArticles(articles)
  return NextResponse.json(articles[idx])
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const articles = await getArticles()
  const filtered = articles.filter(a => a.slug !== slug)
  await saveArticles(filtered)
  return NextResponse.json({ success: true })
}

import { NextRequest, NextResponse } from 'next/server'
import { getArticles, saveArticles } from '@/lib/storage'
import type { Article } from '@/data/articles'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const articles = await getArticles()
    return NextResponse.json(articles)
  } catch {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as Partial<Article>
    const articles = await getArticles()

    if (!body.titleEn || !body.slug) {
      return NextResponse.json({ error: 'slug and titleEn are required' }, { status: 400 })
    }

    if (articles.find(a => a.slug === body.slug)) {
      return NextResponse.json({ error: 'Slug already exists' }, { status: 409 })
    }

    const article: Article = {
      slug: body.slug,
      category: body.category ?? 'industry',
      titleEn: body.titleEn ?? '',
      titleFa: body.titleFa ?? '',
      excerptEn: body.excerptEn ?? '',
      excerptFa: body.excerptFa ?? '',
      image: body.image ?? '',
      readTime: body.readTime ?? 5,
      publishedAt: body.publishedAt ?? new Date().toISOString().split('T')[0],
      bodyEn: body.bodyEn ?? [],
      bodyFa: body.bodyFa ?? [],
    }

    await saveArticles([...articles, article])
    return NextResponse.json(article, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}

import { NextResponse } from 'next/server'
import { getProducts } from '@/lib/storage'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const products = await getProducts()
    const summary = products.map(p => ({
      slug: p.slug,
      nameEn: p.nameEn,
      nameFa: p.nameFa,
      categorySlug: p.categorySlug,
      thumbnail: p.thumbnail,
      images: p.images,
      code: p.code,
      imageNames: (p as unknown as { imageNames?: Record<string, string> }).imageNames,
    }))
    return NextResponse.json(summary)
  } catch {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}

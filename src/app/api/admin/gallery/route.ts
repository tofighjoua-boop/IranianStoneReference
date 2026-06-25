import { NextRequest, NextResponse } from 'next/server'
import { getProducts, saveProducts } from '@/lib/storage'
import type { Product } from '@/data/products'

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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as Partial<Product>

    if (!body.slug || !body.nameEn || !body.categorySlug) {
      return NextResponse.json({ error: 'slug, nameEn, categorySlug are required' }, { status: 400 })
    }

    const products = await getProducts()
    if (products.find(p => p.slug === body.slug)) {
      return NextResponse.json({ error: 'Slug already exists' }, { status: 409 })
    }

    const product: Product = {
      slug: body.slug,
      categorySlug: body.categorySlug,
      nameEn: body.nameEn,
      nameFa: body.nameFa ?? '',
      color: body.color ?? '',
      colorFa: body.colorFa ?? '',
      descriptionEn: body.descriptionEn ?? '',
      descriptionFa: body.descriptionFa ?? '',
      finishes: body.finishes ?? [],
      finishesFa: body.finishesFa ?? [],
      dimensions: body.dimensions,
      images: body.images ?? [],
      thumbnail: body.thumbnail ?? (body.images?.[0] ?? ''),
      isExclusive: body.isExclusive,
      isNew: body.isNew,
      characteristics: body.characteristics,
      characteristicsFa: body.characteristicsFa,
      code: body.code,
    }

    await saveProducts([...products, product])
    return NextResponse.json(product, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}

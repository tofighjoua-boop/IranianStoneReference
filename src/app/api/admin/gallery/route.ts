import { NextRequest, NextResponse } from 'next/server'
import { getProducts, saveProducts, nextCategoryCode, categoryPrefix } from '@/lib/storage'
import type { Product } from '@/data/products'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    // ?nextCode=1&category=travertine → returns { code: 'ISR-TR-001' }
    if (searchParams.get('nextCode') === '1') {
      const cat = searchParams.get('category') ?? ''
      const code = await nextCategoryCode(cat)
      return NextResponse.json({ code, prefix: categoryPrefix(cat) })
    }
    const products = await getProducts()
    const summary = products.map(p => ({
      slug: p.slug,
      nameEn: p.nameEn,
      nameFa: p.nameFa,
      categorySlug: p.categorySlug,
      thumbnail: p.thumbnail,
      images: p.images,
      code: p.code,
    }))
    return NextResponse.json(summary)
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
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

    // Auto-assign ISR-{PREFIX}-{NNN} code based on category
    const code = body.code || await nextCategoryCode(body.categorySlug)

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
      code,
    }

    await saveProducts([...products, product])
    return NextResponse.json(product, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}

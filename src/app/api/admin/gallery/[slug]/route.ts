import { NextRequest, NextResponse } from 'next/server'
import { getProducts, saveProducts } from '@/lib/storage'
import type { Product } from '@/data/products'

export const dynamic = 'force-dynamic'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const products = await getProducts()
    const product = products.find(p => p.slug === slug)
    if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(product)
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const body = await request.json() as Partial<Product>
    const products = await getProducts()
    const idx = products.findIndex(p => p.slug === slug)

    if (idx === -1) {
      // Product not in storage (was in old storage before migration).
      // Upsert: add it with the data from the request body.
      const upserted: Product = {
        slug,
        nameEn: body.nameEn ?? '',
        nameFa: body.nameFa ?? '',
        categorySlug: body.categorySlug ?? '',
        code: body.code,
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
      }
      await saveProducts([...products, upserted])
      return NextResponse.json(upserted)
    }

    // Merge only the fields provided
    const updated: Product = {
      ...products[idx],
      ...(body.nameEn !== undefined && { nameEn: body.nameEn }),
      ...(body.nameFa !== undefined && { nameFa: body.nameFa }),
      ...(body.categorySlug !== undefined && { categorySlug: body.categorySlug }),
      ...(body.code !== undefined && { code: body.code }),
      ...(body.color !== undefined && { color: body.color }),
      ...(body.colorFa !== undefined && { colorFa: body.colorFa }),
      ...(body.descriptionEn !== undefined && { descriptionEn: body.descriptionEn }),
      ...(body.descriptionFa !== undefined && { descriptionFa: body.descriptionFa }),
      ...(body.finishes !== undefined && { finishes: body.finishes }),
      ...(body.finishesFa !== undefined && { finishesFa: body.finishesFa }),
      ...(body.dimensions !== undefined && { dimensions: body.dimensions }),
      ...(body.images !== undefined && { images: body.images }),
      ...(body.thumbnail !== undefined && { thumbnail: body.thumbnail }),
      ...(body.isExclusive !== undefined && { isExclusive: body.isExclusive }),
      ...(body.isNew !== undefined && { isNew: body.isNew }),
    }

    products[idx] = updated
    await saveProducts(products)
    return NextResponse.json(updated)
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const products = await getProducts()
    const filtered = products.filter(p => p.slug !== slug)
    // Always save (even if product wasn't in list — ensures static products are
    // written to blob without the deleted slug)
    await saveProducts(filtered)
    return NextResponse.json({ ok: true })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}

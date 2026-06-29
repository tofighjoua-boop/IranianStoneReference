import { NextRequest, NextResponse } from 'next/server'
import { getProducts, saveProducts } from '@/lib/storage'
import type { Product } from '@/data/products'

export const dynamic = 'force-dynamic'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const products = await getProducts()
  const product = products.find(p => p.slug === slug)
  if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(product)
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const body = await request.json() as Partial<Product>
  const products = await getProducts()
  const idx = products.findIndex(p => p.slug === slug)
  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  products[idx] = {
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

  await saveProducts(products)
  return NextResponse.json(products[idx])
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const products = await getProducts()
  const filtered = products.filter(p => p.slug !== slug)
  if (filtered.length === products.length) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  await saveProducts(filtered)
  return NextResponse.json({ ok: true })
}

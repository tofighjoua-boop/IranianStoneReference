import { NextRequest, NextResponse } from 'next/server'
import { getProducts, saveProducts } from '@/lib/storage'

export const dynamic = 'force-dynamic'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const body = await request.json() as { images?: string[]; thumbnail?: string }
  const products = await getProducts()
  const idx = products.findIndex(p => p.slug === slug)
  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  if (body.images !== undefined) products[idx].images = body.images
  if (body.thumbnail !== undefined) products[idx].thumbnail = body.thumbnail
  await saveProducts(products)
  return NextResponse.json(products[idx])
}

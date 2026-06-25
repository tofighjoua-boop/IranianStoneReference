import { NextRequest, NextResponse } from 'next/server'
import { getWorkshopItems, saveWorkshopItems } from '@/lib/storage'
import type { WorkshopItem } from '@/data/workshop-gallery'

export const dynamic = 'force-dynamic'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const body = await request.json() as Partial<WorkshopItem>
  const items = await getWorkshopItems()
  const idx = items.findIndex(i => i.id === id)
  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  items[idx] = { ...items[idx], ...body, id }
  await saveWorkshopItems(items)
  return NextResponse.json(items[idx])
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const items = await getWorkshopItems()
  await saveWorkshopItems(items.filter(i => i.id !== id))
  return NextResponse.json({ success: true })
}

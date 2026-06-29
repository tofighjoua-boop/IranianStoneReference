import { NextRequest, NextResponse } from 'next/server'
import { getWorkshopItems, saveWorkshopItems } from '@/lib/storage'
import type { WorkshopItem } from '@/data/workshop-gallery'

export const dynamic = 'force-dynamic'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json() as Partial<WorkshopItem>
    const items = await getWorkshopItems()
    const idx = items.findIndex(i => i.id === id)
    if (idx === -1) {
      // Upsert
      const upserted = { ...body, id } as WorkshopItem
      await saveWorkshopItems([...items, upserted])
      return NextResponse.json(upserted)
    }
    items[idx] = { ...items[idx], ...body, id }
    await saveWorkshopItems(items)
    return NextResponse.json(items[idx])
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const items = await getWorkshopItems()
    const filtered = items.filter(i => i.id !== id)
    await saveWorkshopItems(filtered)
    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}

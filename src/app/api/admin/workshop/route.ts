import { NextRequest, NextResponse } from 'next/server'
import { getWorkshopItems, saveWorkshopItems } from '@/lib/storage'
import type { WorkshopItem } from '@/data/workshop-gallery'

export const dynamic = 'force-dynamic'

export async function GET() {
  const items = await getWorkshopItems()
  return NextResponse.json(items)
}

export async function POST(request: NextRequest) {
  const body = await request.json() as Partial<WorkshopItem>
  const items = await getWorkshopItems()

  if (!body.image || !body.captionEn) {
    return NextResponse.json({ error: 'image and captionEn are required' }, { status: 400 })
  }

  const item: WorkshopItem = {
    id: body.id ?? `wg-${Date.now()}`,
    image: body.image,
    captionEn: body.captionEn,
    captionFa: body.captionFa ?? '',
    tagEn: body.tagEn,
    tagFa: body.tagFa,
  }

  await saveWorkshopItems([...items, item])
  return NextResponse.json(item, { status: 201 })
}

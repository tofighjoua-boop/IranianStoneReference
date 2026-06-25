import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function POST(request: NextRequest) {
  const body = await request.json() as { paths?: string[] }
  const paths = body.paths ?? ['/en', '/fa', '/en/knowledge', '/fa/knowledge']
  paths.forEach(p => revalidatePath(p))
  return NextResponse.json({ revalidated: true, paths })
}

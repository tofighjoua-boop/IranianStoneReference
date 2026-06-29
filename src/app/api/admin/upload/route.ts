import { NextRequest, NextResponse } from 'next/server'
import fs from 'node:fs'
import path from 'node:path'

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'images', 'uploads')
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
const MAX_SIZE = 10 * 1024 * 1024 // 10 MB

export async function POST(request: NextRequest) {
  const formData = await request.formData()
  const file = formData.get('file')

  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 })
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: 'Only jpg, png, webp allowed' }, { status: 400 })
  }
  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: 'File too large (max 10MB)' }, { status: 400 })
  }

  const ext = file.name.split('.').pop()?.toLowerCase() ?? 'jpg'
  const safeName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      const { put } = await import('@vercel/blob')
      const blob = await put(`uploads/${safeName}`, file, { access: 'public' })
      return NextResponse.json({ url: blob.url })
    } catch (err) {
      return NextResponse.json({ error: err instanceof Error ? err.message : 'Upload failed' }, { status: 500 })
    }
  }

  // Local dev fallback
  try {
    if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true })
    fs.writeFileSync(path.join(UPLOAD_DIR, safeName), Buffer.from(await file.arrayBuffer()))
    return NextResponse.json({ url: `/images/uploads/${safeName}` })
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'File write failed' }, { status: 500 })
  }
}

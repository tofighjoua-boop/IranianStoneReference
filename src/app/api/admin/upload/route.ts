import { NextRequest, NextResponse } from 'next/server'
import fs from 'node:fs'
import path from 'node:path'

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'images', 'uploads')
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
const MAX_SIZE = 10 * 1024 * 1024 // 10 MB

// ─── Sequential image code generator ──────────────────────────────────────
// Stores a global counter in Blob (isr-data/img-counter.json).
// Format: ISR-001, ISR-002, … (consistent across all admin sections)

async function nextImageCode(): Promise<string> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return ''
  try {
    const { list, put } = await import('@vercel/blob')
    const { blobs } = await list({ prefix: 'isr-data/img-counter', limit: 2 })
    const blob = blobs.find(b => b.pathname === 'isr-data/img-counter.json')

    let count = 1
    if (blob) {
      const res = await fetch(blob.url, { cache: 'no-store' })
      if (res.ok) {
        const data = await res.json() as { count?: number }
        count = (data.count ?? 0) + 1
      }
    }

    await put('isr-data/img-counter.json', JSON.stringify({ count }), {
      access: 'public',
      addRandomSuffix: false,
      contentType: 'application/json',
    })

    return `ISR-${String(count).padStart(3, '0')}`
  } catch {
    return ''
  }
}

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

  // Use Vercel Blob when token is available (production)
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      const code = await nextImageCode()
      // Name the file after its code for clarity: ISR-001-<random>.jpg
      const codePart = code ? `${code}-` : ''
      const safeName = `${codePart}${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

      const { put } = await import('@vercel/blob')
      const blob = await put(`uploads/${safeName}`, file, { access: 'public' })
      return NextResponse.json({ url: blob.url, code })
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Blob upload failed'
      return NextResponse.json({ error: msg }, { status: 500 })
    }
  }

  // Local dev fallback
  try {
    if (!fs.existsSync(UPLOAD_DIR)) {
      fs.mkdirSync(UPLOAD_DIR, { recursive: true })
    }
    const safeName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
    const buffer = Buffer.from(await file.arrayBuffer())
    fs.writeFileSync(path.join(UPLOAD_DIR, safeName), buffer)
    return NextResponse.json({ url: `/images/uploads/${safeName}`, code: '' })
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'File write failed'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}

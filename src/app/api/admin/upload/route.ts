import { NextRequest, NextResponse } from 'next/server'
import fs from 'node:fs'
import path from 'node:path'
import { categoryPrefix } from '@/lib/storage'

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'images', 'uploads')
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
const MAX_SIZE = 10 * 1024 * 1024 // 10 MB

// ─── Per-category sequential image code ────────────────────────────────────
// Format: ISR-{PREFIX}-{NNN}
// Counter stored in isr-data/counter-{PREFIX}.json (separate from product counter)
// so image uploads don't consume product code slots.

async function nextImageCode(categorySlug: string): Promise<string> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return ''
  const prefix = categoryPrefix(categorySlug)
  const pathname = `isr-data/img-${prefix}.json`
  try {
    const { list, put } = await import('@vercel/blob')
    const { blobs } = await list({ prefix: `isr-data/img-${prefix}`, limit: 2 })
    const blob = blobs.find(b => b.pathname === pathname)

    let count = 1
    if (blob) {
      const res = await fetch(blob.url, { cache: 'no-store' })
      if (res.ok) {
        const data = await res.json() as { count?: number }
        count = (data.count ?? 0) + 1
      }
    }

    await put(pathname, JSON.stringify({ count }), {
      access: 'public',
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: 'application/json',
    })

    return `ISR-${prefix}-${String(count).padStart(3, '0')}`
  } catch {
    return `ISR-${prefix}-XXX`
  }
}

export async function POST(request: NextRequest) {
  const formData = await request.formData()
  const file = formData.get('file')
  const categorySlug = (formData.get('category') as string | null) ?? ''

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

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      const code = await nextImageCode(categorySlug)
      // Filename: ISR-TR-001-<timestamp>-<random>.jpg
      const safeName = `${code}-${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
      const { put } = await import('@vercel/blob')
      const blob = await put(`uploads/${safeName}`, file, { access: 'public' })
      return NextResponse.json({ url: blob.url, code })
    } catch (err) {
      return NextResponse.json({ error: err instanceof Error ? err.message : 'Upload failed' }, { status: 500 })
    }
  }

  // Local dev fallback
  try {
    if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true })
    const safeName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
    fs.writeFileSync(path.join(UPLOAD_DIR, safeName), Buffer.from(await file.arrayBuffer()))
    return NextResponse.json({ url: `/images/uploads/${safeName}`, code: '' })
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'File write failed' }, { status: 500 })
  }
}

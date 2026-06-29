'use client'

import { useEffect, useState, useRef, use } from 'react'
import Link from 'next/link'
import { ArrowLeft, Upload, Trash2, Star, Loader2 } from 'lucide-react'
import { Toast } from '@/components/admin/Toast'

interface GalleryProduct {
  slug: string
  nameEn: string
  nameFa: string
  categorySlug: string
  thumbnail: string
  images: string[]
  code?: string
}

const uploadFile = async (file: File): Promise<string> => {
  const fd = new FormData()
  fd.append('file', file)
  const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
  const data = (await res.json()) as { url: string }
  return data.url
}

export default function EditGalleryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const [product, setProduct] = useState<GalleryProduct | null>(null)
  const [images, setImages] = useState<string[]>([])
  const [thumbnail, setThumbnail] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`/api/admin/gallery/${slug}`)
        if (!res.ok) {
          setToast({ message: 'Product not found.', type: 'error' })
          return
        }
        const data = (await res.json()) as GalleryProduct
        setProduct(data)
        setImages(data.images)
        setThumbnail(data.thumbnail)
      } catch {
        setToast({ message: 'Failed to load product.', type: 'error' })
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [slug])

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const url = await uploadFile(file)
      setImages((prev) => [...prev, url])
      setToast({ message: 'Image uploaded.', type: 'success' })
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Upload failed'
      setToast({ message: msg, type: 'error' })
    } finally {
      setUploading(false)
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  const handleRemove = (url: string) => {
    setImages((prev) => prev.filter((img) => img !== url))
    if (thumbnail === url) {
      setThumbnail(images.find((img) => img !== url) ?? '')
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const res = await fetch(`/api/admin/gallery/${slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ images, thumbnail }),
      })
      if (res.ok) {
        await fetch('/api/admin/revalidate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ paths: ['/en/gallery', '/fa/gallery', `/en/gallery/${product?.categorySlug}/${slug}`, `/fa/gallery/${product?.categorySlug}/${slug}`] }),
        })
        setToast({ message: 'Gallery saved.', type: 'success' })
      } else {
        setToast({ message: 'Failed to save.', type: 'error' })
      }
    } catch {
      setToast({ message: 'Network error.', type: 'error' })
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="p-8">
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}

      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/gallery" className="text-[#f4f1ea]/40 hover:text-[#c6a25f] transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-[#f4f1ea] text-2xl font-semibold">
            {loading ? 'Loading…' : (product?.nameEn ?? slug)}
          </h1>
          {product && (
            <p className="text-[#f4f1ea]/40 text-sm mt-0.5" dir="rtl">{product.nameFa}</p>
          )}
        </div>
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-[#f4f1ea]/60">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span className="text-sm">Loading product…</span>
        </div>
      ) : (
        <>
          {/* Upload section */}
          <div className="mb-8">
            <h2 className="text-[#f4f1ea]/80 text-sm uppercase tracking-widest mb-3">Upload New Image</h2>
            <div className="flex items-center gap-3">
              <button
                onClick={() => fileRef.current?.click()}
                disabled={uploading}
                className="flex items-center gap-2 border border-[#c6a25f]/40 text-[#c6a25f] hover:bg-[#c6a25f]/10 px-4 py-2.5 rounded text-sm transition-colors disabled:opacity-60"
              >
                {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                {uploading ? 'Uploading…' : 'Choose File & Upload'}
              </button>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />
            </div>
          </div>

          {/* Images grid */}
          <div className="mb-8">
            <h2 className="text-[#f4f1ea]/80 text-sm uppercase tracking-widest mb-3">
              Images ({images.length})
            </h2>
            {images.length === 0 ? (
              <p className="text-[#f4f1ea]/30 text-sm">No images yet.</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {images.map((img) => {
                  const isThumbnail = img === thumbnail
                  return (
                    <div
                      key={img}
                      className={`relative group rounded-lg overflow-hidden border-2 transition-colors ${
                        isThumbnail ? 'border-[#c6a25f]' : 'border-[#c6a25f]/10'
                      }`}
                    >
                      <div className="aspect-square bg-[#0c1626]">
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </div>
                      {isThumbnail && (
                        <div className="absolute top-1.5 left-1.5 bg-[#c6a25f] rounded px-1.5 py-0.5 flex items-center gap-1">
                          <Star className="w-2.5 h-2.5 text-[#0c1626] fill-current" />
                          <span className="text-[#0c1626] text-xs font-semibold">Thumb</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-[#0c1626]/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        {!isThumbnail && (
                          <button
                            onClick={() => setThumbnail(img)}
                            className="p-1.5 bg-[#c6a25f] rounded text-[#0c1626] hover:bg-[#b8904a] transition-colors"
                            title="Set as thumbnail"
                          >
                            <Star className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <button
                          onClick={() => handleRemove(img)}
                          className="p-1.5 bg-red-900/80 rounded text-red-300 hover:bg-red-900 transition-colors"
                          title="Remove"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Save */}
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-[#c6a25f] hover:bg-[#b8904a] text-[#0c1626] font-semibold px-6 py-2.5 rounded text-sm transition-colors disabled:opacity-60"
          >
            {saving && <Loader2 className="w-4 h-4 animate-spin" />}
            {saving ? 'Saving…' : 'Save Changes'}
          </button>
        </>
      )}
    </div>
  )
}

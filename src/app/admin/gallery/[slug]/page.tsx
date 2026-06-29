'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, Upload, Trash2, Star, Loader2, X } from 'lucide-react'
import { Toast } from '@/components/admin/Toast'
import { useAdminLang } from '@/components/admin/AdminLangContext'

const CATEGORIES = [
  { slug: 'sang-marmar', nameEn: 'Marble', nameFa: 'مرمریت' },
  { slug: 'travertine', nameEn: 'Travertine', nameFa: 'تراورتن' },
  { slug: 'onyx', nameEn: 'Onyx', nameFa: 'مرمر' },
  { slug: 'granite', nameEn: 'Granite', nameFa: 'گرانیت' },
  { slug: 'washbasins', nameEn: 'Washbasins', nameFa: 'روشویی‌ها' },
  { slug: 'accessories', nameEn: 'Stone Accessories', nameFa: 'اکسسوری سنگی' },
]

interface Product {
  slug: string
  nameEn: string
  nameFa: string
  categorySlug: string
  code?: string
  color: string
  colorFa: string
  descriptionEn: string
  descriptionFa: string
  finishes: string[]
  finishesFa: string[]
  dimensions?: string
  images: string[]
  thumbnail: string
  isExclusive?: boolean
  isNew?: boolean
}

export default function EditGalleryPage() {
  const params = useParams()
  const slug = params.slug as string
  const router = useRouter()
  const { t } = useAdminLang()
  const fileRef = useRef<HTMLInputElement>(null)

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  const [nameEn, setNameEn] = useState('')
  const [nameFa, setNameFa] = useState('')
  const [categorySlug, setCategorySlug] = useState(CATEGORIES[0].slug)
  const [code, setCode] = useState('')
  const [color, setColor] = useState('')
  const [colorFa, setColorFa] = useState('')
  const [descriptionEn, setDescriptionEn] = useState('')
  const [descriptionFa, setDescriptionFa] = useState('')
  const [finishes, setFinishes] = useState('')
  const [finishesFa, setFinishesFa] = useState('')
  const [dimensions, setDimensions] = useState('')
  const [isExclusive, setIsExclusive] = useState(false)
  const [isNew, setIsNew] = useState(false)
  const [images, setImages] = useState<string[]>([])
  const [thumbnail, setThumbnail] = useState('')

  useEffect(() => {
    if (!slug) return
    setLoading(true)
    fetch(`/api/admin/gallery/${slug}`)
      .then(async r => {
        const data = await r.json() as Product & { error?: string }
        if (!r.ok) throw new Error(data.error ?? 'Not found')
        return data
      })
      .then((p: Product) => {
        setNameEn(p.nameEn ?? '')
        setNameFa(p.nameFa ?? '')
        setCategorySlug(p.categorySlug ?? CATEGORIES[0].slug)
        setCode(p.code ?? '')
        setColor(p.color ?? '')
        setColorFa(p.colorFa ?? '')
        setDescriptionEn(p.descriptionEn ?? '')
        setDescriptionFa(p.descriptionFa ?? '')
        setFinishes((p.finishes ?? []).join(', '))
        setFinishesFa((p.finishesFa ?? []).join(', '))
        setDimensions(p.dimensions ?? '')
        setIsExclusive(p.isExclusive ?? false)
        setIsNew(p.isNew ?? false)
        setImages(p.images ?? [])
        setThumbnail(p.thumbnail ?? '')
      })
      .catch(err => {
        const msg = err instanceof Error ? err.message : 'Failed to load'
        setToast({ message: msg, type: 'error' })
      })
      .finally(() => setLoading(false))
  }, [slug])

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
      const data = await res.json() as { url?: string; error?: string }
      if (!data.url) throw new Error(data.error ?? 'Upload failed')
      setImages(prev => [...prev, data.url!])
      if (!thumbnail) setThumbnail(data.url!)
    } catch (err) {
      setToast({ message: err instanceof Error ? err.message : 'Upload failed', type: 'error' })
    } finally {
      setUploading(false)
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const body = {
        nameEn,
        nameFa,
        categorySlug,
        code: code || undefined,
        color,
        colorFa,
        descriptionEn,
        descriptionFa,
        finishes: finishes.split(',').map(s => s.trim()).filter(Boolean),
        finishesFa: finishesFa.split(',').map(s => s.trim()).filter(Boolean),
        dimensions: dimensions || undefined,
        isExclusive: isExclusive || undefined,
        isNew: isNew || undefined,
        images,
        thumbnail,
      }
      const res = await fetch(`/api/admin/gallery/${slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const data = await res.json() as { error?: string }
      if (res.ok) {
        setToast({ message: t('Saved successfully', 'با موفقیت ذخیره شد'), type: 'success' })
      } else {
        setToast({ message: data.error ?? t('Save failed', 'ذخیره ناموفق'), type: 'error' })
      }
    } catch (err) {
      setToast({ message: err instanceof Error ? err.message : t('Network error', 'خطای شبکه'), type: 'error' })
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm(t('Delete this product permanently?', 'این محصول برای همیشه حذف شود؟'))) return
    setDeleting(true)
    try {
      const res = await fetch(`/api/admin/gallery/${slug}`, { method: 'DELETE' })
      const data = await res.json() as { error?: string }
      if (res.ok) {
        router.push('/admin/gallery')
      } else {
        setToast({ message: data.error ?? t('Delete failed', 'حذف ناموفق'), type: 'error' })
      }
    } catch (err) {
      setToast({ message: err instanceof Error ? err.message : t('Network error', 'خطای شبکه'), type: 'error' })
    } finally {
      setDeleting(false)
    }
  }

  const inputCls = 'w-full bg-[#0c1626] border border-[#c6a25f]/20 rounded px-3 py-2 text-[#f4f1ea] text-sm focus:outline-none focus:border-[#c6a25f]/50 transition-colors'
  const labelCls = 'block text-xs text-[#f4f1ea]/50 uppercase tracking-wider mb-1.5'

  if (loading) {
    return (
      <div className="p-8 flex items-center gap-2 text-[#f4f1ea]/60">
        <Loader2 className="w-4 h-4 animate-spin" />
        <span className="text-sm">{t('Loading…', 'در حال بارگذاری…')}</span>
      </div>
    )
  }

  return (
    <div className="p-8 max-w-3xl">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <button onClick={() => router.push('/admin/gallery')} className="text-[#f4f1ea]/40 hover:text-[#f4f1ea] transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-[#f4f1ea] text-xl font-semibold">{nameEn || slug}</h1>
            {code && <p className="text-[#c6a25f]/60 text-xs font-mono mt-0.5">{code}</p>}
          </div>
        </div>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="flex items-center gap-2 border border-red-800/50 text-red-400 hover:bg-red-900/20 px-4 py-2 rounded text-sm transition-colors disabled:opacity-50"
        >
          {deleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
          {deleting ? t('Deleting…', 'در حال حذف…') : t('Delete', 'حذف')}
        </button>
      </div>

      <div className="space-y-5">
        {/* Code (read-only display + edit) */}
        <div className="bg-[#c6a25f]/5 border border-[#c6a25f]/20 rounded p-3 flex items-center gap-3">
          <span className="text-[#c6a25f]/50 text-xs uppercase tracking-widest">{t('Code', 'کد')}</span>
          <input
            value={code}
            onChange={e => setCode(e.target.value.toUpperCase())}
            className="flex-1 bg-transparent border-none outline-none text-[#c6a25f] font-mono text-sm"
            placeholder="ISR-001"
          />
        </div>

        {/* Category */}
        <div>
          <label className={labelCls}>{t('Category', 'دسته‌بندی')}</label>
          <select value={categorySlug} onChange={e => setCategorySlug(e.target.value)} className={inputCls}>
            {CATEGORIES.map(c => (
              <option key={c.slug} value={c.slug}>{c.nameEn} — {c.nameFa}</option>
            ))}
          </select>
        </div>

        {/* Names */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>{t('Name (English)', 'نام (انگلیسی)')}</label>
            <input value={nameEn} onChange={e => setNameEn(e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>{t('Name (Persian)', 'نام (فارسی)')}</label>
            <input value={nameFa} onChange={e => setNameFa(e.target.value)} className={inputCls} dir="rtl" />
          </div>
        </div>

        {/* Dimensions */}
        <div>
          <label className={labelCls}>{t('Dimensions', 'ابعاد')}</label>
          <input value={dimensions} onChange={e => setDimensions(e.target.value)} className={inputCls} />
        </div>

        {/* Colors */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>{t('Color (English)', 'رنگ (انگلیسی)')}</label>
            <input value={color} onChange={e => setColor(e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>{t('Color (Persian)', 'رنگ (فارسی)')}</label>
            <input value={colorFa} onChange={e => setColorFa(e.target.value)} className={inputCls} dir="rtl" />
          </div>
        </div>

        {/* Descriptions */}
        <div>
          <label className={labelCls}>{t('Description (English)', 'توضیحات (انگلیسی)')}</label>
          <textarea value={descriptionEn} onChange={e => setDescriptionEn(e.target.value)} rows={3} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>{t('Description (Persian)', 'توضیحات (فارسی)')}</label>
          <textarea value={descriptionFa} onChange={e => setDescriptionFa(e.target.value)} rows={3} className={inputCls} dir="rtl" />
        </div>

        {/* Finishes */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>{t('Finishes (comma-separated)', 'فینیش‌ها (با کاما)')}</label>
            <input value={finishes} onChange={e => setFinishes(e.target.value)} className={inputCls} placeholder="Polished, Honed" />
          </div>
          <div>
            <label className={labelCls}>{t('Finishes (Persian)', 'فینیش‌ها (فارسی)')}</label>
            <input value={finishesFa} onChange={e => setFinishesFa(e.target.value)} className={inputCls} dir="rtl" placeholder="پولیش، مات" />
          </div>
        </div>

        {/* Flags */}
        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={isExclusive} onChange={e => setIsExclusive(e.target.checked)} className="accent-[#c6a25f]" />
            <span className="text-[#f4f1ea]/70 text-sm">{t('Exclusive', 'انحصاری')}</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={isNew} onChange={e => setIsNew(e.target.checked)} className="accent-[#c6a25f]" />
            <span className="text-[#f4f1ea]/70 text-sm">{t('New', 'جدید')}</span>
          </label>
        </div>

        {/* Images */}
        <div className="border-t border-[#c6a25f]/20 pt-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[#f4f1ea]/80 text-sm uppercase tracking-widest">
              {t('Images', 'تصاویر')} ({images.length})
            </h2>
            <button
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="flex items-center gap-2 border border-[#c6a25f]/40 text-[#c6a25f] hover:bg-[#c6a25f]/10 px-3 py-1.5 rounded text-xs transition-colors disabled:opacity-50"
            >
              {uploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
              {uploading ? t('Uploading…', 'در حال آپلود…') : t('Upload Image', 'آپلود تصویر')}
            </button>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />
          </div>

          {images.length === 0 ? (
            <p className="text-[#f4f1ea]/30 text-sm">{t('No images yet.', 'تصویری وجود ندارد.')}</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {images.map((img, idx) => {
                const isThumb = img === thumbnail
                return (
                  <div key={img} className={`relative group rounded overflow-hidden border-2 transition-colors ${isThumb ? 'border-[#c6a25f]' : 'border-[#c6a25f]/10'}`}>
                    <div className="aspect-square bg-[#0c1626]">
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </div>
                    {/* Image sequence number */}
                    <div className="absolute bottom-1 right-1 bg-[#0c1626]/70 text-[#c6a25f]/60 text-[9px] font-mono px-1 rounded">
                      #{idx + 1}
                    </div>
                    {isThumb && (
                      <div className="absolute top-1.5 left-1.5 bg-[#c6a25f] rounded px-1.5 py-0.5 flex items-center gap-1">
                        <Star className="w-2.5 h-2.5 text-[#0c1626] fill-current" />
                        <span className="text-[#0c1626] text-[10px] font-bold">{t('Main', 'اصلی')}</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-[#0c1626]/75 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      {!isThumb && (
                        <button
                          onClick={() => setThumbnail(img)}
                          className="p-1.5 bg-[#c6a25f] rounded text-[#0c1626] hover:bg-[#b8904a] transition-colors"
                          title={t('Set as main image', 'تنظیم به عنوان تصویر اصلی')}
                        >
                          <Star className="w-3.5 h-3.5" />
                        </button>
                      )}
                      <button
                        onClick={() => {
                          const next = images.filter(u => u !== img)
                          setImages(next)
                          if (thumbnail === img) setThumbnail(next[0] ?? '')
                        }}
                        className="p-1.5 bg-red-900/80 rounded text-red-300 hover:bg-red-900 transition-colors"
                        title={t('Remove image', 'حذف تصویر')}
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Save / Cancel */}
        <div className="flex gap-3 pt-4 border-t border-[#c6a25f]/20">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-[#c6a25f] hover:bg-[#b8904a] text-[#0c1626] font-bold px-8 py-2.5 rounded text-sm transition-colors disabled:opacity-50"
          >
            {saving && <Loader2 className="w-4 h-4 animate-spin" />}
            {saving ? t('Saving…', 'در حال ذخیره…') : t('Save Changes', 'ذخیره تغییرات')}
          </button>
          <button
            onClick={() => router.push('/admin/gallery')}
            className="border border-[#c6a25f]/30 text-[#f4f1ea]/60 hover:text-[#f4f1ea] px-6 py-2.5 rounded text-sm transition-colors"
          >
            {t('Cancel', 'انصراف')}
          </button>
        </div>
      </div>
    </div>
  )
}

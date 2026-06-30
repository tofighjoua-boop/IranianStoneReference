'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Upload, Plus, X, Loader2 } from 'lucide-react'
import { uploadImage } from '@/lib/upload'
import { Toast } from '@/components/admin/Toast'
import { useAdminLang } from '@/components/admin/AdminLangContext'

const CATEGORIES = [
  { slug: 'sang-marmar',        nameEn: 'Marble',            nameFa: 'سنگ مرمریت' },
  { slug: 'crystalline-marble', nameEn: 'Crystalline Marble', nameFa: 'مرمریت کریستالی' },
  { slug: 'travertine',         nameEn: 'Travertine',         nameFa: 'تراورتن' },
  { slug: 'onyx',               nameEn: 'Onyx',               nameFa: 'مرمر' },
  { slug: 'granite',            nameEn: 'Granite',            nameFa: 'گرانیت' },
  { slug: 'washbasins',         nameEn: 'Washbasins',         nameFa: 'روشویی‌ها' },
  { slug: 'accessories',        nameEn: 'Stone Accessories',  nameFa: 'اکسسوری سنگی' },
]

interface ImageEntry { url: string; name: string }

export default function NewProductPage() {
  const router = useRouter()
  const { t } = useAdminLang()
  const fileRef = useRef<HTMLInputElement>(null)

  const [slug, setSlug] = useState('')
  const [nameEn, setNameEn] = useState('')
  const [nameFa, setNameFa] = useState('')
  const [categorySlug, setCategorySlug] = useState('travertine')
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
  const [images, setImages] = useState<ImageEntry[]>([])
  const [thumbnail, setThumbnail] = useState('')
  const [uploadName, setUploadName] = useState('')
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  // Reload the next category-specific code whenever the category changes
  useEffect(() => {
    fetch(`/api/admin/gallery?nextCode=1&category=${categorySlug}`)
      .then(r => r.json())
      .then((d: { code?: string }) => { if (d.code) setCode(d.code) })
      .catch(() => {})
  }, [categorySlug])

  const genSlug = (en: string) =>
    en.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

  const handleNameEnChange = (v: string) => {
    setNameEn(v)
    if (!slug || slug === genSlug(nameEn)) setSlug(genSlug(v))
  }

  const uploadFile = uploadImage

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const url = await uploadFile(file)
      const entry: ImageEntry = { url, name: uploadName || file.name.replace(/\.[^.]+$/, '') }
      setImages(prev => [...prev, entry])
      if (!thumbnail) setThumbnail(url)
      setUploadName('')
      if (fileRef.current) fileRef.current.value = ''
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Upload failed'
      setToast({ message: msg, type: 'error' })
    } finally {
      setUploading(false)
    }
  }

  const removeImage = (url: string) => {
    setImages(prev => prev.filter(i => i.url !== url))
    if (thumbnail === url) setThumbnail(images.find(i => i.url !== url)?.url ?? '')
  }

  const handleSubmit = async () => {
    if (!slug || !nameEn || !categorySlug) {
      setToast({ message: t('Slug, English name and category are required', 'اسلاگ، نام انگلیسی و دسته‌بندی الزامی است'), type: 'error' })
      return
    }
    setSaving(true)
    try {
      const res = await fetch('/api/admin/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug,
          nameEn,
          nameFa,
          categorySlug,
          code: code || undefined,
          color,
          colorFa,
          descriptionEn,
          descriptionFa,
          finishes: finishes ? finishes.split(',').map(s => s.trim()).filter(Boolean) : [],
          finishesFa: finishesFa ? finishesFa.split(',').map(s => s.trim()).filter(Boolean) : [],
          dimensions: dimensions || undefined,
          images: images.map(i => i.url),
          thumbnail: thumbnail || images[0]?.url || '',
          isExclusive: isExclusive || undefined,
          isNew: isNew || undefined,
        }),
      })
      if (res.ok) {
        setToast({ message: t('Product created', 'محصول ایجاد شد'), type: 'success' })
        setTimeout(() => router.push('/admin/gallery'), 800)
      } else {
        const d = await res.json() as { error?: string }
        setToast({ message: d.error ?? t('Failed to create', 'ایجاد ناموفق'), type: 'error' })
      }
    } catch {
      setToast({ message: t('Network error', 'خطای شبکه'), type: 'error' })
    } finally {
      setSaving(false)
    }
  }

  const inputCls = 'w-full bg-[#0c1626] border border-[#c6a25f]/20 rounded px-3 py-2 text-[#f4f1ea] text-sm focus:outline-none focus:border-[#c6a25f]/50 transition-colors'
  const labelCls = 'block text-xs text-[#f4f1ea]/50 uppercase tracking-wider mb-1.5'

  return (
    <div className="p-8 max-w-3xl">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="flex items-center gap-3 mb-8">
        <button onClick={() => router.push('/admin/gallery')} className="text-[#f4f1ea]/40 hover:text-[#f4f1ea] transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-[#f4f1ea] text-2xl font-semibold">{t('New Product', 'محصول جدید')}</h1>
      </div>

      <div className="space-y-5">
        {/* Category */}
        <div>
          <label className={labelCls}>{t('Category', 'دسته‌بندی')} *</label>
          <select value={categorySlug} onChange={e => setCategorySlug(e.target.value)} className={inputCls}>
            {CATEGORIES.map(c => (
              <option key={c.slug} value={c.slug}>{c.nameEn} — {c.nameFa}</option>
            ))}
          </select>
        </div>

        {/* Names */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>{t('Name (English)', 'نام (انگلیسی)')} *</label>
            <input value={nameEn} onChange={e => handleNameEnChange(e.target.value)} className={inputCls} placeholder="e.g. Creamy Beige" />
          </div>
          <div>
            <label className={labelCls}>{t('Name (Persian)', 'نام (فارسی)')}</label>
            <input value={nameFa} onChange={e => setNameFa(e.target.value)} className={inputCls} dir="rtl" placeholder="مثلاً کریمی بژ" />
          </div>
        </div>

        {/* Slug + Code */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>{t('Slug', 'اسلاگ')} *</label>
            <input value={slug} onChange={e => setSlug(genSlug(e.target.value))} className={`${inputCls} font-mono text-xs`} placeholder="creamy-beige" />
          </div>
          <div>
            <label className={labelCls}>{t('Product Code', 'کد محصول')}</label>
            <input value={code} onChange={e => setCode(e.target.value)} className={`${inputCls} font-mono text-xs`} placeholder="ISR-TR-001" />
          </div>
        </div>

        {/* Colors */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>{t('Color (English)', 'رنگ (انگلیسی)')}</label>
            <input value={color} onChange={e => setColor(e.target.value)} className={inputCls} placeholder="Cream/Beige" />
          </div>
          <div>
            <label className={labelCls}>{t('Color (Persian)', 'رنگ (فارسی)')}</label>
            <input value={colorFa} onChange={e => setColorFa(e.target.value)} className={inputCls} dir="rtl" placeholder="کرم / بژ" />
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
            <label className={labelCls}>{t('Finishes (comma-separated)', 'فینیش‌ها (با کاما جدا شود)')}</label>
            <input value={finishes} onChange={e => setFinishes(e.target.value)} className={inputCls} placeholder="Polished, Honed, Brushed" />
          </div>
          <div>
            <label className={labelCls}>{t('Finishes (Persian)', 'فینیش‌ها (فارسی)')}</label>
            <input value={finishesFa} onChange={e => setFinishesFa(e.target.value)} className={inputCls} dir="rtl" placeholder="پولیش، مات، براش" />
          </div>
        </div>

        {/* Dimensions */}
        <div>
          <label className={labelCls}>{t('Dimensions', 'ابعاد')}</label>
          <input value={dimensions} onChange={e => setDimensions(e.target.value)} className={inputCls} placeholder="Slab: up to 300×180 cm" />
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
          <h2 className="text-[#f4f1ea]/80 text-sm uppercase tracking-widest mb-4">{t('Images', 'تصاویر')}</h2>

          {/* Upload */}
          <div className="flex gap-3 mb-4">
            <input
              value={uploadName}
              onChange={e => setUploadName(e.target.value)}
              placeholder={t('Image name / alt text', 'نام تصویر / متن جایگزین')}
              className={`${inputCls} flex-1`}
            />
            <button
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="flex items-center gap-2 bg-[#c6a25f] hover:bg-[#b8904a] text-[#0c1626] font-semibold px-4 py-2 rounded text-sm transition-colors disabled:opacity-50"
            >
              {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
              {uploading ? t('Uploading…', 'در حال آپلود…') : t('Upload', 'آپلود')}
            </button>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />
          </div>

          {/* Image list */}
          {images.length > 0 && (
            <div className="space-y-2">
              {images.map((img) => (
                <div key={img.url} className={`flex items-center gap-3 p-2 rounded border ${thumbnail === img.url ? 'border-[#c6a25f]' : 'border-[#c6a25f]/20'} bg-[#0c1626]`}>
                  <img src={img.url} alt={img.name} className="w-14 h-14 object-cover rounded flex-shrink-0" />
                  <span className="text-[#f4f1ea]/60 text-xs flex-1 truncate">{img.name || img.url}</span>
                  <button
                    onClick={() => setThumbnail(img.url)}
                    className={`text-xs px-2 py-1 rounded border transition-colors ${thumbnail === img.url ? 'border-[#c6a25f] text-[#c6a25f]' : 'border-[#c6a25f]/30 text-[#f4f1ea]/40 hover:text-[#c6a25f]'}`}
                  >
                    {thumbnail === img.url ? t('Thumbnail ★', 'شاخص ★') : t('Set Thumbnail', 'تنظیم شاخص')}
                  </button>
                  <button onClick={() => removeImage(img.url)} className="text-red-400/60 hover:text-red-400 transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2 border-t border-[#c6a25f]/20">
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="flex items-center gap-2 bg-[#c6a25f] hover:bg-[#b8904a] text-[#0c1626] font-semibold px-6 py-2.5 rounded text-sm transition-colors disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
            {saving ? t('Creating…', 'در حال ایجاد…') : t('Create Product', 'ایجاد محصول')}
          </button>
          <button onClick={() => router.push('/admin/gallery')} className="border border-[#c6a25f]/30 text-[#f4f1ea]/60 hover:text-[#f4f1ea] px-6 py-2.5 rounded text-sm transition-colors">
            {t('Cancel', 'انصراف')}
          </button>
        </div>
      </div>
    </div>
  )
}

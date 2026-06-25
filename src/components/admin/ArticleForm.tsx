'use client'

import { useState, useRef, ChangeEvent } from 'react'
import { Upload, Loader2 } from 'lucide-react'
import type { Article } from '@/data/articles'
import { useAdminLang } from '@/components/admin/AdminLangContext'

type ArticleFormData = Omit<Article, 'bodyEn' | 'bodyFa'> & {
  bodyEnText: string
  bodyFaText: string
}

interface ArticleFormProps {
  initial?: ArticleFormData
  onSave: (data: ArticleFormData) => Promise<void>
  saving: boolean
  isNew: boolean
}

const CATEGORIES = ['marble', 'travertine', 'onyx', 'granite', 'care', 'industry'] as const
type ArticleCategory = typeof CATEGORIES[number]

const fieldClass =
  'w-full bg-[#0c1626] border border-[#c6a25f]/20 rounded px-3 py-2.5 text-[#f4f1ea] text-sm focus:outline-none focus:border-[#c6a25f]/60 transition-colors'

const labelClass = 'block text-xs text-[#f4f1ea]/60 uppercase tracking-wider mb-1.5'

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

const emptyForm: ArticleFormData = {
  slug: '',
  category: 'marble',
  titleEn: '',
  titleFa: '',
  excerptEn: '',
  excerptFa: '',
  image: '',
  readTime: 5,
  publishedAt: new Date().toISOString().split('T')[0],
  bodyEnText: '',
  bodyFaText: '',
}

const uploadFile = async (file: File): Promise<string> => {
  const fd = new FormData()
  fd.append('file', file)
  const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
  const data = (await res.json()) as { url: string }
  return data.url
}

export function ArticleForm({ initial, onSave, saving, isNew }: ArticleFormProps) {
  const { t } = useAdminLang()
  const [form, setForm] = useState<ArticleFormData>(initial ?? emptyForm)
  const [slugManual, setSlugManual] = useState(!isNew)
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const set = <K extends keyof ArticleFormData>(k: K, v: ArticleFormData[K]) => {
    setForm((prev) => ({ ...prev, [k]: v }))
  }

  const handleTitleEnChange = (v: string) => {
    set('titleEn', v)
    if (!slugManual) {
      set('slug', slugify(v))
    }
  }

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const url = await uploadFile(file)
      set('image', url)
    } finally {
      setUploading(false)
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSave(form)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>{t('Title (English)', 'عنوان (انگلیسی)')}</label>
          <input
            type="text"
            value={form.titleEn}
            onChange={(e) => handleTitleEnChange(e.target.value)}
            required
            className={fieldClass}
          />
        </div>
        <div>
          <label className={labelClass}>{t('Title (Persian)', 'عنوان (فارسی)')}</label>
          <input
            type="text"
            dir="rtl"
            value={form.titleFa}
            onChange={(e) => set('titleFa', e.target.value)}
            required
            className={fieldClass}
          />
        </div>
      </div>

      {/* Slug + Category + ReadTime + Date */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-2">
          <label className={labelClass}>{t('Slug', 'اسلاگ')}</label>
          <input
            type="text"
            value={form.slug}
            onChange={(e) => { setSlugManual(true); set('slug', e.target.value) }}
            required
            pattern="[a-z0-9\-]+"
            title="Lowercase letters, numbers, hyphens only"
            className={fieldClass}
          />
        </div>
        <div>
          <label className={labelClass}>{t('Category', 'دسته‌بندی')}</label>
          <select
            value={form.category}
            onChange={(e) => set('category', e.target.value as ArticleCategory)}
            required
            className={fieldClass}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>{t('Read Time (min)', 'زمان مطالعه (دقیقه)')}</label>
            <input
              type="number"
              min={1}
              max={60}
              value={form.readTime}
              onChange={(e) => set('readTime', parseInt(e.target.value, 10) || 1)}
              required
              className={fieldClass}
            />
          </div>
          <div>
            <label className={labelClass}>{t('Publish Date', 'تاریخ انتشار')}</label>
            <input
              type="date"
              value={form.publishedAt}
              onChange={(e) => set('publishedAt', e.target.value)}
              required
              className={fieldClass}
            />
          </div>
        </div>
      </div>

      {/* Image */}
      <div>
        <label className={labelClass}>{t('Cover Image', 'تصویر جلد')}</label>
        <div className="flex gap-2 items-start">
          <input
            type="text"
            value={form.image}
            onChange={(e) => set('image', e.target.value)}
            placeholder="/images/articles/my-article.jpg"
            className={`${fieldClass} flex-1`}
          />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-1.5 border border-[#c6a25f]/40 text-[#c6a25f] px-3 py-2.5 rounded text-sm hover:bg-[#c6a25f]/10 transition-colors disabled:opacity-60 flex-shrink-0"
          >
            {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
            {t('Upload', 'آپلود')}
          </button>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
        </div>
        {form.image && (
          <img src={form.image} alt="Preview" className="mt-2 h-20 w-32 object-cover rounded border border-[#c6a25f]/20" />
        )}
      </div>

      {/* Excerpts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>{t('Excerpt (English)', 'خلاصه (انگلیسی)')}</label>
          <textarea
            value={form.excerptEn}
            onChange={(e) => set('excerptEn', e.target.value)}
            rows={3}
            required
            className={fieldClass}
          />
        </div>
        <div>
          <label className={labelClass}>{t('Excerpt (Persian)', 'خلاصه (فارسی)')}</label>
          <textarea
            dir="rtl"
            value={form.excerptFa}
            onChange={(e) => set('excerptFa', e.target.value)}
            rows={3}
            required
            className={fieldClass}
          />
        </div>
      </div>

      {/* Body */}
      <div>
        <label className={labelClass}>{t('Body (English)', 'متن (انگلیسی)')}</label>
        <p className="text-xs text-[#f4f1ea]/40 mb-2">{t('Each paragraph on a new blank line', 'هر پاراگراف با یک خط خالی جدا شود')}</p>
        <textarea
          value={form.bodyEnText}
          onChange={(e) => set('bodyEnText', e.target.value)}
          rows={12}
          required
          className={fieldClass}
        />
      </div>
      <div>
        <label className={labelClass}>{t('Body (Persian)', 'متن (فارسی)')}</label>
        <p className="text-xs text-[#f4f1ea]/40 mb-2">{t('Each paragraph on a new blank line', 'هر پاراگراف با یک خط خالی جدا شود')}</p>
        <textarea
          dir="rtl"
          value={form.bodyFaText}
          onChange={(e) => set('bodyFaText', e.target.value)}
          rows={12}
          required
          className={fieldClass}
        />
      </div>

      {/* Submit */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 bg-[#c6a25f] hover:bg-[#b8904a] text-[#0c1626] font-semibold px-6 py-2.5 rounded text-sm transition-colors disabled:opacity-60"
        >
          {saving && <Loader2 className="w-4 h-4 animate-spin" />}
          {saving ? t('Saving...', 'در حال ذخیره...') : isNew ? t('New Article', 'مقاله جدید') : t('Save', 'ذخیره')}
        </button>
      </div>
    </form>
  )
}

export type { ArticleFormData }
export { slugify }

'use client'

import { useEffect, useState, useCallback, useRef, ChangeEvent } from 'react'
import { Loader2, Upload, Pencil, Trash2, X, Check } from 'lucide-react'
import { Toast } from '@/components/admin/Toast'
import type { WorkshopItem } from '@/data/workshop-gallery'
import { useAdminLang } from '@/components/admin/AdminLangContext'

type WorkshopFormData = Omit<WorkshopItem, 'id'>

const emptyForm: WorkshopFormData = {
  image: '',
  captionEn: '',
  captionFa: '',
  tagEn: '',
  tagFa: '',
}

const fieldClass =
  'w-full bg-[#0c1626] border border-[#c6a25f]/20 rounded px-3 py-2 text-[#f4f1ea] text-sm focus:outline-none focus:border-[#c6a25f]/60 transition-colors'

const labelClass = 'block text-xs text-[#f4f1ea]/60 uppercase tracking-wider mb-1'

const uploadFile = async (file: File): Promise<string> => {
  const fd = new FormData()
  fd.append('file', file)
  const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
  const data = (await res.json()) as { url: string }
  return data.url
}

function WorkshopItemForm({
  initial,
  onSave,
  onCancel,
  saving,
  submitLabel,
  cancelLabel,
}: {
  initial: WorkshopFormData
  onSave: (data: WorkshopFormData) => Promise<void>
  onCancel?: () => void
  saving: boolean
  submitLabel: string
  cancelLabel?: string
}) {
  const [form, setForm] = useState<WorkshopFormData>(initial)
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const set = <K extends keyof WorkshopFormData>(k: K, v: WorkshopFormData[K]) => {
    setForm((prev) => ({ ...prev, [k]: v }))
  }

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
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
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className={labelClass}>Image URL or upload</label>
        <div className="flex gap-2 items-center">
          <input
            type="text"
            value={form.image}
            onChange={(e) => set('image', e.target.value)}
            placeholder="/images/workshop-photo.jpg"
            className={`${fieldClass} flex-1`}
            required
          />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-1 border border-[#c6a25f]/40 text-[#c6a25f] px-2.5 py-2 rounded text-xs hover:bg-[#c6a25f]/10 transition-colors disabled:opacity-60 flex-shrink-0"
          >
            {uploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
          </button>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />
        </div>
        {form.image && (
          <img src={form.image} alt="" className="mt-1.5 h-14 w-20 object-cover rounded border border-[#c6a25f]/20" />
        )}
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>Caption (EN)</label>
          <input type="text" value={form.captionEn} onChange={(e) => set('captionEn', e.target.value)} required className={fieldClass} />
        </div>
        <div>
          <label className={labelClass}>Caption (FA)</label>
          <input dir="rtl" type="text" value={form.captionFa} onChange={(e) => set('captionFa', e.target.value)} required className={fieldClass} />
        </div>
        <div>
          <label className={labelClass}>Tag (EN) <span className="normal-case text-[#f4f1ea]/30">optional</span></label>
          <input type="text" value={form.tagEn ?? ''} onChange={(e) => set('tagEn', e.target.value)} className={fieldClass} />
        </div>
        <div>
          <label className={labelClass}>Tag (FA) <span className="normal-case text-[#f4f1ea]/30">optional</span></label>
          <input dir="rtl" type="text" value={form.tagFa ?? ''} onChange={(e) => set('tagFa', e.target.value)} className={fieldClass} />
        </div>
      </div>
      <div className="flex gap-2 pt-1">
        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-1.5 bg-[#c6a25f] hover:bg-[#b8904a] text-[#0c1626] font-semibold px-4 py-2 rounded text-sm transition-colors disabled:opacity-60"
        >
          {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
          {saving ? 'Saving…' : submitLabel}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="flex items-center gap-1.5 border border-[#c6a25f]/30 text-[#f4f1ea]/60 hover:text-[#f4f1ea] px-4 py-2 rounded text-sm transition-colors"
          >
            <X className="w-3.5 h-3.5" />
            {cancelLabel ?? 'Cancel'}
          </button>
        )}
      </div>
    </form>
  )
}

export default function WorkshopPage() {
  const { t } = useAdminLang()
  const [items, setItems] = useState<WorkshopItem[]>([])
  const [loading, setLoading] = useState(true)
  const [addSaving, setAddSaving] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [editSaving, setEditSaving] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  const loadItems = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/workshop')
      const data = (await res.json()) as WorkshopItem[]
      setItems(data)
    } catch {
      setToast({ message: 'Failed to load workshop items.', type: 'error' })
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadItems()
  }, [loadItems])

  const revalidate = async () => {
    await fetch('/api/admin/revalidate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ paths: ['/en/production', '/fa/production'] }),
    })
  }

  const handleAdd = async (form: WorkshopFormData) => {
    setAddSaving(true)
    try {
      const res = await fetch('/api/admin/workshop', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setToast({ message: 'Item added.', type: 'success' })
        await loadItems()
        await revalidate()
      } else {
        setToast({ message: 'Failed to add item.', type: 'error' })
      }
    } catch {
      setToast({ message: 'Network error.', type: 'error' })
    } finally {
      setAddSaving(false)
    }
  }

  const handleEdit = async (id: string, form: WorkshopFormData) => {
    setEditSaving(true)
    try {
      const res = await fetch(`/api/admin/workshop/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...form }),
      })
      if (res.ok) {
        setToast({ message: 'Item updated.', type: 'success' })
        setEditId(null)
        await loadItems()
        await revalidate()
      } else {
        setToast({ message: 'Failed to update item.', type: 'error' })
      }
    } catch {
      setToast({ message: 'Network error.', type: 'error' })
    } finally {
      setEditSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this workshop item?')) return
    try {
      const res = await fetch(`/api/admin/workshop/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setToast({ message: 'Item deleted.', type: 'success' })
        await loadItems()
        await revalidate()
      } else {
        setToast({ message: 'Failed to delete item.', type: 'error' })
      }
    } catch {
      setToast({ message: 'Network error.', type: 'error' })
    }
  }

  return (
    <div className="p-8">
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}

      <h1 className="text-[#f4f1ea] text-2xl font-semibold mb-8">{t('Workshop Gallery', 'گالری کارگاه')}</h1>

      {/* Add new item */}
      <div className="bg-[#0c1626] border border-[#c6a25f]/20 rounded-lg p-5 mb-8">
        <h2 className="text-[#c6a25f] text-xs uppercase tracking-widest mb-4">{t('Add New Item', 'افزودن آیتم جدید')}</h2>
        <WorkshopItemForm
          initial={emptyForm}
          onSave={handleAdd}
          saving={addSaving}
          submitLabel={t('Add Item', 'افزودن آیتم')}
        />
      </div>

      {/* Items grid */}
      <div>
        <h2 className="text-[#f4f1ea]/80 text-sm uppercase tracking-widest mb-4">
          {loading ? 'Loading…' : `${items.length} Item${items.length !== 1 ? 's' : ''}`}
        </h2>

        {loading ? (
          <div className="flex items-center gap-2 text-[#f4f1ea]/60">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-sm">Loading…</span>
          </div>
        ) : items.length === 0 ? (
          <p className="text-[#f4f1ea]/30 text-sm">No items yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-[#0c1626] border border-[#c6a25f]/20 rounded-lg overflow-hidden"
              >
                {editId === item.id ? (
                  <div className="p-4">
                    <p className="text-[#c6a25f] text-xs uppercase tracking-wider mb-3">Editing</p>
                    <WorkshopItemForm
                      initial={{
                        image: item.image,
                        captionEn: item.captionEn,
                        captionFa: item.captionFa,
                        tagEn: item.tagEn,
                        tagFa: item.tagFa,
                      }}
                      onSave={(form) => handleEdit(item.id, form)}
                      onCancel={() => setEditId(null)}
                      saving={editSaving}
                      submitLabel={t('Save', 'ذخیره')}
                      cancelLabel={t('Cancel', 'انصراف')}
                    />
                  </div>
                ) : (
                  <>
                    <div className="aspect-video bg-[#16263f] overflow-hidden">
                      <img src={item.image} alt={item.captionEn} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-3">
                      {item.tagEn && (
                        <span className="text-[#c6a25f] text-xs uppercase tracking-wider">{item.tagEn}</span>
                      )}
                      <p className="text-[#f4f1ea] text-sm mt-1 line-clamp-2">{item.captionEn}</p>
                      <p className="text-[#f4f1ea]/50 text-xs mt-0.5 line-clamp-1" dir="rtl">{item.captionFa}</p>
                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={() => setEditId(item.id)}
                          className="flex items-center gap-1.5 border border-[#c6a25f]/30 text-[#c6a25f] hover:bg-[#c6a25f]/10 px-3 py-1.5 rounded text-xs transition-colors"
                        >
                          <Pencil className="w-3 h-3" />
                          {t('Edit', 'ویرایش')}
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="flex items-center gap-1.5 border border-red-500/30 text-red-400 hover:bg-red-900/20 px-3 py-1.5 rounded text-xs transition-colors"
                        >
                          <Trash2 className="w-3 h-3" />
                          {t('Delete', 'حذف')}
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

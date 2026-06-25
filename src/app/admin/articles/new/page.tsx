'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { ArticleForm, type ArticleFormData } from '@/components/admin/ArticleForm'
import { Toast } from '@/components/admin/Toast'

export default function NewArticlePage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  const handleSave = async (form: ArticleFormData) => {
    setSaving(true)
    try {
      const body = {
        ...form,
        bodyEn: form.bodyEnText.split('\n\n').map((p) => p.trim()).filter(Boolean),
        bodyFa: form.bodyFaText.split('\n\n').map((p) => p.trim()).filter(Boolean),
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { bodyEnText: _en, bodyFaText: _fa, ...payload } = body
      const res = await fetch('/api/admin/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (res.ok) {
        await fetch('/api/admin/revalidate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ paths: ['/en/knowledge', '/fa/knowledge', `/en/knowledge/${form.slug}`, `/fa/knowledge/${form.slug}`] }),
        })
        setToast({ message: 'Article created successfully.', type: 'success' })
        setTimeout(() => router.push('/admin/articles'), 1200)
      } else {
        const err = (await res.json()) as { error?: string }
        setToast({ message: err.error ?? 'Failed to create article.', type: 'error' })
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
        <Link href="/admin/articles" className="text-[#f4f1ea]/40 hover:text-[#c6a25f] transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-[#f4f1ea] text-2xl font-semibold">New Article</h1>
      </div>
      <div className="max-w-4xl">
        <ArticleForm onSave={handleSave} saving={saving} isNew={true} />
      </div>
    </div>
  )
}

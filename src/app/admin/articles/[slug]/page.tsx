'use client'

import { useEffect, useState, use } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Trash2, Loader2 } from 'lucide-react'
import { ArticleForm, type ArticleFormData } from '@/components/admin/ArticleForm'
import { Toast } from '@/components/admin/Toast'
import type { Article } from '@/data/articles'

export default function EditArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const router = useRouter()
  const [initial, setInitial] = useState<ArticleFormData | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`/api/admin/articles/${slug}`)
        if (!res.ok) {
          setToast({ message: 'Article not found.', type: 'error' })
          return
        }
        const article = (await res.json()) as Article
        setInitial({
          ...article,
          bodyEnText: article.bodyEn.join('\n\n'),
          bodyFaText: article.bodyFa.join('\n\n'),
        })
      } catch {
        setToast({ message: 'Failed to load article.', type: 'error' })
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [slug])

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
      const res = await fetch(`/api/admin/articles/${slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (res.ok) {
        await fetch('/api/admin/revalidate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ paths: ['/en/knowledge', '/fa/knowledge', `/en/knowledge/${slug}`, `/fa/knowledge/${slug}`] }),
        })
        setToast({ message: 'Article saved.', type: 'success' })
      } else {
        const err = (await res.json()) as { error?: string }
        setToast({ message: err.error ?? 'Failed to save article.', type: 'error' })
      }
    } catch {
      setToast({ message: 'Network error.', type: 'error' })
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm('Delete this article permanently? This cannot be undone.')) return
    setDeleting(true)
    try {
      const res = await fetch(`/api/admin/articles/${slug}`, { method: 'DELETE' })
      if (res.ok) {
        await fetch('/api/admin/revalidate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ paths: ['/en/knowledge', '/fa/knowledge', `/en/knowledge/${slug}`, `/fa/knowledge/${slug}`] }),
        })
        router.push('/admin/articles')
      } else {
        setToast({ message: 'Failed to delete article.', type: 'error' })
      }
    } catch {
      setToast({ message: 'Network error.', type: 'error' })
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="p-8">
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin/articles" className="text-[#f4f1ea]/40 hover:text-[#c6a25f] transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-[#f4f1ea] text-2xl font-semibold">Edit Article</h1>
          <span className="text-[#f4f1ea]/30 text-sm font-mono">{slug}</span>
        </div>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="flex items-center gap-2 border border-red-500/40 text-red-400 hover:bg-red-900/20 px-3 py-2 rounded text-sm transition-colors disabled:opacity-60"
        >
          {deleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
          Delete
        </button>
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-[#f4f1ea]/60">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span className="text-sm">Loading article…</span>
        </div>
      ) : initial ? (
        <div className="max-w-4xl">
          <ArticleForm initial={initial} onSave={handleSave} saving={saving} isNew={false} />
        </div>
      ) : (
        <p className="text-red-400 text-sm">Article not found.</p>
      )}
    </div>
  )
}

'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { Plus, Pencil, Trash2, Loader2 } from 'lucide-react'
import { Toast } from '@/components/admin/Toast'
import type { Article } from '@/data/articles'

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  const loadArticles = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/articles')
      const data = (await res.json()) as Article[]
      setArticles(data)
    } catch {
      setToast({ message: 'Failed to load articles.', type: 'error' })
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadArticles()
  }, [loadArticles])

  const handleDelete = async (slug: string, title: string) => {
    if (!window.confirm(`Delete article "${title}"? This cannot be undone.`)) return
    try {
      const res = await fetch(`/api/admin/articles/${slug}`, { method: 'DELETE' })
      if (res.ok) {
        setToast({ message: 'Article deleted.', type: 'success' })
        await loadArticles()
        await fetch('/api/admin/revalidate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ paths: ['/en/knowledge', '/fa/knowledge', `/en/knowledge/${slug}`, `/fa/knowledge/${slug}`] }),
        })
      } else {
        setToast({ message: 'Failed to delete article.', type: 'error' })
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

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-[#f4f1ea] text-2xl font-semibold">Articles</h1>
          {!loading && (
            <p className="text-[#f4f1ea]/40 text-sm mt-1">{articles.length} article{articles.length !== 1 ? 's' : ''}</p>
          )}
        </div>
        <Link
          href="/admin/articles/new"
          className="flex items-center gap-2 bg-[#c6a25f] hover:bg-[#b8904a] text-[#0c1626] font-semibold px-4 py-2 rounded text-sm transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Article
        </Link>
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-[#f4f1ea]/60">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span className="text-sm">Loading articles…</span>
        </div>
      ) : articles.length === 0 ? (
        <div className="bg-[#0c1626] border border-[#c6a25f]/20 rounded-lg p-8 text-center">
          <p className="text-[#f4f1ea]/40 text-sm">No articles yet.</p>
          <Link href="/admin/articles/new" className="text-[#c6a25f] text-sm mt-2 inline-block hover:underline">
            Create the first article →
          </Link>
        </div>
      ) : (
        <div className="bg-[#0c1626] border border-[#c6a25f]/20 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#c6a25f]/20">
                <th className="text-left px-4 py-3 text-xs text-[#f4f1ea]/40 uppercase tracking-wider w-14">Image</th>
                <th className="text-left px-4 py-3 text-xs text-[#f4f1ea]/40 uppercase tracking-wider">Title (FA)</th>
                <th className="text-left px-4 py-3 text-xs text-[#f4f1ea]/40 uppercase tracking-wider w-28">Category</th>
                <th className="text-left px-4 py-3 text-xs text-[#f4f1ea]/40 uppercase tracking-wider w-28">Date</th>
                <th className="text-left px-4 py-3 text-xs text-[#f4f1ea]/40 uppercase tracking-wider w-20">Read</th>
                <th className="text-right px-4 py-3 text-xs text-[#f4f1ea]/40 uppercase tracking-wider w-24">Actions</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article, i) => (
                <tr
                  key={article.slug}
                  className={`${i < articles.length - 1 ? 'border-b border-[#c6a25f]/10' : ''} hover:bg-[#c6a25f]/5 transition-colors`}
                >
                  <td className="px-4 py-3">
                    <img
                      src={article.image}
                      alt=""
                      className="w-10 h-10 object-cover rounded"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-[#f4f1ea] text-sm" dir="rtl">{article.titleFa}</p>
                    <p className="text-[#f4f1ea]/40 text-xs mt-0.5 truncate max-w-xs">{article.titleEn}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-[#c6a25f] text-xs uppercase tracking-wider">{article.category}</span>
                  </td>
                  <td className="px-4 py-3 text-[#f4f1ea]/60 text-sm">
                    {new Date(article.publishedAt).toLocaleDateString('en-GB')}
                  </td>
                  <td className="px-4 py-3 text-[#f4f1ea]/60 text-sm">
                    {article.readTime} min
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/articles/${article.slug}`}
                        className="p-1.5 text-[#f4f1ea]/60 hover:text-[#c6a25f] transition-colors"
                        title="Edit"
                      >
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(article.slug, article.titleEn)}
                        className="p-1.5 text-[#f4f1ea]/60 hover:text-red-400 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

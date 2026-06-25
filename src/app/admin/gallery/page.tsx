'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, Pencil } from 'lucide-react'
import { Toast } from '@/components/admin/Toast'
import { useAdminLang } from '@/components/admin/AdminLangContext'

interface GalleryProduct {
  slug: string
  nameEn: string
  nameFa: string
  categorySlug: string
  thumbnail: string
  images: string[]
  code?: string
}

export default function GalleryPage() {
  const router = useRouter()
  const { t } = useAdminLang()
  const [products, setProducts] = useState<GalleryProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/admin/gallery')
        const data = (await res.json()) as GalleryProduct[]
        setProducts(data)
      } catch {
        setToast({ message: 'Failed to load gallery.', type: 'error' })
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const categories = ['all', ...Array.from(new Set(products.map((p) => p.categorySlug))).sort()]

  const filtered = filter === 'all' ? products : products.filter((p) => p.categorySlug === filter)

  return (
    <div className="p-8">
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-[#f4f1ea] text-2xl font-semibold">{t('Gallery', 'گالری')}</h1>
        {!loading && (
          <p className="text-[#f4f1ea]/40 text-sm">{filtered.length} product{filtered.length !== 1 ? 's' : ''}</p>
        )}
      </div>

      {/* Category filter */}
      {!loading && categories.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 rounded text-xs uppercase tracking-wider transition-colors ${
                filter === cat
                  ? 'bg-[#c6a25f] text-[#0c1626] font-semibold'
                  : 'border border-[#c6a25f]/30 text-[#f4f1ea]/60 hover:text-[#c6a25f] hover:border-[#c6a25f]/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {loading ? (
        <div className="flex items-center gap-2 text-[#f4f1ea]/60">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span className="text-sm">Loading gallery…</span>
        </div>
      ) : filtered.length === 0 ? (
        <p className="text-[#f4f1ea]/40 text-sm">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((product) => (
            <div
              key={product.slug}
              className="bg-[#0c1626] border border-[#c6a25f]/20 rounded-lg overflow-hidden hover:border-[#c6a25f]/50 transition-colors"
            >
              <div className="aspect-square bg-[#16263f] overflow-hidden">
                <img
                  src={product.thumbnail}
                  alt={product.nameEn}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3">
                <p className="text-[#f4f1ea] text-sm font-medium truncate">{product.nameEn}</p>
                <p className="text-[#f4f1ea]/50 text-xs mt-0.5" dir="rtl">{product.nameFa}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[#c6a25f]/60 text-xs">{product.categorySlug}</span>
                  {product.code && <span className="text-[#f4f1ea]/30 text-xs font-mono">{product.code}</span>}
                </div>
                <button
                  onClick={() => router.push(`/admin/gallery/${product.slug}`)}
                  className="mt-3 w-full flex items-center justify-center gap-1.5 border border-[#c6a25f]/30 text-[#c6a25f] hover:bg-[#c6a25f]/10 py-1.5 rounded text-xs transition-colors"
                >
                  <Pencil className="w-3 h-3" />
                  {t('Edit Images', 'ویرایش تصاویر')}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

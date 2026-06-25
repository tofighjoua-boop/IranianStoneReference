'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, Pencil, Plus, FolderOpen } from 'lucide-react'
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

const ALL_CATEGORIES = [
  { slug: 'sang-marmar',       nameEn: 'Marble',            nameFa: 'سنگ مرمریت' },
  { slug: 'crystalline-marble',nameEn: 'Crystalline Marble', nameFa: 'مرمریت کریستالی' },
  { slug: 'travertine',        nameEn: 'Travertine',         nameFa: 'تراورتن' },
  { slug: 'onyx',              nameEn: 'Onyx',               nameFa: 'مرمر' },
  { slug: 'granite',           nameEn: 'Granite',            nameFa: 'گرانیت' },
  { slug: 'washbasins',        nameEn: 'Washbasins',         nameFa: 'روشویی‌ها' },
  { slug: 'accessories',       nameEn: 'Stone Accessories',  nameFa: 'اکسسوری سنگی' },
]

export default function GalleryPage() {
  const router = useRouter()
  const { t } = useAdminLang()
  const [products, setProducts] = useState<GalleryProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('all')
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  useEffect(() => {
    fetch('/api/admin/gallery')
      .then(r => r.json())
      .then((data: GalleryProduct[]) => setProducts(data))
      .catch(() => setToast({ message: t('Failed to load gallery', 'خطا در بارگذاری گالری'), type: 'error' }))
      .finally(() => setLoading(false))
  }, [t])

  const countByCategory = (slug: string) => products.filter(p => p.categorySlug === slug).length

  const filtered = activeCategory === 'all'
    ? products
    : products.filter(p => p.categorySlug === activeCategory)

  const activeCategoryName = activeCategory === 'all'
    ? null
    : ALL_CATEGORIES.find(c => c.slug === activeCategory)

  return (
    <div className="p-8">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-[#f4f1ea] text-2xl font-semibold">{t('Gallery', 'گالری')}</h1>
        <button
          onClick={() => router.push('/admin/gallery/new')}
          className="flex items-center gap-2 bg-[#c6a25f] hover:bg-[#b8904a] text-[#0c1626] font-semibold px-4 py-2 rounded text-sm transition-colors"
        >
          <Plus className="w-4 h-4" />
          {t('New Product', 'محصول جدید')}
        </button>
      </div>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-3 py-1.5 rounded text-xs uppercase tracking-wider transition-colors ${
            activeCategory === 'all'
              ? 'bg-[#c6a25f] text-[#0c1626] font-semibold'
              : 'border border-[#c6a25f]/30 text-[#f4f1ea]/60 hover:text-[#c6a25f]'
          }`}
        >
          {t('All', 'همه')} ({products.length})
        </button>
        {ALL_CATEGORIES.map(cat => {
          const count = countByCategory(cat.slug)
          return (
            <button
              key={cat.slug}
              onClick={() => setActiveCategory(cat.slug)}
              className={`px-3 py-1.5 rounded text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5 ${
                activeCategory === cat.slug
                  ? 'bg-[#c6a25f] text-[#0c1626] font-semibold'
                  : count === 0
                  ? 'border border-[#c6a25f]/15 text-[#f4f1ea]/30 hover:text-[#c6a25f]/70 hover:border-[#c6a25f]/40'
                  : 'border border-[#c6a25f]/30 text-[#f4f1ea]/60 hover:text-[#c6a25f]'
              }`}
            >
              {t(cat.nameEn, cat.nameFa)}
              <span className={`text-[10px] rounded-full px-1.5 py-0.5 ${
                activeCategory === cat.slug ? 'bg-[#0c1626]/30' : count === 0 ? 'bg-[#c6a25f]/10 text-[#c6a25f]/40' : 'bg-[#c6a25f]/15'
              }`}>
                {count}
              </span>
            </button>
          )
        })}
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-[#f4f1ea]/60">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span className="text-sm">{t('Loading…', 'در حال بارگذاری…')}</span>
        </div>
      ) : filtered.length === 0 ? (
        /* Empty state — show add product prompt */
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <FolderOpen className="w-12 h-12 text-[#c6a25f]/30 mb-4" />
          <p className="text-[#f4f1ea]/50 text-sm mb-1">
            {activeCategoryName
              ? t(`No products in ${activeCategoryName.nameEn} yet`, `هنوز محصولی در ${activeCategoryName.nameFa} وجود ندارد`)
              : t('No products yet', 'هنوز محصولی وجود ندارد')}
          </p>
          <p className="text-[#f4f1ea]/30 text-xs mb-5">
            {t('Add the first product to this category', 'اولین محصول را به این دسته اضافه کنید')}
          </p>
          <button
            onClick={() => router.push('/admin/gallery/new')}
            className="flex items-center gap-2 bg-[#c6a25f] hover:bg-[#b8904a] text-[#0c1626] font-semibold px-5 py-2.5 rounded text-sm transition-colors"
          >
            <Plus className="w-4 h-4" />
            {t('Add Product', 'افزودن محصول')}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((product) => (
            <div
              key={product.slug}
              className="bg-[#0c1626] border border-[#c6a25f]/20 rounded-lg overflow-hidden hover:border-[#c6a25f]/50 transition-colors"
            >
              <div className="aspect-square bg-[#16263f] overflow-hidden relative">
                {product.thumbnail ? (
                  <img src={product.thumbnail} alt={product.nameEn} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-[#f4f1ea]/20 text-xs">{t('No image', 'بدون تصویر')}</span>
                  </div>
                )}
                {product.images.length === 0 && (
                  <div className="absolute top-2 right-2 bg-[#c6a25f]/90 text-[#0c1626] text-[10px] font-semibold px-1.5 py-0.5 rounded">
                    {t('No images', 'بدون تصویر')}
                  </div>
                )}
              </div>
              <div className="p-3">
                <p className="text-[#f4f1ea] text-sm font-medium truncate">{product.nameEn}</p>
                <p className="text-[#f4f1ea]/50 text-xs mt-0.5 truncate" dir="rtl">{product.nameFa}</p>
                <div className="flex items-center justify-between mt-1.5">
                  <span className="text-[#c6a25f]/50 text-[10px] uppercase">{product.categorySlug}</span>
                  {product.code && <span className="text-[#f4f1ea]/30 text-[10px] font-mono">{product.code}</span>}
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

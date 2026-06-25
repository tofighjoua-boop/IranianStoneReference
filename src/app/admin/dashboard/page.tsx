'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { FileText, Images, Wrench, Loader2, Plus } from 'lucide-react'
import type { Article } from '@/data/articles'
import type { WorkshopItem } from '@/data/workshop-gallery'
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

interface Stats {
  articles: number
  gallery: number
  workshop: number
}

interface RecentArticle {
  slug: string
  titleEn: string
  publishedAt: string
  category: string
}

export default function DashboardPage() {
  const { t } = useAdminLang()
  const [stats, setStats] = useState<Stats | null>(null)
  const [recentArticles, setRecentArticles] = useState<RecentArticle[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [articlesRes, galleryRes, workshopRes] = await Promise.all([
          fetch('/api/admin/articles'),
          fetch('/api/admin/gallery'),
          fetch('/api/admin/workshop'),
        ])
        const articles = (await articlesRes.json()) as Article[]
        const gallery = (await galleryRes.json()) as GalleryProduct[]
        const workshop = (await workshopRes.json()) as WorkshopItem[]

        setStats({
          articles: articles.length,
          gallery: gallery.length,
          workshop: workshop.length,
        })

        const sorted = [...articles].sort(
          (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        )
        setRecentArticles(
          sorted.slice(0, 5).map((a) => ({
            slug: a.slug,
            titleEn: a.titleEn,
            publishedAt: a.publishedAt,
            category: a.category,
          }))
        )
      } catch {
        // silently fail on dashboard
      } finally {
        setLoading(false)
      }
    }
    fetchAll()
  }, [])

  const statCards = [
    { labelEn: 'Total Articles', labelFa: 'کل مقالات', value: stats?.articles, icon: FileText, href: '/admin/articles' },
    { labelEn: 'Gallery Products', labelFa: 'محصولات گالری', value: stats?.gallery, icon: Images, href: '/admin/gallery' },
    { labelEn: 'Workshop Items', labelFa: 'آیتم‌های کارگاه', value: stats?.workshop, icon: Wrench, href: '/admin/workshop' },
  ]

  return (
    <div className="p-8">
      <h1 className="text-[#f4f1ea] text-2xl font-semibold mb-8">{t('Dashboard', 'داشبورد')}</h1>

      {/* Stat cards */}
      {loading ? (
        <div className="flex items-center gap-2 text-[#f4f1ea]/60 mb-8">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span className="text-sm">Loading stats…</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {statCards.map((card) => {
            const Icon = card.icon
            return (
              <Link
                key={card.labelEn}
                href={card.href}
                className="bg-[#0c1626] border border-[#c6a25f]/20 rounded-lg p-6 hover:border-[#c6a25f]/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[#c6a25f] text-3xl font-bold mb-1">
                      {card.value ?? '—'}
                    </p>
                    <p className="text-[#f4f1ea]/60 text-sm">{t(card.labelEn, card.labelFa)}</p>
                  </div>
                  <Icon className="w-6 h-6 text-[#c6a25f]/40" />
                </div>
              </Link>
            )
          })}
        </div>
      )}

      {/* Quick actions */}
      <div className="mb-10">
        <h2 className="text-[#f4f1ea]/80 text-sm uppercase tracking-widest mb-4">
          {t('Quick Actions', 'دسترسی سریع')}
        </h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/articles/new"
            className="flex items-center gap-2 bg-[#c6a25f] hover:bg-[#b8904a] text-[#0c1626] font-semibold px-4 py-2 rounded text-sm transition-colors"
          >
            <Plus className="w-4 h-4" />
            {t('New Article', 'مقاله جدید')}
          </Link>
          <Link
            href="/admin/workshop"
            className="flex items-center gap-2 border border-[#c6a25f] text-[#c6a25f] hover:bg-[#c6a25f]/10 px-4 py-2 rounded text-sm transition-colors"
          >
            <Plus className="w-4 h-4" />
            {t('New Workshop Item', 'آیتم کارگاه جدید')}
          </Link>
        </div>
      </div>

      {/* Recent articles */}
      <div>
        <h2 className="text-[#f4f1ea]/80 text-sm uppercase tracking-widest mb-4">
          {t('Recent Articles', 'آخرین مقالات')}
        </h2>
        {loading ? (
          <div className="flex items-center gap-2 text-[#f4f1ea]/60">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-sm">Loading…</span>
          </div>
        ) : recentArticles.length === 0 ? (
          <p className="text-[#f4f1ea]/40 text-sm">No articles yet.</p>
        ) : (
          <div className="bg-[#0c1626] border border-[#c6a25f]/20 rounded-lg overflow-hidden">
            {recentArticles.map((article, i) => (
              <Link
                key={article.slug}
                href={`/admin/articles/${article.slug}`}
                className={`flex items-center justify-between px-4 py-3 hover:bg-[#c6a25f]/5 transition-colors ${
                  i < recentArticles.length - 1 ? 'border-b border-[#c6a25f]/10' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-[#c6a25f]/60 text-xs uppercase tracking-wider w-20 flex-shrink-0">
                    {article.category}
                  </span>
                  <span className="text-[#f4f1ea] text-sm truncate max-w-xs">
                    {article.titleEn}
                  </span>
                </div>
                <span className="text-[#f4f1ea]/40 text-xs flex-shrink-0 ml-4">
                  {new Date(article.publishedAt).toLocaleDateString('en-GB')}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

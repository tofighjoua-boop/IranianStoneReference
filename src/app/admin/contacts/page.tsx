'use client'

import { useEffect, useState } from 'react'
import { Loader2, Inbox } from 'lucide-react'
import { useAdminLang } from '@/components/admin/AdminLangContext'
import type { ContactSubmission } from '@/lib/storage'

export default function ContactsPage() {
  const { t } = useAdminLang()
  const [contacts, setContacts] = useState<ContactSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<ContactSubmission | null>(null)

  useEffect(() => {
    fetch('/api/admin/contacts')
      .then(r => r.json())
      .then((data: ContactSubmission[]) => setContacts(data))
      .finally(() => setLoading(false))
  }, [])

  const fmt = (iso: string) =>
    new Date(iso).toLocaleString('fa-IR', { timeZone: 'Asia/Tehran' })

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-[#f4f1ea] text-2xl font-semibold">
          {t('Contact Submissions', 'درخواست‌های قیمت')}
        </h1>
        <span className="text-[#f4f1ea]/40 text-sm">
          {contacts.length} {t('total', 'مورد')}
        </span>
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-[#f4f1ea]/60">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span className="text-sm">{t('Loading…', 'در حال بارگذاری…')}</span>
        </div>
      ) : contacts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Inbox className="w-12 h-12 text-[#c6a25f]/30 mb-4" />
          <p className="text-[#f4f1ea]/50 text-sm">{t('No submissions yet', 'هنوز درخواستی وجود ندارد')}</p>
        </div>
      ) : (
        <div className="flex gap-6">
          {/* List */}
          <div className="flex-1 min-w-0 space-y-2">
            {contacts.map(c => (
              <button
                key={c.id}
                onClick={() => setSelected(c)}
                className={`w-full text-left p-4 rounded border transition-colors ${
                  selected?.id === c.id
                    ? 'border-[#c6a25f] bg-[#c6a25f]/5'
                    : 'border-[#c6a25f]/20 bg-[#0c1626] hover:border-[#c6a25f]/40'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[#f4f1ea] text-sm font-medium truncate">{c.name || '—'}</span>
                  <span className="text-[#f4f1ea]/30 text-xs ml-3 flex-shrink-0">{fmt(c.submittedAt)}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[#c6a25f]/70 text-xs">{c.country || '—'}</span>
                  {c.phone && <span className="text-[#f4f1ea]/60 text-xs">· {c.phone}</span>}
                  {c.stone && <span className="text-[#f4f1ea]/40 text-xs">· {c.stone}</span>}
                </div>
                <p className="text-[#f4f1ea]/40 text-xs mt-1 truncate">{c.message}</p>
              </button>
            ))}
          </div>

          {/* Detail panel */}
          {selected && (
            <div className="w-96 flex-shrink-0 bg-[#0c1626] border border-[#c6a25f]/20 rounded p-5 self-start">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-[#c6a25f] text-sm uppercase tracking-widest">
                  {t('Detail', 'جزئیات')}
                </h2>
                <button onClick={() => setSelected(null)} className="text-[#f4f1ea]/30 hover:text-[#f4f1ea] text-xs">✕</button>
              </div>

              <dl className="space-y-3">
                {[
                  [t('Name', 'نام'), selected.name],
                  [t('Company', 'شرکت'), selected.company],
                  [t('Country', 'کشور'), selected.country],
                  [t('Phone', 'تلفن'), selected.phone],
                  [t('Email', 'ایمیل'), selected.email],
                  [t('Stone', 'سنگ'), selected.stone],
                  [t('Project Type', 'نوع پروژه'), selected.projectType],
                  [t('Language', 'زبان'), selected.locale === 'fa' ? 'فارسی' : 'English'],
                  [t('Date', 'تاریخ'), fmt(selected.submittedAt)],
                ].map(([label, value]) => value ? (
                  <div key={label}>
                    <dt className="text-[#f4f1ea]/40 text-[10px] uppercase tracking-wider">{label}</dt>
                    <dd className="text-[#f4f1ea] text-sm mt-0.5">{value}</dd>
                  </div>
                ) : null)}

                <div>
                  <dt className="text-[#f4f1ea]/40 text-[10px] uppercase tracking-wider mb-1">{t('Message', 'پیام')}</dt>
                  <dd className="text-[#f4f1ea]/80 text-sm leading-relaxed whitespace-pre-wrap border border-[#c6a25f]/15 rounded p-3 bg-[#16263f]">
                    {selected.message || '—'}
                  </dd>
                </div>
              </dl>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

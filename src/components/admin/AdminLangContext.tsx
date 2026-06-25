'use client'
import { createContext, useContext, useState } from 'react'

type Lang = 'en' | 'fa'

const AdminLangContext = createContext<{
  lang: Lang
  setLang: (l: Lang) => void
  t: (en: string, fa: string) => string
}>({ lang: 'fa', setLang: () => {}, t: (_en, fa) => fa })

export function AdminLangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('fa') // default Persian
  const t = (en: string, fa: string) => lang === 'fa' ? fa : en
  return (
    <AdminLangContext.Provider value={{ lang, setLang, t }}>
      <div dir={lang === 'fa' ? 'rtl' : 'ltr'} style={{ fontFamily: lang === 'fa' ? 'var(--font-vazirmatn), sans-serif' : 'var(--font-lato), sans-serif' }}>
        {children}
      </div>
    </AdminLangContext.Provider>
  )
}

export const useAdminLang = () => useContext(AdminLangContext)

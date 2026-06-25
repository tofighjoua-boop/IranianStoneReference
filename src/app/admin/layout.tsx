'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { AdminLangProvider } from '@/components/admin/AdminLangContext'
import { Loader2 } from 'lucide-react'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [checking, setChecking] = useState(true)

  const isLoginPage = pathname === '/admin/login'

  useEffect(() => {
    if (isLoginPage) {
      // Use a microtask so the state update isn't synchronous inside the effect
      Promise.resolve().then(() => setChecking(false))
      return
    }
    fetch('/api/admin/auth/me')
      .then((res) => {
        if (res.status === 401) {
          router.replace('/admin/login')
        } else {
          setChecking(false)
        }
      })
      .catch(() => {
        router.replace('/admin/login')
      })
  }, [isLoginPage, router])

  if (isLoginPage) {
    return <>{children}</>
  }

  if (checking) {
    return (
      <div className="min-h-screen bg-[#0c1626] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#c6a25f] animate-spin" />
      </div>
    )
  }

  return (
    <AdminLangProvider>
      <div className="min-h-screen flex bg-[#16263f]">
        <AdminSidebar currentPath={pathname} />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </AdminLangProvider>
  )
}

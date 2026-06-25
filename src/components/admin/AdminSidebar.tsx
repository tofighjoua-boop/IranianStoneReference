'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { LayoutDashboard, FileText, Images, Wrench, LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'

interface NavItem {
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Articles', href: '/admin/articles', icon: FileText },
  { label: 'Gallery', href: '/admin/gallery', icon: Images },
  { label: 'Workshop', href: '/admin/workshop', icon: Wrench },
]

export function AdminSidebar({ currentPath }: { currentPath: string }) {
  const router = useRouter()

  const handleLogout = async () => {
    await fetch('/api/admin/auth/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  return (
    <aside className="w-64 min-h-screen bg-[#0c1626] border-r border-[#c6a25f]/20 flex flex-col">
      {/* Brand */}
      <div className="px-6 py-6 border-b border-[#c6a25f]/20">
        <span className="text-[#c6a25f] text-xl font-semibold tracking-widest uppercase">
          ISR Admin
        </span>
      </div>

      {/* Nav items */}
      <nav className="flex-1 py-4">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = currentPath === item.href || currentPath.startsWith(item.href + '/')
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-6 py-3 text-sm transition-colors',
                isActive
                  ? 'border-l-2 border-[#c6a25f] text-[#c6a25f] bg-[#c6a25f]/5 pl-[22px]'
                  : 'text-[#f4f1ea]/60 hover:text-[#f4f1ea] hover:bg-[#c6a25f]/5'
              )}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="px-4 py-4 border-t border-[#c6a25f]/20">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-2 py-2 text-sm text-[#f4f1ea]/60 hover:text-[#f4f1ea] transition-colors rounded"
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          Logout
        </button>
      </div>
    </aside>
  )
}

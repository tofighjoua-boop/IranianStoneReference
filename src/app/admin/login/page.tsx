'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, LogIn } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [lang, setLang] = useState<'en' | 'fa'>('fa')

  const t = (en: string, fa: string) => lang === 'fa' ? fa : en

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      if (res.ok) {
        router.push('/admin/dashboard')
      } else {
        setError(t('Invalid username or password.', 'نام کاربری یا رمز عبور اشتباه است'))
      }
    } catch {
      setError(t('Network error. Please try again.', 'خطای شبکه. لطفاً دوباره تلاش کنید.'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0c1626] flex items-center justify-center px-4" dir={lang === 'fa' ? 'rtl' : 'ltr'}>
      <div className="w-full max-w-sm">
        {/* Brand */}
        <div className="text-center mb-8">
          <h1 className="text-[#c6a25f] text-3xl font-semibold tracking-widest uppercase mb-2">
            ISR
          </h1>
          <p className="text-[#f4f1ea]/60 text-sm tracking-widest uppercase">
            {t('Admin Panel', 'پنل مدیریت')}
          </p>
        </div>

        {/* Card */}
        <div className="bg-[#16263f] border border-[#c6a25f]/20 rounded-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[#f4f1ea] text-lg font-medium">{t('Sign In', 'ورود')}</h2>
            <div className="flex gap-1.5">
              <button
                onClick={() => setLang('en')}
                className={`px-2 py-1 rounded text-xs font-semibold transition-colors ${
                  lang === 'en' ? 'bg-[#c6a25f] text-[#0c1626]' : 'border border-[#c6a25f]/30 text-[#f4f1ea]/60 hover:text-[#c6a25f]'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLang('fa')}
                className={`px-2 py-1 rounded text-xs font-semibold transition-colors ${
                  lang === 'fa' ? 'bg-[#c6a25f] text-[#0c1626]' : 'border border-[#c6a25f]/30 text-[#f4f1ea]/60 hover:text-[#c6a25f]'
                }`}
              >
                FA
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs text-[#f4f1ea]/60 uppercase tracking-wider mb-1.5">
                {t('Username', 'نام کاربری')}
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
                className="w-full bg-[#0c1626] border border-[#c6a25f]/20 rounded px-3 py-2.5 text-[#f4f1ea] text-sm focus:outline-none focus:border-[#c6a25f]/60 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs text-[#f4f1ea]/60 uppercase tracking-wider mb-1.5">
                {t('Password', 'رمز عبور')}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full bg-[#0c1626] border border-[#c6a25f]/20 rounded px-3 py-2.5 text-[#f4f1ea] text-sm focus:outline-none focus:border-[#c6a25f]/60 transition-colors"
              />
            </div>

            {error && (
              <p className="text-red-400 text-sm py-1">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#c6a25f] hover:bg-[#b8904a] text-[#0c1626] font-semibold py-2.5 rounded text-sm tracking-wide transition-colors disabled:opacity-60 flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <LogIn className="w-4 h-4" />
              )}
              {loading ? t('Signing in…', 'در حال ورود...') : t('Sign In', 'ورود')}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

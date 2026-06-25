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
        setError('Invalid username or password.')
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0c1626] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Brand */}
        <div className="text-center mb-8">
          <h1 className="text-[#c6a25f] text-3xl font-semibold tracking-widest uppercase mb-2">
            ISR
          </h1>
          <p className="text-[#f4f1ea]/60 text-sm tracking-widest uppercase">
            Admin Panel
          </p>
        </div>

        {/* Card */}
        <div className="bg-[#16263f] border border-[#c6a25f]/20 rounded-lg p-8">
          <h2 className="text-[#f4f1ea] text-lg font-medium mb-6">Sign In</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs text-[#f4f1ea]/60 uppercase tracking-wider mb-1.5">
                Username
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
                Password
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
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

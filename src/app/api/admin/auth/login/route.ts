import { NextRequest, NextResponse } from 'next/server'
import { signToken } from '@/lib/auth'

export async function POST(request: NextRequest) {
  const body = await request.json() as { username?: string; password?: string }
  const { username, password } = body

  const envUser = (process.env.ADMIN_USERNAME ?? '').trim()
  const envPass = (process.env.ADMIN_PASSWORD ?? '').trim()

  if (!envUser || !envPass) {
    return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 })
  }

  if (username !== envUser || password !== envPass) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  const token = await signToken({ username: username as string })
  const response = NextResponse.json({ success: true })
  response.cookies.set('admin_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  })
  return response
}

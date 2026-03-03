'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/quantguide/'
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const result = await signIn('credentials', {
        username: username.trim(),
        password,
        redirect: false,
      })
      if (result?.error) {
        setError('Invalid username or password')
        setLoading(false)
        return
      }
      router.push(callbackUrl)
      router.refresh()
    } catch {
      setError('Something went wrong')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white pt-32">
      <div className="max-w-md mx-auto px-4">
        <h1 className="text-3xl font-bold mb-2">Log in</h1>
        <p className="text-gray-600 mb-6">
          QuantGuide question bank — your progress is saved when you’re logged in.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#75B2DD] focus:ring-0 focus:outline-none"
              autoComplete="username"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#75B2DD] focus:ring-0 focus:outline-none"
              autoComplete="current-password"
              required
            />
          </div>
          {error && (
            <p className="text-red-600 text-sm">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-[#75B2DD] text-white font-medium rounded-lg hover:bg-[#5a9bc4] disabled:opacity-50"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
        <p className="mt-4 text-gray-600 text-sm">
          Don’t have an account?{' '}
          <Link href="/register" className="text-[#75B2DD] font-medium hover:underline">
            Register
          </Link>
        </p>
        <p className="mt-2">
          <Link href="/quantguide/" className="text-gray-500 text-sm hover:underline">
            ← Back to QuantGuide
          </Link>
        </p>
      </div>
    </div>
  )
}

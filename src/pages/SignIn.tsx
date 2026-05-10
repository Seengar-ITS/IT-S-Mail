import { useState } from 'react'
import { supabase } from '../lib/supabase'

interface Props { onSwitch: () => void }

export default function SignIn({ onSwitch }: Props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error: err } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (err) setError(err.message)
  }

  return (
    <div style={overlay}>
      <div style={card}>
        <div style={logo}>
          <div style={logoIcon}>M</div>
          <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>IT-S Mail</span>
        </div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 8, letterSpacing: '-0.03em' }}>Sign in</h1>
        <p style={{ color: 'var(--muted)', fontSize: '0.875rem', marginBottom: '1.75rem' }}>
          Access your mail account
        </p>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={label}>Email</label>
            <input
              type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com" required style={input}
            />
          </div>
          <div>
            <label style={label}>Password</label>
            <input
              type="password" value={password} onChange={e => setPassword(e.target.value)}
              placeholder="••••••••" required style={input}
            />
          </div>
          {error && <p style={{ color: '#ef4444', fontSize: '0.8rem', margin: 0 }}>{error}</p>}
          <button type="submit" disabled={loading} style={btn}>
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
        <p style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.85rem', color: 'var(--muted)' }}>
          No account?{' '}
          <button onClick={onSwitch} style={link}>Create one</button>
        </p>
      </div>
    </div>
  )
}

const overlay: React.CSSProperties = {
  minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
  background: 'var(--bg)', padding: '1rem',
}
const card: React.CSSProperties = {
  width: '100%', maxWidth: 400, background: 'var(--surface)',
  border: '1px solid var(--border)', borderRadius: 16, padding: '2.5rem',
}
const logo: React.CSSProperties = {
  display: 'flex', alignItems: 'center', gap: 10, marginBottom: '2rem',
}
const logoIcon: React.CSSProperties = {
  width: 32, height: 32, borderRadius: 8,
  background: 'linear-gradient(135deg, #6c63ff, #a855f7)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  fontSize: 14, fontWeight: 700, color: '#fff',
}
const label: React.CSSProperties = {
  display: 'block', fontSize: '0.8rem', fontWeight: 600,
  color: 'var(--muted)', marginBottom: 6, letterSpacing: '0.04em', textTransform: 'uppercase',
}
const input: React.CSSProperties = {
  width: '100%', background: 'var(--bg)', border: '1px solid var(--border)',
  borderRadius: 8, padding: '10px 14px', color: 'var(--text)',
  fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box',
}
const btn: React.CSSProperties = {
  background: 'linear-gradient(135deg, #6c63ff, #a855f7)',
  color: '#fff', border: 'none', borderRadius: 8,
  padding: '11px', fontSize: '0.9rem', fontWeight: 700,
  cursor: 'pointer', marginTop: 4,
}
const link: React.CSSProperties = {
  background: 'none', border: 'none', color: '#6c63ff',
  fontWeight: 600, cursor: 'pointer', fontSize: '0.85rem', padding: 0,
}

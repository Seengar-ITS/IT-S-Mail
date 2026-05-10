import { useState } from 'react'
import { supabase } from '../lib/supabase'

interface Props { onSwitch: () => void }

export default function SignUp({ onSwitch }: Props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (password !== confirm) { setError('Passwords do not match'); return }
    if (password.length < 6) { setError('Password must be at least 6 characters'); return }
    setLoading(true)
    const { error: err } = await supabase.auth.signUp({ email, password })
    setLoading(false)
    if (err) setError(err.message)
    else setSuccess(true)
  }

  if (success) return (
    <div style={overlay}>
      <div style={card}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✉️</div>
          <h2 style={{ fontWeight: 700, marginBottom: 8 }}>Check your email</h2>
          <p style={{ color: 'var(--muted)', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
            A confirmation link has been sent to <strong style={{ color: 'var(--text)' }}>{email}</strong>.
            Click it to activate your account.
          </p>
          <button onClick={onSwitch} style={btn}>Back to Sign In</button>
        </div>
      </div>
    </div>
  )

  return (
    <div style={overlay}>
      <div style={card}>
        <div style={logo}>
          <div style={logoIcon}>M</div>
          <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>IT-S Mail</span>
        </div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 8, letterSpacing: '-0.03em' }}>Create account</h1>
        <p style={{ color: 'var(--muted)', fontSize: '0.875rem', marginBottom: '1.75rem' }}>
          Set up your IT-S Mail account
        </p>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={label}>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com" required style={input} />
          </div>
          <div>
            <label style={label}>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)}
              placeholder="Min. 6 characters" required style={input} />
          </div>
          <div>
            <label style={label}>Confirm Password</label>
            <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)}
              placeholder="••••••••" required style={input} />
          </div>
          {error && <p style={{ color: '#ef4444', fontSize: '0.8rem', margin: 0 }}>{error}</p>}
          <button type="submit" disabled={loading} style={btn}>
            {loading ? 'Creating account…' : 'Create Account'}
          </button>
        </form>
        <p style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.85rem', color: 'var(--muted)' }}>
          Already have an account?{' '}
          <button onClick={onSwitch} style={link}>Sign in</button>
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

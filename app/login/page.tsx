'use client'

import { FormEvent, useState } from 'react'
import { ArrowRight, Check, Eye, EyeOff, LockKeyhole, ShieldCheck } from 'lucide-react'
import { useRouter } from 'next/navigation'

const demoEmail = 'admin@jilmek.demo'
const demoPassword = 'demo1234'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState(demoEmail)
  const [password, setPassword] = useState(demoPassword)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const submit = (event: FormEvent) => {
    event.preventDefault()
    if (email.trim().toLowerCase() !== demoEmail || password !== demoPassword) {
      setError('Use the demo credentials shown below.')
      return
    }
    window.localStorage.setItem('jilmeker-demo-auth', 'active')
    router.push('/')
  }

  return <main className="login-page"><div className="login-decoration one" /><div className="login-decoration two" /><section className="login-card"><div className="login-brand"><img src="/jilmek-logo.png" alt="Jilmek Roofing & Construction Ltd." /><span>ERP CONTROL ROOM</span></div><div className="login-heading"><div className="login-icon"><LockKeyhole size={18} /></div><div><div className="eyebrow">Secure workspace access</div><h1>Sign in to Jilmeker ERP</h1><p>Open the Phase 1 working demo for Jilmek Construction.</p></div></div><form onSubmit={submit}><label>Email address<input type="email" value={email} onChange={event => setEmail(event.target.value)} autoComplete="username" /></label><label>Password<div className="password-field"><input type={showPassword ? 'text' : 'password'} value={password} onChange={event => setPassword(event.target.value)} autoComplete="current-password" /><button type="button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}</button></div></label>{error && <div className="login-error">{error}</div>}<button className="button button-primary login-button" type="submit">Sign in to demo <ArrowRight size={16} /></button></form><div className="demo-credentials"><div><ShieldCheck size={16} /><strong>Demo credentials</strong></div><p><span>Email</span><code>{demoEmail}</code></p><p><span>Password</span><code>{demoPassword}</code></p><button type="button" onClick={() => { setEmail(demoEmail); setPassword(demoPassword); setError('') }}><Check size={14} /> Use demo account</button></div><small className="login-note">Demo-only browser session. Production authentication and server-side permissions are not enabled in Phase 1.</small></section></main>
}

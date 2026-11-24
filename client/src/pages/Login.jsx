import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../lib/auth.jsx'
import { useToast } from '../lib/toast.jsx'
import Icon from '../components/Icon.jsx'
import AuthShell from '../components/AuthShell.jsx'

export default function Login() {
  const { login } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()
  const params = new URLSearchParams(window.location.search)
  const next = params.get('next') || '/dashboard'

  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (e, credentials) => {
    e?.preventDefault()
    setError('')
    setLoading(true)
    try {
      const payload = credentials || form
      await login(payload)
      toast('Welcome back.', 'success')
      navigate(next, { replace: true })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const demo = () => {
    const credentials = { email: 'demo@resumate.app', password: 'demo1234' }
    setForm(credentials)
    submit(null, credentials)
  }

  return (
    <AuthShell
      title="Welcome back."
      subtitle="Your drafts are exactly where you left them."
      footer={
        <p>
          New here? <Link to={`/signup${next !== '/dashboard' ? `?next=${encodeURIComponent(next)}` : ''}`}>Create a free account</Link>
        </p>
      }
    >
      <form className="auth__form" onSubmit={submit} noValidate>
        {error && (
          <div className="form-error" role="alert">
            <Icon name="alert" size={15} /> {error}
          </div>
        )}

        <div className="field">
          <label htmlFor="login-email">Email</label>
          <input
            id="login-email"
            className="input"
            type="email"
            autoComplete="email"
            placeholder="you@email.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>

        <div className="field">
          <div className="auth__label-row">
            <label htmlFor="login-password">Password</label>
            <span className="auth__hint">8+ characters</span>
          </div>
          <input
            id="login-password"
            className="input"
            type="password"
            autoComplete="current-password"
            placeholder="Your password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
        </div>

        <button type="submit" className="btn btn--primary btn--block btn--lg" disabled={loading}>
          {loading ? <span className="spinner spinner--light" /> : <>Log in <Icon name="arrowRight" size={16} /></>}
        </button>

        <div className="auth__divider"><span>or</span></div>

        <button type="button" className="btn btn--outline btn--block" onClick={demo} disabled={loading}>
          Try the demo account
        </button>

        <p className="auth__demo-note">
          Demo: demo@resumate.app · demo1234
        </p>
      </form>
    </AuthShell>
  )
}

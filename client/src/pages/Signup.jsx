import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../lib/auth.jsx'
import { useToast } from '../lib/toast.jsx'
import Icon from '../components/Icon.jsx'
import AuthShell from '../components/AuthShell.jsx'

export default function Signup() {
  const { register } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()
  const params = new URLSearchParams(window.location.search)
  const next = params.get('next') || '/dashboard'

  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setError('')

    if (form.name.trim().length < 2) return setError('Please enter your full name.')
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email)) return setError('Enter a valid email address.')
    if (form.password.length < 8) return setError('Use at least 8 characters for your password.')

    setLoading(true)
    try {
      await register({ ...form, name: form.name.trim(), email: form.email.trim() })
      toast('Account created. Let’s build something.', 'success')
      navigate(next, { replace: true })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthShell
      title="Start with a blank page. Leave with a resume."
      subtitle="Free forever for one resume. No card, no countdown."
      footer={
        <p>
          Already have an account?{' '}
          <Link to={`/login${next !== '/dashboard' ? `?next=${encodeURIComponent(next)}` : ''}`}>Log in</Link>
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
          <label htmlFor="signup-name">Full name</label>
          <input
            id="signup-name"
            className="input"
            autoComplete="name"
            placeholder="Maya Chen"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>

        <div className="field">
          <label htmlFor="signup-email">Email</label>
          <input
            id="signup-email"
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
            <label htmlFor="signup-password">Password</label>
            <span className="auth__hint">At least 8 characters</span>
          </div>
          <input
            id="signup-password"
            className="input"
            type="password"
            autoComplete="new-password"
            placeholder="Create a password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
        </div>

        <button type="submit" className="btn btn--primary btn--block btn--lg" disabled={loading}>
          {loading ? <span className="spinner spinner--light" /> : <>Create free account <Icon name="arrowRight" size={16} /></>}
        </button>

        <p className="auth__demo-note">
          You can export a PDF immediately. Upgrading is optional.
        </p>
      </form>
    </AuthShell>
  )
}

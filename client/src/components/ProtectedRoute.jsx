import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../lib/auth.jsx'

export default function ProtectedRoute({ children, allowGuest = false }) {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="app-loading">
        <span className="spinner" />
        <p>Loading your workspace…</p>
      </div>
    )
  }

  if (!user && !allowGuest) {
    return <Navigate to={`/login?next=${encodeURIComponent(location.pathname)}`} replace />
  }

  return children
}

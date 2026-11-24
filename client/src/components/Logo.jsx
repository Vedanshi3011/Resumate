import { Link } from 'react-router-dom'

export default function Logo({ to = '/', tone = 'dark', compact = false }) {
  return (
    <Link to={to} className={`logo logo--${tone}`} aria-label="Resumate home">
      <span className="logo__mark" aria-hidden="true">
        <svg viewBox="0 0 32 32" width="32" height="32">
          <rect width="32" height="32" rx="9" fill="currentColor" />
          <path
            d="M10 24V8h6.4c3.1 0 5 1.7 5 4.4 0 2-1.1 3.4-3 4L22 24h-3.7l-3.2-6.5H13V24h-3Zm3-9h3c1.5 0 2.3-.7 2.3-2 0-1.3-.8-2-2.3-2h-3v4Z"
            fill="white"
          />
          <circle cx="23" cy="9" r="2.2" fill="#FF8A6B" />
        </svg>
      </span>
      {!compact && (
        <span className="logo__word">
          Resumate<span className="logo__dot">.</span>
        </span>
      )}
    </Link>
  )
}

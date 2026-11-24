import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import Logo from './Logo.jsx'
import Icon from './Icon.jsx'
import { useAuth } from '../lib/auth.jsx'

const menus = [
  {
    id: 'resumes',
    label: 'Resumes',
    items: [
      { to: '/builder/new', title: 'Resume builder', desc: 'Guided writing, live preview', icon: 'file' },
      { to: '/templates', title: 'Templates', desc: '8 layouts, ATS-friendly', icon: 'layout' },
      { to: '/examples', title: 'Examples', desc: 'Real resumes by role', icon: 'grid' },
      { to: '/ats-checker', title: 'ATS checker', desc: 'See what a parser sees', icon: 'shield' },
    ],
  },
  {
    id: 'resources',
    label: 'Resources',
    items: [
      { to: '/career-center', title: 'Career center', desc: 'Practical, human advice', icon: 'edit' },
      { to: '/pricing', title: 'Pricing', desc: 'Free forever, Pro when ready', icon: 'sparkle' },
      { to: '/about', title: 'About us', desc: 'Why we build this', icon: 'heart' },
      { to: '/contact', title: 'Contact', desc: 'Talk to a person', icon: 'mail' },
    ],
  },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [openMenu, setOpenMenu] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [banner, setBanner] = useState(() => localStorage.getItem('resumate.banner') !== 'off')
  const navRef = useRef(null)
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpenMenu(null)
    setMobileOpen(false)
  }, [location.pathname, location.search])

  useEffect(() => {
    const onDown = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setOpenMenu(null)
    }
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpenMenu(null)
        setMobileOpen(false)
      }
    }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const dismissBanner = () => {
    setBanner(false)
    localStorage.setItem('resumate.banner', 'off')
  }

  const initials = user?.name
    ? user.name
        .split(' ')
        .map((p) => p[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : ''

  return (
    <>
      {banner && (
        <div className="banner">
          <p>
            <span className="banner__tag">New</span>
            AI bullet suggestions are live — and free this month.
            <Link to="/builder/new">Try them out <Icon name="arrowRight" size={14} /></Link>
          </p>
          <button type="button" onClick={dismissBanner} aria-label="Dismiss announcement">
            <Icon name="close" size={15} />
          </button>
        </div>
      )}

      <header className={`nav ${scrolled ? 'is-scrolled' : ''}`} ref={navRef}>
        <div className="container nav__inner">
          <Logo />

          <nav className="nav__links" aria-label="Main">
            {menus.map((menu) => (
              <div
                key={menu.id}
                className="nav__menu"
                onMouseEnter={() => setOpenMenu(menu.id)}
                onMouseLeave={() => setOpenMenu((cur) => (cur === menu.id ? null : cur))}
              >
                <button
                  type="button"
                  className={`nav__trigger ${openMenu === menu.id ? 'is-open' : ''}`}
                  aria-expanded={openMenu === menu.id}
                  aria-haspopup="true"
                  onClick={() => setOpenMenu((cur) => (cur === menu.id ? null : menu.id))}
                >
                  {menu.label}
                  <Icon name="chevronDown" size={15} />
                </button>
                <div className={`nav__panel ${openMenu === menu.id ? 'is-open' : ''}`}>
                  <div className="nav__panel-grid">
                    {menu.items.map((item) => (
                      <Link key={item.to} to={item.to} className="nav__panel-link">
                        <span className="nav__panel-icon">
                          <Icon name={item.icon} size={17} />
                        </span>
                        <span>
                          <strong>{item.title}</strong>
                          <small>{item.desc}</small>
                        </span>
                      </Link>
                    ))}
                  </div>
                  <div className="nav__panel-foot">
                    <span>Not sure where to start?</span>
                    <Link to="/builder/new">Build a resume in 8 minutes <Icon name="arrowRight" size={14} /></Link>
                  </div>
                </div>
              </div>
            ))}
            <NavLink to="/pricing" className={({ isActive }) => `nav__link ${isActive ? 'is-active' : ''}`}>
              Pricing
            </NavLink>
            <NavLink
              to="/career-center"
              className={({ isActive }) => `nav__link ${isActive ? 'is-active' : ''}`}
            >
              Career center
            </NavLink>
          </nav>

          <div className="nav__actions">
            {user ? (
              <>
                <Link to="/dashboard" className="nav__account">
                  <span className="avatar avatar--sm">{initials}</span>
                  <span className="nav__account-name">{user.name.split(' ')[0]}</span>
                </Link>
                <button type="button" className="nav__logout" onClick={logout} aria-label="Sign out">
                  <Icon name="logout" size={17} />
                </button>
              </>
            ) : (
              <Link to="/login" className="nav__login">
                Log in
              </Link>
            )}
            <Link to={user ? '/dashboard' : '/builder/new'} className="btn btn--primary btn--sm nav__cta">
              {user ? 'My resumes' : 'Build my resume'}
            </Link>
            <button
              type="button"
              className="nav__burger"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
            >
              <Icon name={mobileOpen ? 'close' : 'menu'} size={22} />
            </button>
          </div>
        </div>
      </header>

      <div className={`mobile-menu ${mobileOpen ? 'is-open' : ''}`}>
        <div className="mobile-menu__scroll">
          {menus.map((menu) => (
            <div key={menu.id} className="mobile-menu__group">
              <p className="mobile-menu__label">{menu.label}</p>
              {menu.items.map((item) => (
                <Link key={item.to} to={item.to} className="mobile-menu__link">
                  <Icon name={item.icon} size={18} />
                  <span>{item.title}</span>
                  <Icon name="chevronRight" size={16} className="mobile-menu__chev" />
                </Link>
              ))}
            </div>
          ))}
          <div className="mobile-menu__group">
            <p className="mobile-menu__label">More</p>
            <Link to="/pricing" className="mobile-menu__link">
              <Icon name="sparkle" size={18} />
              <span>Pricing</span>
            </Link>
            <Link to="/career-center" className="mobile-menu__link">
              <Icon name="edit" size={18} />
              <span>Career center</span>
            </Link>
          </div>
          <div className="mobile-menu__actions">
            {user ? (
              <>
                <Link to="/dashboard" className="btn btn--primary btn--block">
                  My resumes
                </Link>
                <button
                  type="button"
                  className="btn btn--outline btn--block"
                  onClick={() => {
                    logout()
                    setMobileOpen(false)
                    navigate('/')
                  }}
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link to="/signup" className="btn btn--primary btn--block">
                  Create free account
                </Link>
                <Link to="/login" className="btn btn--outline btn--block">
                  Log in
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

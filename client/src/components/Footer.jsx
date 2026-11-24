import { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo.jsx'
import Icon from './Icon.jsx'
import { footerLinks } from '../data/site.js'
import { useToast } from '../lib/toast.jsx'

export default function Footer() {
  const [email, setEmail] = useState('')
  const toast = useToast()

  const subscribe = (e) => {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      toast('Enter a valid email address.', 'error')
      return
    }
    toast('You are on the list. Look out for the next issue.', 'success')
    setEmail('')
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <Logo tone="light" />
            <p>
              A calmer way to build a resume. Clear templates, honest writing prompts, and an ATS check
              that tells you the truth.
            </p>
            <form className="footer__news" onSubmit={subscribe}>
              <label htmlFor="footer-email">One useful career email, twice a month.</label>
              <div className="footer__news-row">
                <input
                  id="footer-email"
                  type="email"
                  placeholder="you@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit" className="btn btn--light btn--sm">
                  Subscribe
                </button>
              </div>
            </form>
          </div>

          <div className="footer__cols">
            {footerLinks.map((col) => (
              <div key={col.title} className="footer__col">
                <h3>{col.title}</h3>
                <ul>
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link to={link.to}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="footer__col">
              <h3>Follow</h3>
              <ul>
                <li>
                  <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                    LinkedIn <Icon name="external" size={12} />
                  </a>
                </li>
                <li>
                  <a href="https://x.com" target="_blank" rel="noreferrer">
                    X / Twitter <Icon name="external" size={12} />
                  </a>
                </li>
                <li>
                  <a href="https://instagram.com" target="_blank" rel="noreferrer">
                    Instagram <Icon name="external" size={12} />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer__rating">
          <div className="footer__stars" aria-hidden="true">
            {[0, 1, 2, 3, 4].map((i) => (
              <Icon key={i} name="star" size={15} />
            ))}
          </div>
          <p>
            <strong>4.8 / 5</strong> from 12,400 reviews · 2.4M resumes built
          </p>
        </div>

        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} Resumate. Built for people who would rather be working.</p>
          <div className="footer__legal">
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
            <Link to="/contact">Support</Link>
            <span className="footer__status">
              <span className="dot dot--live" /> All systems normal
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

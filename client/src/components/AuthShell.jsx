import { Link } from 'react-router-dom'
import Logo from './Logo.jsx'
import Icon from './Icon.jsx'
import ResumeSheet from './ResumeSheet.jsx'
import { sampleResume } from '../data/resume.js'

export default function AuthShell({ title, subtitle, children, footer, quote, author, role }) {
  return (
    <div className="auth">
      <div className="auth__panel">
        <div className="auth__top">
          <Logo />
          <Link to="/" className="auth__back">
            Back to site <Icon name="arrowRight" size={14} />
          </Link>
        </div>

        <div className="auth__form-wrap">
          <div className="auth__head">
            <h1>{title}</h1>
            {subtitle && <p>{subtitle}</p>}
          </div>
          {children}
          {footer && <div className="auth__foot">{footer}</div>}
        </div>

        <p className="auth__legal">
          By continuing you agree to our <Link to="/terms">Terms</Link> and{' '}
          <Link to="/privacy">Privacy Policy</Link>.
        </p>
      </div>

      <aside className="auth__aside">
        <div className="auth__aside-inner">
          <div className="auth__quote">
            <Icon name="quote" size={26} />
            <p>{quote || 'It feels like a design tool rather than a form. I changed the template and the whole thing finally looked like something I would hire.'}</p>
            <div className="auth__person">
              <span className="avatar avatar--soft">{author ? author.split(' ').map((n) => n[0]).join('') : 'TL'}</span>
              <div>
                <strong>{author || 'Theo Laurent'}</strong>
                <span>{role || 'Product Designer, hired at Lumen'}</span>
              </div>
            </div>
          </div>

          <div className="auth__sheet">
            <ResumeSheet resume={sampleResume} />
          </div>

          <ul className="auth__points">
            <li><Icon name="check" size={14} /> Free PDF export, no watermark</li>
            <li><Icon name="check" size={14} /> All 8 templates included</li>
            <li><Icon name="check" size={14} /> Your data is never sold</li>
          </ul>
        </div>
      </aside>
    </div>
  )
}

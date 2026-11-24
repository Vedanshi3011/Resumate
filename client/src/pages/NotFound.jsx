import { Link } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import ResumeSheet from '../components/ResumeSheet.jsx'
import { sampleResume } from '../data/resume.js'

export default function NotFound() {
  return (
    <section className="notfound">
      <div className="container notfound__inner">
        <div className="notfound__copy">
          <p className="eyebrow">404</p>
          <h1>This page was not in the final draft.</h1>
          <p className="lede">
            The link may be old, or the page may have moved. The builder is still where you left it.
          </p>
          <div className="notfound__actions">
            <Link to="/" className="btn btn--primary">Back home <Icon name="arrowRight" size={16} /></Link>
            <Link to="/builder/new" className="btn btn--outline">Open the builder</Link>
          </div>
          <div className="notfound__links">
            <Link to="/templates">Templates</Link>
            <Link to="/examples">Examples</Link>
            <Link to="/ats-checker">ATS checker</Link>
            <Link to="/career-center">Career center</Link>
          </div>
        </div>
        <div className="notfound__art" aria-hidden="true">
          <div className="notfound__sheet">
            <ResumeSheet resume={sampleResume} />
          </div>
          <span className="notfound__stamp">Page not found</span>
        </div>
      </div>
    </section>
  )
}

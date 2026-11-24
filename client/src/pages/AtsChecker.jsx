import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader.jsx'
import ScoreRing from '../components/ScoreRing.jsx'
import Icon from '../components/Icon.jsx'
import { api } from '../lib/api.js'
import { resumeToText } from '../lib/resumeText.js'
import { sampleResume } from '../data/resume.js'

const SAMPLE_JD = `Senior Product Designer

We are looking for a senior product designer to lead end-to-end design for our patient-facing products. You will partner with product and engineering, run user research, and maintain our design system.

Requirements:
- 5+ years of product design experience
- Strong Figma and prototyping skills
- Experience with user research and usability testing
- Accessibility knowledge (WCAG)
- Comfortable working with engineers and shipping iteratively`

const scoring = [
  { label: 'Contact details', points: '10 pts', text: 'Email and phone a parser can find in the text layer.' },
  { label: 'Core sections', points: '20 pts', text: 'Experience, education, skills and a profile heading.' },
  { label: 'Length & density', points: '10 pts', text: 'Roughly 350–700 words, without cramming.' },
  { label: 'Action verbs', points: '15 pts', text: 'Bullets that start with a decision, not a duty.' },
  { label: 'Quantified impact', points: '15 pts', text: 'Numbers that make the result concrete.' },
  { label: 'Readability', points: '10 pts', text: 'Short bullets, no filler phrases.' },
  { label: 'Role keywords', points: '20 pts', text: 'The vocabulary of the job description.' },
]

function Report({ report }) {
  const tone = report.score >= 85 ? 'great' : report.score >= 70 ? 'good' : report.score >= 55 ? 'warn' : 'bad'

  return (
    <div className="report" id="report">
      <div className={`report__hero report__hero--${tone}`}>
        <ScoreRing value={report.score} size={138} stroke={10} />
        <div className="report__hero-copy">
          <span className={`badge ${tone === 'great' ? 'badge--mint' : tone === 'bad' ? 'badge--coral' : ''}`}>
            {report.grade}
          </span>
          <h2>Your resume scores {report.score} out of 100.</h2>
          <p>
            {report.score >= 85
              ? 'This is in the top band. Tighten the last few lines and send it.'
              : report.score >= 70
                ? 'A solid foundation. The fixes below are mostly phrasing and keyword work.'
                : report.score >= 55
                  ? 'The structure is there, but a parser and a skimming recruiter will both miss things.'
                  : 'This needs a structural pass before you apply. Start with the high-priority items.'}
          </p>
          <div className="report__stats">
            <span><strong>{report.wordCount}</strong> words</span>
            <span><strong>{report.actionVerbs.length}</strong> action verbs</span>
            <span><strong>{report.metrics.length}</strong> metrics</span>
          </div>
        </div>
      </div>

      <div className="report__grid">
        <section className="card report__panel">
          <h3>Score breakdown</h3>
          <ul className="bars">
            {report.breakdown.map((item) => (
              <li key={item.label}>
                <div className="bars__head">
                  <span>{item.label}</span>
                  <span>{item.score} / {item.max}</span>
                </div>
                <div className="bars__track">
                  <div className="bars__fill" style={{ width: `${(item.score / item.max) * 100}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="card report__panel">
          <h3>What to fix, in order</h3>
          {report.issues.length ? (
            <ul className="issues">
              {report.issues.map((issue, i) => (
                <li key={i} className={`issues__item issues__item--${issue.severity}`}>
                  <span className="issues__dot" />
                  <div>
                    <span className="issues__severity">
                      {issue.severity === 'high' ? 'Fix first' : issue.severity === 'medium' ? 'Worth fixing' : 'Nice to have'}
                    </span>
                    <p>{issue.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="muted">No issues found. Your resume is in good shape.</p>
          )}
          {report.wins.length > 0 && (
            <ul className="wins">
              {report.wins.map((win, i) => (
                <li key={i}><Icon name="checkCircle" size={15} /> {win}</li>
              ))}
            </ul>
          )}
        </section>
      </div>

      {(report.matchedKeywords.length > 0 || report.missingKeywords.length > 0) && (
        <section className="card report__panel report__keywords">
          <h3>Keyword match</h3>
          <div className="keyword-cols">
            <div>
              <h4><Icon name="checkCircle" size={15} /> Found in your resume</h4>
              <div className="tag-cloud">
                {report.matchedKeywords.map((k) => <span key={k} className="tag tag--good">{k}</span>)}
                {!report.matchedKeywords.length && <p className="muted small">Nothing matched yet.</p>}
              </div>
            </div>
            <div>
              <h4><Icon name="alert" size={15} /> Missing from your resume</h4>
              <div className="tag-cloud">
                {report.missingKeywords.map((k) => <span key={k} className="tag tag--warn">{k}</span>)}
                {!report.missingKeywords.length && <p className="muted small">No gaps. Nice.</p>}
              </div>
            </div>
          </div>
        </section>
      )}

      <div className="report__cta">
        <div>
          <h3>Want us to fix the structure for you?</h3>
          <p>Start from a template that already scores well, then paste your content in.</p>
        </div>
        <div className="report__cta-actions">
          <Link to="/templates" className="btn btn--outline">Browse templates</Link>
          <Link to="/builder/new" className="btn btn--primary">
            Open the builder <Icon name="arrowRight" size={16} />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function AtsChecker() {
  const [text, setText] = useState('')
  const [jd, setJd] = useState('')
  const [report, setReport] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const run = async (e) => {
    e?.preventDefault()
    setError('')
    if (text.trim().split(/\s+/).length < 40) {
      setError('Paste at least a few lines of your resume — around 40 words — so there is something to scan.')
      return
    }
    setLoading(true)
    try {
      const data = await api.checkAts({ text, jobDescription: jd })
      setReport(data.report)
      setTimeout(() => {
        document.getElementById('report')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 120)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const loadSample = () => {
    setText(resumeToText(sampleResume))
    setJd(SAMPLE_JD)
    setReport(null)
    setError('')
  }

  return (
    <>
      <PageHeader
        eyebrow="ATS checker"
        title={<>See what the parser <em>actually sees.</em></>}
        lede="Paste your resume text and a job description. We score the parts that matter, flag the lines that hurt, and show you the keywords you are missing."
      />

      <section className="section section--tight">
        <div className="container ats-layout">
          <form className="card ats-form" onSubmit={run}>
            <div className="ats-form__head">
              <div>
                <h2>Your resume</h2>
                <p>Copy the text from your PDF or Word file. Formatting is not needed.</p>
              </div>
              <button type="button" className="btn btn--quiet btn--sm" onClick={loadSample}>
                Load a sample
              </button>
            </div>

            <div className="field">
              <label htmlFor="ats-text">Resume text</label>
              <textarea
                id="ats-text"
                className="textarea"
                rows={12}
                placeholder="Maya Chen&#10;Senior Product Designer&#10;maya.chen@hey.com · (415) 555-0142 · San Francisco, CA&#10;&#10;EXPERIENCE&#10;Senior Product Designer — Lumen Health&#10;Led the redesign of…"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <span className="field__hint">{text.trim() ? `${text.trim().split(/\s+/).length} words` : 'Plain text works best'}</span>
            </div>

            <div className="field">
              <label htmlFor="ats-jd">Job description <span className="field__optional">optional, but worth it</span></label>
              <textarea
                id="ats-jd"
                className="textarea ats-form__jd"
                rows={5}
                placeholder="Paste the job post here to score keyword relevance — it is 20% of the report."
                value={jd}
                onChange={(e) => setJd(e.target.value)}
              />
            </div>

            {error && (
              <div className="form-error" role="alert">
                <Icon name="alert" size={15} /> {error}
              </div>
            )}

            <div className="ats-form__actions">
              <button type="submit" className="btn btn--primary btn--lg" disabled={loading}>
                {loading ? <><span className="spinner spinner--light" /> Scanning…</> : <>Scan my resume <Icon name="search" size={16} /></>}
              </button>
              <span className="ats-form__privacy"><Icon name="lock" size={13} /> Nothing is stored.</span>
            </div>
          </form>

          <aside className="ats-aside">
            <div className="card ats-aside__card">
              <h3>How the score is built</h3>
              <ul className="scoring-list">
                {scoring.map((item) => (
                  <li key={item.label}>
                    <span>{item.label}</span>
                    <em>{item.points}</em>
                    <p>{item.text}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="ats-aside__note">
              <Icon name="info" size={16} />
              <p>
                This is a readability and parsing check, not a guarantee. A human still decides —
                the goal is to remove avoidable reasons to say no.
              </p>
            </div>
          </aside>
        </div>
      </section>

      {report && (
        <section className="section section--lilac section--tight" aria-live="polite">
          <div className="container">
            <Report report={report} />
          </div>
        </section>
      )}

      <section className="section section--tight">
        <div className="container ats-bottom">
          <div>
            <p className="eyebrow">Before you send</p>
            <h2 className="h2">Three checks that take five minutes.</h2>
          </div>
          <ol className="ats-checks">
            <li>
              <span>01</span>
              <div>
                <h3>Paste into plain text</h3>
                <p>If the order still makes sense, most parsers will read it correctly.</p>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                <h3>Read it out loud</h3>
                <p>Anything you stumble on is a line a recruiter will skim past.</p>
              </div>
            </li>
            <li>
              <span>03</span>
              <div>
                <h3>Match the job’s words</h3>
                <p>Use the employer’s vocabulary where it is honest, not where it is not.</p>
              </div>
            </li>
          </ol>
        </div>
      </section>
    </>
  )
}

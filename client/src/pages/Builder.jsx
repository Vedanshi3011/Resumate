import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import Logo from '../components/Logo.jsx'
import Icon from '../components/Icon.jsx'
import Modal from '../components/Modal.jsx'
import ScoreRing from '../components/ScoreRing.jsx'
import { useAuth } from '../lib/auth.jsx'
import { useToast } from '../lib/toast.jsx'
import { api } from '../lib/api.js'
import { resumeToText } from '../lib/resumeText.js'
import { emptyResume } from '../data/resume.js'
import { templateById } from '../data/templates.js'
import StepPersonal from '../builder/StepPersonal.jsx'
import StepExperience from '../builder/StepExperience.jsx'
import StepEducation from '../builder/StepEducation.jsx'
import StepSkills from '../builder/StepSkills.jsx'
import StepSummary from '../builder/StepSummary.jsx'
import StepDesign from '../builder/StepDesign.jsx'
import Preview from '../builder/Preview.jsx'

const STEPS = [
  { key: 'personal', label: 'Personal', icon: 'user' },
  { key: 'experience', label: 'Experience', icon: 'briefcase' },
  { key: 'education', label: 'Education', icon: 'graduation' },
  { key: 'skills', label: 'Skills', icon: 'zap' },
  { key: 'summary', label: 'Summary', icon: 'file' },
  { key: 'design', label: 'Design', icon: 'palette' },
]

function normalizeResume(input) {
  const base = emptyResume()
  const resume = input || {}
  return {
    ...base,
    ...resume,
    theme: { ...base.theme, ...(resume.theme || {}) },
    data: {
      ...base.data,
      ...(resume.data || {}),
      personal: { ...base.data.personal, ...(resume.data?.personal || {}) },
      experience: resume.data?.experience || [],
      education: resume.data?.education || [],
      skills: resume.data?.skills || [],
      projects: resume.data?.projects || [],
      certifications: resume.data?.certifications || [],
    },
  }
}

function stepComplete(resume, index) {
  const d = resume.data
  const p = d.personal
  if (index === 0) return Boolean(p.fullName && p.role && p.email)
  if (index === 1) return d.experience.some((e) => e.role && (e.company || e.bullets?.some((b) => b.trim())))
  if (index === 2) return d.education.some((e) => e.degree && e.school)
  if (index === 3) return d.skills.length >= 4
  if (index === 4) return d.summary.trim().length > 50
  return true
}

export default function Builder() {
  const { id } = useParams()
  const { user } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()
  const location = useLocation()

  const [resume, setResume] = useState(null)
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')
  const [saveState, setSaveState] = useState('saved')
  const [step, setStep] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [mobileView, setMobileView] = useState('edit')
  const [report, setReport] = useState(null)
  const [scoreOpen, setScoreOpen] = useState(false)
  const [scoreLoading, setScoreLoading] = useState(false)

  const savedRef = useRef(null)
  const userRef = useRef(user)
  const formRef = useRef(null)

  useEffect(() => {
    userRef.current = user
  }, [user])

  useEffect(() => {
    let alive = true
    setStatus('loading')
    setError('')

    const load = async () => {
      try {
        if (id === 'new') {
          const params = new URLSearchParams(window.location.search)
          const templateParam = params.get('template')
          const fresh = params.get('fresh')
          let base = location.state?.prefill
            ? JSON.parse(JSON.stringify(location.state.prefill))
            : null

          if (!base) {
            const prefillRaw = sessionStorage.getItem('resumate.prefill')
            if (prefillRaw) {
              try {
                base = JSON.parse(prefillRaw)
              } catch {
                base = null
              }
              sessionStorage.removeItem('resumate.prefill')
            }
          }

          if (!base && !templateParam && !fresh) {
            const stored = localStorage.getItem('resumate.guestDraft')
            if (stored) {
              try {
                base = JSON.parse(stored)
              } catch {
                base = null
              }
            }
          }

          if (!base) base = emptyResume()

          if (templateParam) {
            const template = templateById(templateParam)
            base = {
              ...base,
              template: template.id,
              theme: { ...base.theme, color: template.color, font: template.font },
            }
          }

          const normalized = normalizeResume(base)
          if (!alive) return
          setResume(normalized)
          savedRef.current = JSON.stringify(normalized)
          setSaveState(userRef.current ? 'saved' : 'local')
          setStatus('ready')
          return
        }

        if (!userRef.current) {
          if (alive) setStatus('needsAuth')
          return
        }

        const { resume: loaded } = await api.getResume(id)
        if (!alive) return
        const normalized = normalizeResume(loaded)
        setResume(normalized)
        savedRef.current = JSON.stringify(normalized)
        setSaveState('saved')
        setStatus('ready')
      } catch (err) {
        if (!alive) return
        setError(err.message)
        setStatus('error')
      }
    }

    load()
    return () => {
      alive = false
    }
  }, [id])

  useEffect(() => {
    if (status !== 'ready' || !resume) return
    const snapshot = JSON.stringify(resume)
    if (snapshot === savedRef.current) return

    setSaveState(user ? 'saving' : 'saving')
    const timer = setTimeout(async () => {
      try {
        if (user) {
          if (id === 'new') {
            const { resume: created } = await api.createResume({
              title: resume.title,
              template: resume.template,
              theme: resume.theme,
              data: resume.data,
            })
            savedRef.current = snapshot
            localStorage.removeItem('resumate.guestDraft')
            setSaveState('saved')
            navigate(`/builder/${created._id}`, { replace: true })
          } else {
            await api.updateResume(id, {
              title: resume.title,
              template: resume.template,
              theme: resume.theme,
              data: resume.data,
              calculateScore: true,
            })
            savedRef.current = snapshot
            setSaveState('saved')
          }
        } else {
          localStorage.setItem('resumate.guestDraft', JSON.stringify(resume))
          savedRef.current = snapshot
          setSaveState('local')
        }
      } catch (err) {
        setSaveState('error')
      }
    }, 1100)

    return () => clearTimeout(timer)
  }, [resume, status, user, id, navigate])

  const completion = useMemo(() => {
    if (!resume) return 0
    const done = STEPS.filter((_, i) => stepComplete(resume, i)).length
    return Math.round((done / STEPS.length) * 100)
  }, [resume])

  if (status === 'loading') {
    return (
      <div className="builder-loading">
        <span className="spinner" />
        <p>Opening your editor…</p>
      </div>
    )
  }

  if (status === 'needsAuth') {
    return (
      <div className="builder-missing">
        <Logo />
        <h1>Sign in to open this resume.</h1>
        <p>Saved resumes live in your account. The demo draft is free to edit without one.</p>
        <div className="row gap-12 wrap">
          <Link to={`/login?next=${encodeURIComponent(`/builder/${id}`)}`} className="btn btn--primary">Log in</Link>
          <Link to="/builder/new" className="btn btn--outline">Start a new draft</Link>
        </div>
      </div>
    )
  }

  if (status === 'error' || !resume) {
    return (
      <div className="builder-missing">
        <Logo />
        <h1>We could not open that resume.</h1>
        <p>{error || 'The link may be old, or the resume was deleted.'}</p>
        <div className="row gap-12 wrap">
          <Link to="/dashboard" className="btn btn--primary">Back to dashboard</Link>
          <Link to="/builder/new" className="btn btn--outline">Start a new draft</Link>
        </div>
      </div>
    )
  }

  const updatePersonal = (changes) =>
    setResume((r) => ({ ...r, data: { ...r.data, personal: { ...r.data.personal, ...changes } } }))

  const updateData = (changes) =>
    setResume((r) => ({ ...r, data: { ...r.data, ...changes } }))

  const updateTheme = (changes) =>
    setResume((r) => ({ ...r, theme: { ...r.theme, ...changes } }))

  const selectTemplate = (template) =>
    setResume((r) => ({
      ...r,
      template: template.id,
      theme: { ...r.theme, color: template.color, font: template.font },
    }))

  const goTo = (index) => {
    setStep(index)
    formRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const print = () => {
    toast('Choose “Save as PDF” in the print dialog.', 'default')
    setTimeout(() => window.print(), 200)
  }

  const checkScore = async () => {
    if (!resume.data.personal.fullName) {
      toast('Add your name first so the scan has something to read.', 'error')
      return
    }
    setScoreLoading(true)
    try {
      const data = await api.checkAts({ text: resumeToText(resume) })
      setReport(data.report)
      setScoreOpen(true)
    } catch (err) {
      toast(err.message, 'error')
    } finally {
      setScoreLoading(false)
    }
  }

  const saveLabel =
    saveState === 'saving'
      ? 'Saving…'
      : saveState === 'error'
        ? 'Not saved — retrying'
        : saveState === 'local'
          ? 'Saved in this browser'
          : 'All changes saved'

  const initials = user?.name
    ? user.name.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase()
    : 'G'

  return (
    <div className="builder">
      <header className="builder-top">
        <div className="builder-top__left">
          <Link to={user ? '/dashboard' : '/'} className="builder-top__back" aria-label="Leave the builder">
            <Icon name="arrowLeft" size={18} />
          </Link>
          <Logo compact />
          <span className="builder-top__divider" />
          <input
            className="builder-top__title"
            value={resume.title}
            onChange={(e) => setResume((r) => ({ ...r, title: e.target.value }))}
            aria-label="Resume title"
            placeholder="Untitled resume"
          />
        </div>

        <div className="builder-top__right">
          <span className={`save-state save-state--${saveState}`} title={saveLabel}>
            <i />
            <span className="save-state__text">{saveLabel}</span>
          </span>

          <button type="button" className="btn btn--outline btn--sm" onClick={checkScore} disabled={scoreLoading}>
            {scoreLoading ? <span className="spinner" /> : <Icon name="shield" size={15} />}
            <span className="builder-top__score-text">{report ? report.score : 'ATS score'}</span>
          </button>

          <button type="button" className="btn btn--primary btn--sm" onClick={print}>
            <Icon name="download" size={15} />
            <span className="builder-top__pdf-text">Download PDF</span>
          </button>

          <Link to={user ? '/dashboard' : '/signup'} className="avatar avatar--sm builder-top__avatar" aria-label="Account">
            {initials}
          </Link>
        </div>
      </header>

      <div className="builder__mobile-tabs">
        <button
          type="button"
          className={mobileView === 'edit' ? 'is-active' : ''}
          onClick={() => setMobileView('edit')}
        >
          <Icon name="edit" size={15} /> Edit
        </button>
        <button
          type="button"
          className={mobileView === 'preview' ? 'is-active' : ''}
          onClick={() => setMobileView('preview')}
        >
          <Icon name="eye" size={15} /> Preview
        </button>
      </div>

      <div className="builder__body">
        <section className={`builder__editor ${mobileView === 'preview' ? 'is-hidden-mobile' : ''}`}>
          {!user && (
            <div className="guest-bar">
              <Icon name="info" size={15} />
              <p>Editing as a guest. Your draft stays in this browser.</p>
              <Link to="/signup" className="link-arrow">
                Sign up to sync <Icon name="arrowRight" size={13} />
              </Link>
            </div>
          )}

          <nav className="steps-nav" aria-label="Resume sections">
            {STEPS.map((s, i) => {
              const done = stepComplete(resume, i)
              return (
                <button
                  key={s.key}
                  type="button"
                  className={`steps-nav__item ${i === step ? 'is-active' : ''} ${done ? 'is-done' : ''}`}
                  onClick={() => goTo(i)}
                  aria-current={i === step ? 'step' : undefined}
                >
                  <span className="steps-nav__num">
                    {done ? <Icon name="check" size={12} /> : String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="steps-nav__label">{s.label}</span>
                </button>
              )
            })}
          </nav>

          <div className="builder__form" ref={formRef}>
            {step === 0 && <StepPersonal personal={resume.data.personal} patch={updatePersonal} />}
            {step === 1 && (
              <StepExperience
                experience={resume.data.experience}
                projects={resume.data.projects}
                patch={updateData}
              />
            )}
            {step === 2 && <StepEducation education={resume.data.education} patch={updateData} />}
            {step === 3 && (
              <StepSkills
                skills={resume.data.skills}
                certifications={resume.data.certifications}
                patch={updateData}
              />
            )}
            {step === 4 && <StepSummary summary={resume.data.summary} patch={updateData} />}
            {step === 5 && (
              <StepDesign
                resume={resume}
                selectTemplate={selectTemplate}
                updateTheme={updateTheme}
              />
            )}

          </div>

          <footer className="builder-foot">
            <button
              type="button"
              className="btn btn--ghost btn--sm"
              onClick={() => goTo(Math.max(0, step - 1))}
              disabled={step === 0}
            >
              <Icon name="arrowLeft" size={15} /> Back
            </button>

            <div className="builder-foot__mid">
              <span>Step {step + 1} of {STEPS.length}</span>
              <div className="builder-foot__bar">
                <i style={{ width: `${completion}%` }} />
              </div>
              <span>{completion}% complete</span>
            </div>

            {step < STEPS.length - 1 ? (
              <button type="button" className="btn btn--primary btn--sm" onClick={() => goTo(step + 1)}>
                Next: {STEPS[step + 1].label} <Icon name="arrowRight" size={15} />
              </button>
            ) : (
              <button type="button" className="btn btn--primary btn--sm" onClick={print}>
                <Icon name="download" size={15} /> Download PDF
              </button>
            )}
          </footer>
        </section>

        <div className={`builder__preview ${mobileView === 'edit' ? 'is-hidden-mobile' : ''}`}>
          <Preview
            resume={resume}
            zoom={zoom}
            setZoom={setZoom}
            updateTheme={updateTheme}
            selectTemplate={selectTemplate}
            onPrint={print}
          />
        </div>
      </div>

      <Modal
        open={scoreOpen}
        onClose={() => setScoreOpen(false)}
        title="Resume score"
        size="md"
        footer={
          <>
            <button type="button" className="btn btn--ghost" onClick={() => setScoreOpen(false)}>Close</button>
            <Link to="/ats-checker" className="btn btn--outline">Full report</Link>
            <button type="button" className="btn btn--primary" onClick={() => { setScoreOpen(false); goTo(1) }}>
              Fix my bullets
            </button>
          </>
        }
      >
        {report && (
          <div className="builder-score">
            <div className="builder-score__top">
              <ScoreRing value={report.score} size={104} stroke={8} />
              <div>
                <span className="badge">{report.grade}</span>
                <h3>{report.score} / 100</h3>
                <p>{report.wordCount} words · {report.actionVerbs.length} action verbs · {report.metrics.length} metrics</p>
              </div>
            </div>

            <ul className="builder-score__bars">
              {report.breakdown.map((item) => (
                <li key={item.label}>
                  <span>{item.label}</span>
                  <div className="bars__track"><div className="bars__fill" style={{ width: `${(item.score / item.max) * 100}%` }} /></div>
                  <em>{item.score}/{item.max}</em>
                </li>
              ))}
            </ul>

            {report.issues.length > 0 && (
              <div className="builder-score__issues">
                <h4>Top fixes</h4>
                <ul>
                  {report.issues.slice(0, 3).map((issue, i) => (
                    <li key={i} className={`issues__item issues__item--${issue.severity}`}>
                      <span className="issues__dot" />
                      <p>{issue.text}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  )
}

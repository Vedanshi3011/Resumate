import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ResumeSheet from '../components/ResumeSheet.jsx'
import ScoreRing from '../components/ScoreRing.jsx'
import Icon from '../components/Icon.jsx'
import Modal from '../components/Modal.jsx'
import { useAuth } from '../lib/auth.jsx'
import { useToast } from '../lib/toast.jsx'
import { api } from '../lib/api.js'
import { formatDate } from '../lib/resumeText.js'
import { templateById } from '../data/templates.js'
import { cloneResume, sampleResume } from '../data/resume.js'

function greeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
}

export default function Dashboard() {
  const { user } = useAuth()
  const toast = useToast()
  const [resumes, setResumes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [confirm, setConfirm] = useState(null)
  const [busy, setBusy] = useState(null)

  const load = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await api.listResumes()
      setResumes(data.resumes || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const duplicate = async (resume) => {
    setBusy(resume._id)
    try {
      const { resume: copy } = await api.duplicateResume(resume._id)
      setResumes((list) => [copy, ...list])
      toast('Resume duplicated.', 'success')
    } catch (err) {
      toast(err.message, 'error')
    } finally {
      setBusy(null)
    }
  }

  const remove = async () => {
    if (!confirm) return
    setBusy(confirm._id)
    try {
      await api.deleteResume(confirm._id)
      setResumes((list) => list.filter((r) => r._id !== confirm._id))
      toast('Resume deleted.')
      setConfirm(null)
    } catch (err) {
      toast(err.message, 'error')
    } finally {
      setBusy(null)
    }
  }

  const scored = resumes.filter((r) => r.atsScore > 0)
  const average = scored.length
    ? Math.round(scored.reduce((sum, r) => sum + r.atsScore, 0) / scored.length)
    : 0
  const best = scored.length ? Math.max(...scored.map((r) => r.atsScore)) : 0
  const firstName = user?.name?.split(' ')[0] || 'there'

  return (
    <div className="dashboard">
      <div className="container">
        <header className="dash-head">
          <div>
            <p className="eyebrow">Your workspace</p>
            <h1>{greeting()}, {firstName}.</h1>
            <p className="lede">
              {resumes.length
                ? `You have ${resumes.length} resume${resumes.length > 1 ? 's' : ''} here. Pick up where you left off.`
                : 'Start with a template, or open a blank page and write.'}
            </p>
          </div>
          <div className="dash-head__actions">
            <Link to="/ats-checker" className="btn btn--outline">
              <Icon name="shield" size={16} /> ATS check
            </Link>
            <Link to="/builder/new" className="btn btn--primary">
              <Icon name="plus" size={16} /> New resume
            </Link>
          </div>
        </header>

        <div className="dash-stats">
          <div className="dash-stat">
            <span>Resumes</span>
            <strong>{resumes.length}</strong>
            <em>of 30 on your plan</em>
          </div>
          <div className="dash-stat">
            <span>Average score</span>
            <strong>{average || '—'}</strong>
            <em>{scored.length ? 'across scored resumes' : 'run a check to see'}</em>
          </div>
          <div className="dash-stat">
            <span>Best score</span>
            <strong>{best || '—'}</strong>
            <em>out of 100</em>
          </div>
          <div className="dash-stat dash-stat--cta">
            <ScoreRing value={average || 0} size={54} stroke={5} />
            <div>
              <span>Next step</span>
              <Link to="/ats-checker" className="link-arrow">
                Tighten your score <Icon name="arrowRight" size={13} />
              </Link>
            </div>
          </div>
        </div>

        {error && (
          <div className="form-error dash-error" role="alert">
            <Icon name="alert" size={15} /> {error}
            <button type="button" className="link-arrow" onClick={load}>Try again</button>
          </div>
        )}

        {loading ? (
          <div className="resume-grid">
            {[0, 1, 2].map((i) => (
              <div key={i} className="resume-skeleton">
                <div className="resume-skeleton__sheet" />
                <div className="resume-skeleton__line" />
                <div className="resume-skeleton__line resume-skeleton__line--short" />
              </div>
            ))}
          </div>
        ) : resumes.length ? (
          <div className="resume-grid">
            {resumes.map((resume) => (
              <article className="resume-card" key={resume._id}>
                <Link to={`/builder/${resume._id}`} className="resume-card__preview" aria-label={`Open ${resume.title}`}>
                  <div className="resume-card__sheet">
                    <ResumeSheet resume={resume} />
                  </div>
                  <span className="resume-card__open">
                    <Icon name="edit" size={15} /> Open editor
                  </span>
                </Link>
                <div className="resume-card__body">
                  <div className="resume-card__title-row">
                    <div>
                      <h2>{resume.title || 'Untitled resume'}</h2>
                      <p>
                        {templateById(resume.template).name} · Edited {formatDate(resume.updatedAt)}
                      </p>
                    </div>
                    {resume.atsScore > 0 ? (
                      <span className={`score-chip ${resume.atsScore >= 80 ? 'score-chip--good' : resume.atsScore >= 60 ? 'score-chip--ok' : 'score-chip--low'}`}>
                        {resume.atsScore}
                      </span>
                    ) : (
                      <span className="badge">Draft</span>
                    )}
                  </div>
                  <div className="resume-card__actions">
                    <Link to={`/builder/${resume._id}`} className="btn btn--quiet btn--sm">
                      Edit
                    </Link>
                    <button
                      type="button"
                      className="btn btn--outline btn--sm"
                      onClick={() => duplicate(resume)}
                      disabled={busy === resume._id}
                    >
                      <Icon name="copy" size={14} /> Duplicate
                    </button>
                    <button
                      type="button"
                      className="icon-btn icon-btn--danger"
                      onClick={() => setConfirm(resume)}
                      aria-label={`Delete ${resume.title}`}
                    >
                      <Icon name="trash" size={16} />
                    </button>
                  </div>
                </div>
              </article>
            ))}

            <Link to="/builder/new" className="resume-new">
              <span className="resume-new__icon"><Icon name="plus" size={22} /></span>
              <strong>Start another resume</strong>
              <span>Blank page or template</span>
            </Link>
          </div>
        ) : (
          <div className="dash-empty">
            <div className="dash-empty__art">
              <div className="dash-empty__sheet">
                <ResumeSheet resume={cloneResume(sampleResume)} />
              </div>
            </div>
            <div className="dash-empty__copy">
              <h2>No resumes yet. That is the easy part.</h2>
              <p>
                Pick a template and the editor will walk you through the sections recruiters look for.
                It takes about eight minutes to a first draft.
              </p>
              <div className="dash-empty__actions">
                <Link to="/builder/new" className="btn btn--primary btn--lg">
                  Create my first resume <Icon name="arrowRight" size={16} />
                </Link>
                <Link to="/examples" className="btn btn--ghost btn--lg">Browse examples</Link>
              </div>
            </div>
          </div>
        )}

        <section className="dash-tip">
          <span className="dash-tip__icon"><Icon name="sparkle" size={18} /></span>
          <div>
            <h3>One small thing that helps</h3>
            <p>
              Tailor the top third of your resume for each application: the summary, the most
              relevant role, and the first three skills. Leave the rest alone.
            </p>
          </div>
          <Link to="/career-center/resume-mistakes-2026" className="link-arrow">
            Read the guide <Icon name="arrowRight" size={14} />
          </Link>
        </section>
      </div>

      <Modal
        open={Boolean(confirm)}
        onClose={() => setConfirm(null)}
        title="Delete this resume?"
        size="sm"
        footer={
          <>
            <button type="button" className="btn btn--ghost" onClick={() => setConfirm(null)}>Keep it</button>
            <button type="button" className="btn btn--danger" onClick={remove} disabled={busy === confirm?._id}>
              {busy === confirm?._id ? 'Deleting…' : 'Delete permanently'}
            </button>
          </>
        }
      >
        <p className="modal-text">
          “{confirm?.title}” will be removed from your account. This cannot be undone. Any PDF you
          already exported is unaffected.
        </p>
      </Modal>
    </div>
  )
}

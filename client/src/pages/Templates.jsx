import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader.jsx'
import SheetThumb from '../components/SheetThumb.jsx'
import ResumeSheet from '../components/ResumeSheet.jsx'
import Modal from '../components/Modal.jsx'
import Icon from '../components/Icon.jsx'
import { templates } from '../data/templates.js'
import { cloneResume, sampleResume } from '../data/resume.js'

const filters = [
  { id: 'all', label: 'All templates' },
  { id: 'ats', label: 'ATS-safe' },
  { id: 'modern', label: 'Modern' },
  { id: 'creative', label: 'Creative' },
  { id: 'one-page', label: 'One page' },
  { id: 'senior', label: 'Senior roles' },
]

function matches(template, filter) {
  if (filter === 'all') return true
  if (filter === 'ats') return ['ATS-safe', 'Most popular', 'One page'].includes(template.tag)
  if (filter === 'modern') return ['Most popular', 'Editorial', "Editors' pick"].includes(template.tag)
  if (filter === 'creative') return ['Creative', 'Portfolios', 'Editorial'].includes(template.tag)
  if (filter === 'one-page') return ['One page', 'ATS-safe'].includes(template.tag)
  if (filter === 'senior') return ['Senior roles', 'ATS-safe', 'Most popular'].includes(template.tag)
  return true
}

export default function Templates() {
  const [filter, setFilter] = useState('all')
  const [preview, setPreview] = useState(null)

  const visible = useMemo(() => templates.filter((t) => matches(t, filter)), [filter])

  const previewResume = preview
    ? {
        ...cloneResume(sampleResume),
        template: preview.id,
        theme: { ...sampleResume.theme, color: preview.color, font: preview.font },
      }
    : null

  return (
    <>
      <PageHeader
        eyebrow="Templates"
        title={<>Pick a layout. <em>Keep your words.</em></>}
        lede="Eight templates, each with a clean text layer underneath. Switch at any point in the editor — your content moves with you."
      >
        <Link to="/builder/new" className="btn btn--primary">
          Start with a blank page <Icon name="arrowRight" size={16} />
        </Link>
        <Link to="/examples" className="btn btn--ghost">
          Browse examples
        </Link>
      </PageHeader>

      <section className="section section--tight">
        <div className="container">
          <div className="filter-bar">
            <div className="chip-row chip-row--flush" role="tablist" aria-label="Filter templates">
              {filters.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  role="tab"
                  aria-selected={filter === f.id}
                  className={`chip ${filter === f.id ? 'is-active' : ''}`}
                  onClick={() => setFilter(f.id)}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <p className="filter-count">{visible.length} templates</p>
          </div>

          <div className="tpl-grid">
            {visible.map((template) => {
              const resume = {
                ...cloneResume(sampleResume),
                template: template.id,
                theme: { ...sampleResume.theme, color: template.color, font: template.font },
              }
              return (
                <article className="tpl-tile" key={template.id}>
                  <div className="tpl-tile__preview">
                    <SheetThumb resume={resume} label={`${template.name} template preview`} />
                    <div className="tpl-tile__actions">
                      <button type="button" className="btn btn--light btn--sm" onClick={() => setPreview(template)}>
                        <Icon name="eye" size={15} /> Preview
                      </button>
                      <Link to={`/builder/new?template=${template.id}`} className="btn btn--primary btn--sm">
                        Use template
                      </Link>
                    </div>
                  </div>
                  <div className="tpl-tile__body">
                    <div className="tpl-tile__head">
                      <h2>{template.name}</h2>
                      <span className="badge">{template.tag}</span>
                    </div>
                    <p>{template.blurb}</p>
                    <div className="tpl-tile__foot">
                      <span>Best for {template.bestFor.toLowerCase()}</span>
                      <div className="tpl-tile__swatches" aria-hidden="true">
                        {[template.color, '#14111F', '#0F766E'].map((c) => (
                          <i key={c} style={{ background: c }} />
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section section--cream section--tight">
        <div className="container tpl-help">
          <div>
            <p className="eyebrow">Not sure?</p>
            <h2 className="h2">Choose by the job, not by the mood.</h2>
            <p className="lede">
              Recruiter-facing roles in finance and law tend to reward the Classic. Product, design
              and marketing can carry a sidebar. If you are unsure, start with the Modern — it is the
              one we test most.
            </p>
          </div>
          <div className="tpl-help__links">
            <Link to="/ats-checker" className="tpl-help__link">
              <span className="tpl-help__icon"><Icon name="shield" size={18} /></span>
              <div>
                <strong>Check my current resume</strong>
                <span>Free ATS scan, no account needed</span>
              </div>
              <Icon name="arrowRight" size={16} />
            </Link>
            <Link to="/career-center/one-page-or-two" className="tpl-help__link">
              <span className="tpl-help__icon"><Icon name="file" size={18} /></span>
              <div>
                <strong>One page or two?</strong>
                <span>A rule that holds up</span>
              </div>
              <Icon name="arrowRight" size={16} />
            </Link>
          </div>
        </div>
      </section>

      <Modal
        open={Boolean(preview)}
        onClose={() => setPreview(null)}
        title={preview ? `${preview.name} — preview` : ''}
        footer={
          preview && (
            <>
              <button type="button" className="btn btn--ghost" onClick={() => setPreview(null)}>
                Close
              </button>
              <Link to={`/builder/new?template=${preview.id}`} className="btn btn--primary">
                Use this template <Icon name="arrowRight" size={16} />
              </Link>
            </>
          )
        }
      >
        {preview && (
          <div className="tpl-modal">
            <div className="tpl-modal__sheet">
              <ResumeSheet resume={previewResume} />
            </div>
            <div className="tpl-modal__meta">
              <p className="eyebrow">{preview.tag}</p>
              <h3>{preview.name}</h3>
              <p>{preview.blurb}</p>
              <dl>
                <div><dt>Best for</dt><dd>{preview.bestFor}</dd></div>
                <div><dt>Layout</dt><dd>{preview.layout === 'modern' ? 'Two column, sidebar' : preview.layout === 'bold' ? 'Color header band' : preview.layout === 'compact' ? 'Dense single page' : 'Single column'}</dd></div>
                <div><dt>ATS</dt><dd>Single text layer, standard headings</dd></div>
              </dl>
              <ul className="tpl-modal__list">
                <li><Icon name="check" size={14} /> Free PDF export</li>
                <li><Icon name="check" size={14} /> Change color and font later</li>
                <li><Icon name="check" size={14} /> All content is editable</li>
              </ul>
            </div>
          </div>
        )}
      </Modal>
    </>
  )
}

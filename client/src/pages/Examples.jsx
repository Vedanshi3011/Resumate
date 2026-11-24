import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PageHeader from '../components/PageHeader.jsx'
import SheetThumb from '../components/SheetThumb.jsx'
import ResumeSheet from '../components/ResumeSheet.jsx'
import Modal from '../components/Modal.jsx'
import Icon from '../components/Icon.jsx'
import { exampleCategories, examples } from '../data/examples.js'

export default function Examples() {
  const [category, setCategory] = useState('All')
  const [preview, setPreview] = useState(null)
  const navigate = useNavigate()

  const visible = useMemo(
    () => (category === 'All' ? examples : examples.filter((e) => e.category === category)),
    [category]
  )

  const useExample = (example) => {
    navigate('/builder/new', { state: { prefill: example.resume } })
  }

  return (
    <>
      <PageHeader
        eyebrow="Resume examples"
        title={<>Written by people who <em>actually got the job.</em></>}
        lede="Six full resumes across the roles we see most. Open any example, read the bullets, and start your own from the same structure."
      />

      <section className="section section--tight">
        <div className="container">
          <div className="filter-bar">
            <div className="chip-row chip-row--flush" role="tablist" aria-label="Example categories">
              {exampleCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={category === cat}
                  className={`chip ${category === cat ? 'is-active' : ''}`}
                  onClick={() => setCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
            <p className="filter-count">{visible.length} examples</p>
          </div>

          <div className="example-page-grid">
            {visible.map((example) => (
              <article className="example-page-card" key={example.id}>
                <button
                  type="button"
                  className="example-page-card__preview"
                  onClick={() => setPreview(example)}
                  aria-label={`Preview ${example.role} resume example`}
                >
                  <SheetThumb resume={example.resume} />
                  <span className="example-page-card__view">
                    <Icon name="eye" size={15} /> Open full example
                  </span>
                </button>
                <div className="example-page-card__body">
                  <div className="example-page-card__head">
                    <div>
                      <h2>{example.role}</h2>
                      <p>{example.level}</p>
                    </div>
                    <span className="badge">{example.category}</span>
                  </div>
                  <p className="example-page-card__summary">{example.summary}</p>
                  <div className="example-page-card__actions">
                    <button type="button" className="btn btn--outline btn--sm" onClick={() => setPreview(example)}>
                      View example
                    </button>
                    <button type="button" className="link-arrow" onClick={() => useExample(example)}>
                      Use as a starting point <Icon name="arrowRight" size={14} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--lilac section--tight">
        <div className="container example-note">
          <div className="example-note__icon"><Icon name="info" size={20} /></div>
          <div>
            <h2 className="h3">Use these as structure, not as copy.</h2>
            <p>
              Recruiters can spot a borrowed resume in about four seconds. Take the shape — the order
              of sections, the length of a bullet, the way a metric is framed — and replace every fact
              with your own.
            </p>
          </div>
          <Link to="/builder/new" className="btn btn--primary">
            Build mine <Icon name="arrowRight" size={16} />
          </Link>
        </div>
      </section>

      <Modal
        open={Boolean(preview)}
        onClose={() => setPreview(null)}
        title={preview ? `${preview.role} — full example` : ''}
        footer={
          preview && (
            <>
              <button type="button" className="btn btn--ghost" onClick={() => setPreview(null)}>
                Close
              </button>
              <button type="button" className="btn btn--primary" onClick={() => useExample(preview)}>
                Use this example <Icon name="arrowRight" size={16} />
              </button>
            </>
          )
        }
      >
        {preview && (
          <div className="example-modal">
            <div className="example-modal__sheet">
              <ResumeSheet resume={preview.resume} />
            </div>
            <aside className="example-modal__side">
              <p className="eyebrow">{preview.category}</p>
              <h3>{preview.role}</h3>
              <p className="example-modal__level">{preview.level}</p>
              <p className="example-modal__summary">{preview.summary}</p>

              <div className="example-modal__block">
                <h4>What works here</h4>
                <ul>
                  <li><Icon name="check" size={14} /> The summary names a role and a scope</li>
                  <li><Icon name="check" size={14} /> Bullets lead with a verb and a result</li>
                  <li><Icon name="check" size={14} /> Skills are grouped, not dumped</li>
                </ul>
              </div>

              <div className="example-modal__block">
                <h4>Skills in this resume</h4>
                <div className="tag-cloud">
                  {preview.resume.data.skills.slice(0, 8).map((skill) => (
                    <span key={skill} className="tag">{skill}</span>
                  ))}
                </div>
              </div>

              <div className="example-modal__cta">
                <p>Start with this content, then make it yours.</p>
                <button type="button" className="btn btn--primary btn--block" onClick={() => useExample(preview)}>
                  Copy into my builder
                </button>
                <p className="small muted">You can edit or delete every line.</p>
              </div>
            </aside>
          </div>
        )}
      </Modal>
    </>
  )
}

import { useState } from 'react'
import Field, { StepHead } from './Field.jsx'
import Icon from '../components/Icon.jsx'
import { uid } from '../data/resume.js'

function blankEducation() {
  return { id: uid(), degree: '', school: '', location: '', start: '', end: '', details: '' }
}

export default function StepEducation({ education, patch }) {
  const [openId, setOpenId] = useState(education[0]?.id || null)

  const updateItem = (id, changes) =>
    patch({ education: education.map((item) => (item.id === id ? { ...item, ...changes } : item)) })

  const addEducation = () => {
    const item = blankEducation()
    patch({ education: [...education, item] })
    setOpenId(item.id)
  }

  const removeEducation = (id) => {
    patch({ education: education.filter((item) => item.id !== id) })
  }

  return (
    <div className="step">
      <StepHead
        title="Education"
        description="Degree, school, dates. Add honors or a relevant detail if it helps, but do not pad this section."
        icon="graduation"
      />

      <div className="repeat-list">
        {education.map((item, index) => {
          const isOpen = openId === item.id
          return (
            <article className={`repeat-card ${isOpen ? 'is-open' : ''}`} key={item.id}>
              <header className="repeat-card__head">
                <button type="button" className="repeat-card__toggle" onClick={() => setOpenId(isOpen ? null : item.id)}>
                  <span className="repeat-card__index">{String(index + 1).padStart(2, '0')}</span>
                  <span className="repeat-card__title">
                    <strong>{item.degree || 'New qualification'}</strong>
                    <small>{item.school || 'Add a school'}</small>
                  </span>
                  <Icon name="chevronDown" size={16} className={`repeat-card__chev ${isOpen ? 'is-open' : ''}`} />
                </button>
                <button
                  type="button"
                  className="icon-btn icon-btn--danger"
                  onClick={() => removeEducation(item.id)}
                  aria-label="Remove this qualification"
                >
                  <Icon name="trash" size={15} />
                </button>
              </header>

              {isOpen && (
                <div className="repeat-card__body">
                  <div className="step-grid">
                    <Field label="Degree or program" htmlFor={`degree-${item.id}`}>
                      <input
                        id={`degree-${item.id}`}
                        className="input"
                        value={item.degree}
                        onChange={(e) => updateItem(item.id, { degree: e.target.value })}
                        placeholder="BFA, Interaction Design"
                      />
                    </Field>
                    <Field label="School" htmlFor={`school-${item.id}`}>
                      <input
                        id={`school-${item.id}`}
                        className="input"
                        value={item.school}
                        onChange={(e) => updateItem(item.id, { school: e.target.value })}
                        placeholder="California College of the Arts"
                      />
                    </Field>
                    <Field label="Location" htmlFor={`eduloc-${item.id}`} optional>
                      <input
                        id={`eduloc-${item.id}`}
                        className="input"
                        value={item.location}
                        onChange={(e) => updateItem(item.id, { location: e.target.value })}
                        placeholder="San Francisco, CA"
                      />
                    </Field>
                    <div className="field-pair">
                      <Field label="Start" htmlFor={`edustart-${item.id}`}>
                        <input
                          id={`edustart-${item.id}`}
                          className="input"
                          value={item.start}
                          onChange={(e) => updateItem(item.id, { start: e.target.value })}
                          placeholder="2015"
                        />
                      </Field>
                      <Field label="End" htmlFor={`eduend-${item.id}`}>
                        <input
                          id={`eduend-${item.id}`}
                          className="input"
                          value={item.end}
                          onChange={(e) => updateItem(item.id, { end: e.target.value })}
                          placeholder="2019"
                        />
                      </Field>
                    </div>
                  </div>

                  <Field
                    label="Details"
                    htmlFor={`edudetails-${item.id}`}
                    hint="Honors, relevant coursework, or a leadership role. One line."
                    optional
                  >
                    <input
                      id={`edudetails-${item.id}`}
                      className="input"
                      value={item.details}
                      onChange={(e) => updateItem(item.id, { details: e.target.value })}
                      placeholder="Graduated with honors · Design Lead, student studio"
                    />
                  </Field>
                </div>
              )}
            </article>
          )
        })}
      </div>

      <button type="button" className="add-btn" onClick={addEducation}>
        <Icon name="plus" size={16} /> Add education
      </button>
    </div>
  )
}

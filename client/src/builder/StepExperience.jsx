import { useState } from 'react'
import Field, { StepHead } from './Field.jsx'
import Icon from '../components/Icon.jsx'
import { uid } from '../data/resume.js'

const starterBullets = [
  'Led [project], improving [metric] by [X]%.',
  'Built [thing] used by [N] customers or teammates.',
  'Reduced [cost / time / errors] by [X]% in [timeframe].',
]

function blankRole() {
  return {
    id: uid(),
    role: '',
    company: '',
    location: '',
    start: '',
    end: '',
    current: false,
    bullets: [],
  }
}

export default function StepExperience({ experience, projects = [], patch }) {
  const [openId, setOpenId] = useState(experience[0]?.id || null)

  const updateItem = (id, changes) =>
    patch({ experience: experience.map((item) => (item.id === id ? { ...item, ...changes } : item)) })

  const addRole = () => {
    const item = blankRole()
    patch({ experience: [...experience, item] })
    setOpenId(item.id)
  }

  const removeRole = (id) => {
    patch({ experience: experience.filter((item) => item.id !== id) })
  }

  const appendBullet = (id, text) => {
    const item = experience.find((e) => e.id === id)
    if (!item) return
    updateItem(id, { bullets: [...(item.bullets || []), text] })
  }

  const addProject = () =>
    patch({ projects: [...projects, { id: uid(), name: '', link: '', description: '' }] })

  const updateProject = (id, changes) =>
    patch({ projects: projects.map((p) => (p.id === id ? { ...p, ...changes } : p)) })

  const removeProject = (id) => patch({ projects: projects.filter((p) => p.id !== id) })

  return (
    <div className="step">
      <StepHead
        title="Experience"
        description="Most recent first. Three bullets per role is plenty — lead with what changed because you were there."
        icon="briefcase"
      />

      <div className="repeat-list">
        {experience.map((item, index) => {
          const isOpen = openId === item.id
          return (
            <article className={`repeat-card ${isOpen ? 'is-open' : ''}`} key={item.id}>
              <header className="repeat-card__head">
                <button type="button" className="repeat-card__toggle" onClick={() => setOpenId(isOpen ? null : item.id)}>
                  <span className="repeat-card__index">{String(index + 1).padStart(2, '0')}</span>
                  <span className="repeat-card__title">
                    <strong>{item.role || 'New role'}</strong>
                    <small>{item.company || 'Add a company'}{item.current ? ' · Present' : ''}</small>
                  </span>
                  <Icon name="chevronDown" size={16} className={`repeat-card__chev ${isOpen ? 'is-open' : ''}`} />
                </button>
                <button
                  type="button"
                  className="icon-btn icon-btn--danger"
                  onClick={() => removeRole(item.id)}
                  aria-label="Remove this role"
                >
                  <Icon name="trash" size={15} />
                </button>
              </header>

              {isOpen && (
                <div className="repeat-card__body">
                  <div className="step-grid">
                    <Field label="Job title" htmlFor={`role-${item.id}`}>
                      <input
                        id={`role-${item.id}`}
                        className="input"
                        value={item.role}
                        onChange={(e) => updateItem(item.id, { role: e.target.value })}
                        placeholder="Product Designer"
                      />
                    </Field>
                    <Field label="Company" htmlFor={`company-${item.id}`}>
                      <input
                        id={`company-${item.id}`}
                        className="input"
                        value={item.company}
                        onChange={(e) => updateItem(item.id, { company: e.target.value })}
                        placeholder="Lumen Health"
                      />
                    </Field>
                    <Field label="Location" htmlFor={`loc-${item.id}`} optional>
                      <input
                        id={`loc-${item.id}`}
                        className="input"
                        value={item.location}
                        onChange={(e) => updateItem(item.id, { location: e.target.value })}
                        placeholder="San Francisco, CA"
                      />
                    </Field>
                    <div className="field-pair">
                      <Field label="Start" htmlFor={`start-${item.id}`}>
                        <input
                          id={`start-${item.id}`}
                          className="input"
                          value={item.start}
                          onChange={(e) => updateItem(item.id, { start: e.target.value })}
                          placeholder="Jan 2022"
                        />
                      </Field>
                      <Field label="End" htmlFor={`end-${item.id}`}>
                        <input
                          id={`end-${item.id}`}
                          className="input"
                          value={item.current ? 'Present' : item.end}
                          onChange={(e) => updateItem(item.id, { end: e.target.value })}
                          placeholder="Mar 2024"
                          disabled={item.current}
                        />
                      </Field>
                    </div>
                  </div>

                  <label className="check-line">
                    <input
                      type="checkbox"
                      checked={item.current}
                      onChange={(e) => updateItem(item.id, { current: e.target.checked, end: '' })}
                    />
                    <span>I currently work here</span>
                  </label>

                  <Field
                    label="Achievements"
                    htmlFor={`bullets-${item.id}`}
                    hint="One per line. Start with a verb, end with a result."
                  >
                    <textarea
                      id={`bullets-${item.id}`}
                      className="textarea"
                      rows={5}
                      value={(item.bullets || []).join('\n')}
                      onChange={(e) => updateItem(item.id, { bullets: e.target.value.split('\n') })}
                      placeholder={'Led the redesign of the onboarding flow, lifting completion 38%.\nBuilt a design system adopted by 4 product teams.'}
                    />
                  </Field>

                  <div className="starter-bullets">
                    <span>Stuck? Add a frame and fill it in:</span>
                    <div className="starter-bullets__chips">
                      {starterBullets.map((bullet) => (
                        <button key={bullet} type="button" onClick={() => appendBullet(item.id, bullet)}>
                          <Icon name="plus" size={12} /> {bullet}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </article>
          )
        })}
      </div>

      <button type="button" className="add-btn" onClick={addRole}>
        <Icon name="plus" size={16} /> Add another role
      </button>

      {!experience.length && (
        <div className="empty-step">
          <p>No roles yet. If you are a student, add an internship or a project instead — the structure is the same.</p>
        </div>
      )}

      <div className="projects-block">
        <div className="projects-block__head">
          <div>
            <h3>Projects</h3>
            <p>Optional, and useful when your work history is short or your best work lives outside a job.</p>
          </div>
          <button type="button" className="btn btn--quiet btn--sm" onClick={addProject}>
            <Icon name="plus" size={14} /> Add project
          </button>
        </div>

        {projects.map((project) => (
          <div className="project-row" key={project.id}>
            <div className="step-grid">
              <Field label="Project name" htmlFor={`proj-name-${project.id}`}>
                <input
                  id={`proj-name-${project.id}`}
                  className="input"
                  value={project.name}
                  onChange={(e) => updateProject(project.id, { name: e.target.value })}
                  placeholder="Open Care Kit"
                />
              </Field>
              <Field label="Link" htmlFor={`proj-link-${project.id}`} optional>
                <input
                  id={`proj-link-${project.id}`}
                  className="input"
                  value={project.link}
                  onChange={(e) => updateProject(project.id, { link: e.target.value })}
                  placeholder="opencarekit.org"
                />
              </Field>
            </div>
            <Field label="Description" htmlFor={`proj-desc-${project.id}`}>
              <textarea
                id={`proj-desc-${project.id}`}
                className="textarea"
                rows={2}
                value={project.description}
                onChange={(e) => updateProject(project.id, { description: e.target.value })}
                placeholder="One line about what it does and why it matters."
              />
            </Field>
            <button type="button" className="text-btn text-btn--danger" onClick={() => removeProject(project.id)}>
              <Icon name="trash" size={13} /> Remove project
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

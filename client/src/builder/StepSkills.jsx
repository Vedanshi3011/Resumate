import { useState } from 'react'
import Field, { StepHead } from './Field.jsx'
import Icon from '../components/Icon.jsx'

const suggestions = [
  'Figma',
  'SQL',
  'Python',
  'React',
  'Project management',
  'Data analysis',
  'Stakeholder communication',
  'Excel',
  'User research',
  'Copywriting',
  'HubSpot',
  'Accessibility',
]

export default function StepSkills({ skills, certifications, patch }) {
  const [draft, setDraft] = useState('')

  const addSkill = (value) => {
    const skill = value.trim()
    if (!skill) return
    if (!skills.some((s) => s.toLowerCase() === skill.toLowerCase())) {
      patch({ skills: [...skills, skill] })
    }
    setDraft('')
  }

  const removeSkill = (skill) => patch({ skills: skills.filter((s) => s !== skill) })

  const available = suggestions.filter((s) => !skills.some((skill) => skill.toLowerCase() === s.toLowerCase()))

  return (
    <div className="step">
      <StepHead
        title="Skills & certifications"
        description="Four to ten skills, grouped by what you actually want to be interviewed on. No word clouds."
        icon="zap"
      />

      <Field
        label="Add a skill"
        htmlFor="skill-input"
        hint="Press Enter to add. Keep each one short — a tool, a method, or a domain."
      >
        <div className="tag-input">
          <input
            id="skill-input"
            className="input"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ',') {
                e.preventDefault()
                addSkill(draft)
              }
            }}
            placeholder="e.g. Design systems"
          />
          <button type="button" className="btn btn--quiet" onClick={() => addSkill(draft)}>
            <Icon name="plus" size={15} /> Add
          </button>
        </div>
      </Field>

      <div className="skill-cloud">
        {skills.length ? (
          skills.map((skill) => (
            <span key={skill} className="skill-pill">
              {skill}
              <button type="button" onClick={() => removeSkill(skill)} aria-label={`Remove ${skill}`}>
                <Icon name="close" size={12} />
              </button>
            </span>
          ))
        ) : (
          <p className="muted small">No skills yet. Add four to start.</p>
        )}
      </div>

      {available.length > 0 && (
        <div className="suggest-row">
          <span>Suggestions</span>
          <div className="suggest-row__chips">
            {available.slice(0, 8).map((skill) => (
              <button key={skill} type="button" onClick={() => addSkill(skill)}>
                <Icon name="plus" size={12} /> {skill}
              </button>
            ))}
          </div>
        </div>
      )}

      <hr className="divider" />

      <Field
        label="Certifications"
        htmlFor="certifications"
        hint="One per line. Include the issuing body if it matters in your field."
        optional
      >
        <textarea
          id="certifications"
          className="textarea"
          rows={4}
          value={(certifications || []).join('\n')}
          onChange={(e) => patch({ certifications: e.target.value.split('\n') })}
          placeholder={'Google UX Design Certificate\nWCAG 2.2 Accessibility'}
        />
      </Field>

      <div className="tip-box">
        <Icon name="info" size={16} />
        <p>
          Mirror the job description’s vocabulary where it is honest. If the posting says “customer
          success,” use that instead of “account management.”
        </p>
      </div>
    </div>
  )
}

import { StepHead } from './Field.jsx'
import Icon from '../components/Icon.jsx'

const starters = [
  {
    label: 'Experienced hire',
    text: 'Product designer with 7 years in B2B health tools. Led an onboarding redesign that lifted completion 38%. Looking for a senior role where research and systems work meet.',
  },
  {
    label: 'Career change',
    text: 'Operations lead moving into product management after 6 years in last-mile logistics. Cut delivery exceptions 27% across 14 hubs and shipped an internal tool used by 200 drivers.',
  },
  {
    label: 'New graduate',
    text: 'Information systems graduate with a focus on public-data analytics. Built a transit reliability dashboard viewed 4,000 times in three months. Looking for a junior analyst role on a team that ships.',
  },
]

export default function StepSummary({ summary, patch }) {
  const length = summary.trim().length

  return (
    <div className="step">
      <StepHead
        title="Summary"
        description="Three sentences: who you are, one proof point, and what you want next. Skip the adjectives."
        icon="file"
      />

      <div className="field">
        <div className="summary-label-row">
          <label htmlFor="summary">Professional summary</label>
          <span className={`summary-count ${length > 480 ? 'is-over' : ''}`}>{length} characters</span>
        </div>
        <textarea
          id="summary"
          className="textarea textarea--tall"
          rows={7}
          value={summary}
          onChange={(e) => patch({ summary: e.target.value })}
          placeholder="Product designer with 7 years in B2B health tools. Led an onboarding redesign that lifted completion 38%. Looking for a senior role where research and systems work meet."
        />
        <span className="field__hint">
          Aim for 40–70 words. A summary is optional if your experience already speaks clearly.
        </span>
      </div>

      <div className="starter-summaries">
        <p>Start from a shape, then replace every detail:</p>
        {starters.map((starter) => (
          <button
            key={starter.label}
            type="button"
            className="starter-summary"
            onClick={() => patch({ summary: starter.text })}
          >
            <span className="starter-summary__head">
              <strong>{starter.label}</strong>
              <span>Use this</span>
            </span>
            <span className="starter-summary__text">{starter.text}</span>
          </button>
        ))}
      </div>

      <div className="tip-box">
        <Icon name="info" size={16} />
        <p>
          Read it out loud. If it sounds like a brochure, cut the adjectives. If it sounds like you
          explaining your job to a friend, keep it.
        </p>
      </div>
    </div>
  )
}

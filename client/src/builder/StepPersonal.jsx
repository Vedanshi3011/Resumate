import Field, { StepHead } from './Field.jsx'
import Icon from '../components/Icon.jsx'

export default function StepPersonal({ personal, patch }) {
  return (
    <div className="step">
      <StepHead
        title="Personal details"
        description="The top of the page. Use the name and contact details a recruiter would find on your LinkedIn."
        icon="user"
      />

      <div className="step-grid">
        <Field label="Full name" htmlFor="p-name">
          <input
            id="p-name"
            className="input"
            value={personal.fullName}
            onChange={(e) => patch({ fullName: e.target.value })}
            placeholder="Maya Chen"
            autoComplete="name"
          />
        </Field>

        <Field label="Target role" htmlFor="p-role" hint="Shown under your name. Match the job title you want.">
          <input
            id="p-role"
            className="input"
            value={personal.role}
            onChange={(e) => patch({ role: e.target.value })}
            placeholder="Senior Product Designer"
          />
        </Field>

        <Field label="Email" htmlFor="p-email">
          <input
            id="p-email"
            className="input"
            type="email"
            value={personal.email}
            onChange={(e) => patch({ email: e.target.value })}
            placeholder="you@email.com"
            autoComplete="email"
          />
        </Field>

        <Field label="Phone" htmlFor="p-phone">
          <input
            id="p-phone"
            className="input"
            value={personal.phone}
            onChange={(e) => patch({ phone: e.target.value })}
            placeholder="+1 (415) 555-0142"
            autoComplete="tel"
          />
        </Field>

        <Field label="Location" htmlFor="p-location" hint="City and state is enough. You can add “Remote” if relevant.">
          <input
            id="p-location"
            className="input"
            value={personal.location}
            onChange={(e) => patch({ location: e.target.value })}
            placeholder="San Francisco, CA"
          />
        </Field>

        <Field label="Portfolio or website" htmlFor="p-site" optional>
          <input
            id="p-site"
            className="input"
            value={personal.website}
            onChange={(e) => patch({ website: e.target.value })}
            placeholder="yoursite.com"
          />
        </Field>

        <Field label="LinkedIn" htmlFor="p-linkedin" optional className="span-2">
          <input
            id="p-linkedin"
            className="input"
            value={personal.linkedin}
            onChange={(e) => patch({ linkedin: e.target.value })}
            placeholder="linkedin.com/in/yourname"
          />
        </Field>
      </div>

      <div className="tip-box">
        <Icon name="info" size={16} />
        <p>
          Keep contact details in the main text, not in a header or image. Some parsers drop anything
          outside the body of the document.
        </p>
      </div>
    </div>
  )
}

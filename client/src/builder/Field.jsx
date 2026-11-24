import Icon from '../components/Icon.jsx'

export default function Field({ label, hint, htmlFor, children, className = '', optional = false }) {
  return (
    <div className={`field ${className}`.trim()}>
      <label htmlFor={htmlFor}>
        {label}
        {optional && <span className="field__optional">optional</span>}
      </label>
      {children}
      {hint && <span className="field__hint">{hint}</span>}
    </div>
  )
}

export function StepHead({ title, description, icon }) {
  return (
    <header className="step-head">
      {icon && (
        <span className="step-head__icon">
          <Icon name={icon} size={19} />
        </span>
      )}
      <div>
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
    </header>
  )
}

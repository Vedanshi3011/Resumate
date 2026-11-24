import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader.jsx'
import Icon from '../components/Icon.jsx'
import Accordion from '../components/Accordion.jsx'
import { faqs, plans } from '../data/site.js'
import { useAuth } from '../lib/auth.jsx'

const comparison = [
  { label: 'Resume templates', free: 'All 8', pro: 'All 8', teams: 'All 8 + shared' },
  { label: 'Resumes', free: 'Unlimited', pro: 'Unlimited', teams: 'Unlimited' },
  { label: 'PDF export', free: 'Yes', pro: 'Yes', teams: 'Yes' },
  { label: 'ATS reports', free: '3 / month', pro: 'Unlimited', teams: 'Unlimited' },
  { label: 'AI bullet suggestions', free: '—', pro: 'Unlimited', teams: 'Unlimited' },
  { label: 'Job-description matching', free: 'Basic', pro: 'Full', teams: 'Full' },
  { label: 'Version history', free: '—', pro: '30 days', teams: '90 days' },
  { label: 'Cover letter builder', free: '—', pro: 'Yes', teams: 'Yes' },
  { label: 'Support', free: 'Email', pro: 'Priority email', teams: 'Dedicated' },
]

export default function Pricing() {
  const [annual, setAnnual] = useState(true)
  const { user } = useAuth()

  return (
    <>
      <PageHeader
        eyebrow="Pricing"
        title={<>Free to build. <em>Pay only if you want more.</em></>}
        lede="The resume, the templates and the PDF export are free forever. Pro exists for people applying to many roles at once."
      >
        <div className="billing-toggle" role="group" aria-label="Billing period">
          <button
            type="button"
            className={!annual ? 'is-active' : ''}
            onClick={() => setAnnual(false)}
            aria-pressed={!annual}
          >
            Monthly
          </button>
          <button
            type="button"
            className={annual ? 'is-active' : ''}
            onClick={() => setAnnual(true)}
            aria-pressed={annual}
          >
            Yearly <span>save 33%</span>
          </button>
        </div>
      </PageHeader>

      <section className="section section--tight">
        <div className="container">
          <div className="pricing-grid">
            {plans.map((plan) => {
              const monthly = annual ? Math.round(plan.annual / 12) : plan.price
              return (
                <article key={plan.id} className={`plan ${plan.featured ? 'plan--featured' : ''}`}>
                  {plan.featured && <span className="plan__flag">Most popular</span>}
                  <div className="plan__head">
                    <h2>{plan.name}</h2>
                    <p>{plan.tagline}</p>
                  </div>
                  <div className="plan__price">
                    <span className="plan__currency">$</span>
                    <strong>{monthly}</strong>
                    <span className="plan__per">/ month</span>
                  </div>
                  <p className="plan__billing">
                    {plan.price === 0
                      ? 'No card required. Ever.'
                      : annual
                        ? `Billed $${plan.annual} yearly`
                        : `Billed $${plan.price} monthly`}
                  </p>
                  <Link
                    to={user ? '/dashboard' : plan.id === 'teams' ? '/contact' : '/signup'}
                    className={`btn btn--block ${plan.featured ? 'btn--primary' : 'btn--outline'}`}
                  >
                    {plan.cta}
                  </Link>
                  <ul className="plan__features">
                    {plan.features.map((feature) => (
                      <li key={feature}><Icon name="check" size={15} /> {feature}</li>
                    ))}
                  </ul>
                </article>
              )
            })}
          </div>

          <p className="pricing-note">
            <Icon name="shield" size={14} /> Cancel any time. We do not charge for resumes you already exported.
          </p>
        </div>
      </section>

      <section className="section section--cream section--tight">
        <div className="container">
          <div className="section-head section-head--center">
            <p className="eyebrow eyebrow--center">Compare</p>
            <h2 className="h2">The details, without the asterisks.</h2>
          </div>

          <div className="compare-wrap">
            <table className="compare">
              <thead>
                <tr>
                  <th scope="col">Feature</th>
                  <th scope="col">Free</th>
                  <th scope="col" className="compare__pro">Pro</th>
                  <th scope="col">Teams</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (
                  <tr key={row.label}>
                    <th scope="row">{row.label}</th>
                    <td>{row.free}</td>
                    <td className="compare__pro">{row.pro}</td>
                    <td>{row.teams}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container faq">
          <div className="faq__side">
            <p className="eyebrow">Billing questions</p>
            <h2 className="h2">Straight answers about the money.</h2>
            <p className="lede">If something is still unclear, ask us before you pay.</p>
            <Link to="/contact" className="link-arrow">
              Contact us <Icon name="arrowRight" size={15} />
            </Link>
          </div>
          <div className="faq__list">
            <Accordion items={faqs.slice(0, 5)} />
          </div>
        </div>
      </section>
    </>
  )
}

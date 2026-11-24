import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader.jsx'
import Icon from '../components/Icon.jsx'
import Reveal from '../components/Reveal.jsx'
import { stats } from '../data/site.js'

const values = [
  {
    icon: 'edit',
    title: 'Write like a person',
    text: 'We would rather give you a prompt than a paragraph. Every suggestion is meant to be rewritten.',
  },
  {
    icon: 'shield',
    title: 'Tell the truth about ATS',
    text: 'No mystery scores, no fear marketing. We show you the checklist we actually use.',
  },
  {
    icon: 'heart',
    title: 'Respect the user’s time',
    text: 'Eight minutes to a first draft. No onboarding tour, no upsell between you and the export.',
  },
  {
    icon: 'lock',
    title: 'Keep data boring',
    text: 'Your resume is not training data. We store what you need, and delete it when you ask.',
  },
]

const team = [
  { name: 'Elena Marsh', role: 'Co-founder, product', initials: 'EM', color: '#5B3DF5' },
  { name: 'Marcus Bell', role: 'Co-founder, engineering', initials: 'MB', color: '#0F766E' },
  { name: 'Priya Nair', role: 'Head of content', initials: 'PN', color: '#FF6B4A' },
  { name: 'Theo Laurent', role: 'Design lead', initials: 'TL', color: '#9A6B1F' },
]

export default function About() {
  return (
    <>
      <PageHeader
        eyebrow="About us"
        title={<>We build for the <em>eighth draft</em>, not the first.</>}
        lede="Resumate started as an internal tool for a small career coaching practice. It is still built by the same four people, for the same reason: most resume tools make the writing harder."
      />

      <section className="section section--tight">
        <div className="container about-story">
          <Reveal className="about-story__copy">
            <p className="eyebrow">The short version</p>
            <h2 className="h2">A resume is a document with a job to do.</h2>
            <p>
              It is not a personal brand exercise and it is not a design portfolio. It needs to get
              past a parser, survive an eight-second skim, and give a busy person one reason to keep
              reading. Almost everything else is decoration.
            </p>
            <p>
              We kept watching people spend hours in tools that made this harder: templates that broke
              when you added a line, AI writers that produced paragraphs nobody would say out loud,
              and ATS checkers that returned a number with no explanation.
            </p>
            <p>
              So we built the opposite. Eight templates that hold their shape. Prompts that start a
              sentence instead of finishing it for you. And a check that names the exact line that is
              costing you.
            </p>
            <div className="about-signature">
              <span className="avatar avatar--lg">EM</span>
              <div>
                <strong>Elena Marsh</strong>
                <span>Co-founder, Resumate</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100} className="about-facts">
            <div><strong>{stats.resumes}</strong><span>resumes built</span></div>
            <div><strong>{stats.reviews}</strong><span>verified reviews</span></div>
            <div><strong>4</strong><span>people on the team</span></div>
            <div><strong>2019</strong><span>year we started</span></div>
            <p className="about-facts__note">
              Remote-first, with people in Chicago, Lisbon and Bengaluru. Support is answered by the
              team that builds the product.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section section--lilac section--tight">
        <div className="container">
          <div className="section-head section-head--center">
            <p className="eyebrow eyebrow--center">What we believe</p>
            <h2 className="h2">Four rules we do not break.</h2>
          </div>
          <div className="value-grid">
            {values.map((value, i) => (
              <Reveal key={value.title} delay={i * 60} className="value-card">
                <span className="value-card__icon"><Icon name={value.icon} size={20} /></span>
                <h3>{value.title}</h3>
                <p>{value.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">The team</p>
            <h2 className="h2">Small on purpose.</h2>
            <p className="lede">No growth team, no content farm. Four people and a shared inbox.</p>
          </div>
          <div className="team-grid">
            {team.map((person) => (
              <div key={person.name} className="team-card">
                <span className="avatar avatar--lg" style={{ background: person.color }}>{person.initials}</span>
                <strong>{person.name}</strong>
                <span>{person.role}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--cream section--tight">
        <div className="container about-cta">
          <div>
            <h2 className="h2">If you are job hunting right now, start here.</h2>
            <p className="lede">The builder is free, and the ATS check does not need an account.</p>
          </div>
          <div className="about-cta__actions">
            <Link to="/builder/new" className="btn btn--primary">Build my resume</Link>
            <Link to="/ats-checker" className="btn btn--outline">Check my current one</Link>
          </div>
        </div>
      </section>
    </>
  )
}

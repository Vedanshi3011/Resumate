import { useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import ResumeSheet from '../components/ResumeSheet.jsx'
import SheetThumb from '../components/SheetThumb.jsx'
import ScoreRing from '../components/ScoreRing.jsx'
import Icon from '../components/Icon.jsx'
import Reveal from '../components/Reveal.jsx'
import Accordion from '../components/Accordion.jsx'
import { cloneResume, sampleResume } from '../data/resume.js'
import { templates } from '../data/templates.js'
import { companies, faqs, stats, testimonials } from '../data/site.js'
import { exampleCategories, examples } from '../data/examples.js'

function Hero() {
  return (
    <section className="hero">
      <div className="hero__wash" aria-hidden="true" />
      <div className="container hero__inner">
        <div className="hero__copy">
          <Reveal>
            <span className="pill pill--lilac">
              <span className="dot dot--live" />
              2,418 resumes built today
            </span>
          </Reveal>

          <Reveal delay={60}>
            <h1 className="hero__title">
              A resume that gets <em>read</em> — not filtered out.
            </h1>
          </Reveal>

          <Reveal delay={120}>
            <p className="hero__lede">
              Resumate pairs eight considered templates with a plain-English ATS check, so your
              experience arrives on the recruiter’s screen the way you meant it.
            </p>
          </Reveal>

          <Reveal delay={180} className="hero__cta">
            <Link to="/builder/new" className="btn btn--primary btn--lg">
              Build my resume
              <Icon name="arrowRight" size={17} />
            </Link>
            <Link to="/templates" className="btn btn--ghost btn--lg">
              Browse templates
            </Link>
          </Reveal>

          <Reveal delay={240} className="hero__proof">
            <span><Icon name="check" size={14} /> Free PDF export</span>
            <span><Icon name="check" size={14} /> No credit card</span>
            <span><Icon name="check" size={14} /> ATS-tested layouts</span>
          </Reveal>

          <Reveal delay={300} className="hero__stats">
            <div>
              <strong>38%</strong>
              <span>more interviews reported</span>
            </div>
            <div>
              <strong>{stats.resumes}</strong>
              <span>resumes built to date</span>
            </div>
            <div>
              <strong>
                {stats.rating}
                <span className="hero__star"><Icon name="star" size={13} /></span>
              </strong>
              <span>average from {stats.reviews} reviews</span>
            </div>
          </Reveal>
        </div>

        <div className="hero__art">
          <div className="hero__art-glow" aria-hidden="true" />
          <div className="hero__sheet-back hero__sheet-back--one" aria-hidden="true" />
          <div className="hero__sheet-back hero__sheet-back--two" aria-hidden="true" />
          <Reveal delay={140} className="hero__sheet">
            <ResumeSheet resume={sampleResume} />
          </Reveal>

          <div className="float-card float-card--score">
            <ScoreRing value={92} size={52} stroke={5} />
            <div>
              <strong>ATS score</strong>
              <span>Excellent match</span>
            </div>
          </div>

          <div className="float-card float-card--note">
            <span className="float-card__icon"><Icon name="sparkle" size={15} /></span>
            <div>
              <strong>3 bullets rewritten</strong>
              <span>with measurable impact</span>
            </div>
          </div>

          <div className="float-card float-card--pdf">
            <Icon name="download" size={15} />
            <span>PDF ready</span>
          </div>
        </div>
      </div>
    </section>
  )
}

function LogoStrip() {
  return (
    <section className="logo-strip" aria-label="Companies our members have been hired at">
      <div className="container">
        <p className="logo-strip__label">Members have been hired at</p>
        <div className="marquee">
          <div className="marquee__track">
            {[...companies, ...companies].map((name, i) => (
              <span key={`${name}-${i}`} className={`logo-strip__name logo-strip__name--${i % 6}`}>
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function TemplateShowcase() {
  const railRef = useRef(null)

  const scroll = (dir) => {
    railRef.current?.scrollBy({ left: dir * 340, behavior: 'smooth' })
  }

  return (
    <section className="section section--lilac templates-rail-section">
      <div className="container">
        <div className="rail-head">
          <div className="section-head">
            <p className="eyebrow">Templates</p>
            <h2 className="h2">Eight layouts. None of them shout.</h2>
            <p className="lede">
              Every template keeps a clean single-column text layer underneath, so the design can be
              two columns while the parser still reads top to bottom.
            </p>
          </div>
          <div className="rail-controls">
            <button type="button" className="rail-btn" onClick={() => scroll(-1)} aria-label="Previous templates">
              <Icon name="arrowLeft" size={18} />
            </button>
            <button type="button" className="rail-btn" onClick={() => scroll(1)} aria-label="Next templates">
              <Icon name="arrowRight" size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="rail-wrap">
        <div className="rail" ref={railRef}>
          {templates.map((template) => {
            const preview = {
              ...cloneResume(sampleResume),
              template: template.id,
              theme: { ...sampleResume.theme, color: template.color, font: template.font },
            }
            return (
              <article className="tpl-card" key={template.id}>
                <div className="tpl-card__preview">
                  <SheetThumb resume={preview} label={`${template.name} template preview`} />
                  <div className="tpl-card__hover">
                    <Link
                      to={`/builder/new?template=${template.id}`}
                      className="btn btn--primary btn--sm"
                    >
                      Use this template
                    </Link>
                  </div>
                </div>
                <div className="tpl-card__meta">
                  <div>
                    <h3>{template.name}</h3>
                    <p>{template.bestFor}</p>
                  </div>
                  <span className="badge">{template.tag}</span>
                </div>
              </article>
            )
          })}
        </div>
      </div>

      <div className="container">
        <div className="rail-foot">
          <p>All templates include a free PDF export and a live ATS preview.</p>
          <Link to="/templates" className="link-arrow">
            See all templates <Icon name="arrowRight" size={15} />
          </Link>
        </div>
      </div>
    </section>
  )
}

const features = [
  {
    icon: 'shield',
    title: 'An ATS check that tells the truth',
    text: 'See your score, the sections a parser found, and the exact phrases that are costing you. No vague “optimization” scores.',
  },
  {
    icon: 'sparkle',
    title: 'Prompts, not a blank page',
    text: 'Start from role-specific suggestions, then rewrite them in your own voice. Every prompt is a starting point, never a final answer.',
  },
  {
    icon: 'palette',
    title: 'Design controls that behave',
    text: 'Change template, accent color, and typeface without breaking the layout. What you see is what exports.',
  },
  {
    icon: 'zap',
    title: 'Autosave, everywhere',
    text: 'Every keystroke is saved. Close the tab on your laptop, finish the sentence on your phone.',
  },
  {
    icon: 'download',
    title: 'A PDF that survives the upload',
    text: 'Selectable text, correct margins, real A4. No rasterized screenshots, no mystery fonts.',
  },
  {
    icon: 'lock',
    title: 'Your content stays yours',
    text: 'We do not sell data or train models on your resume. Delete your account and everything goes with it.',
  },
]

function FeatureGrid() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-head section-head--center">
          <p className="eyebrow eyebrow--center">Why Resumate</p>
          <h2 className="h2">Everything a job search actually needs. Nothing it doesn’t.</h2>
          <p className="lede">
            We stripped out the dashboard confetti and kept the parts that change whether you get a
            reply.
          </p>
        </div>

        <div className="feature-grid">
          {features.map((feature, i) => (
            <Reveal key={feature.title} delay={i * 50} className="feature-card">
              <span className="feature-card__icon">
                <Icon name={feature.icon} size={20} />
              </span>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Workflow() {
  return (
    <section className="section section--cream">
      <div className="container workflow">
        <Reveal className="workflow__copy">
          <p className="eyebrow">How it works</p>
          <h2 className="h2">Eight minutes from blank page to a resume you’d send.</h2>
          <p className="lede">
            The editor asks for the things recruiters look for, in the order they look for them.
            You can skip anything and come back.
          </p>

          <ol className="steps">
            <li>
              <span className="steps__num">01</span>
              <div>
                <h3>Start with a template</h3>
                <p>Pick a layout and an accent color. Change it later without retyping a word.</p>
              </div>
            </li>
            <li>
              <span className="steps__num">02</span>
              <div>
                <h3>Write with a nudge</h3>
                <p>Guided fields, suggested verbs, and a live preview that shows the page filling up.</p>
              </div>
            </li>
            <li>
              <span className="steps__num">03</span>
              <div>
                <h3>Check, then send</h3>
                <p>Run the ATS check, fix the flagged lines, export a clean PDF. That’s the whole loop.</p>
              </div>
            </li>
          </ol>

          <Link to="/builder/new" className="btn btn--primary">
            Try the builder <Icon name="arrowRight" size={16} />
          </Link>
        </Reveal>

        <Reveal delay={120} className="workflow__art">
          <div className="editor-demo">
            <div className="editor-demo__bar">
              <span className="editor-demo__dots"><i /><i /><i /></span>
              <span>Experience — Senior Product Designer</span>
              <span className="badge badge--mint">Saved</span>
            </div>
            <div className="editor-demo__body">
              <p className="editor-demo__label">Achievement</p>
              <div className="editor-demo__input">
                Led the redesign of the patient onboarding flow and made it better.
                <span className="caret" />
              </div>

              <div className="editor-demo__suggest">
                <div className="editor-demo__suggest-head">
                  <span><Icon name="sparkle" size={13} /> Suggested rewrite</span>
                  <span className="badge">Impact</span>
                </div>
                <p>
                  Rebuilt the patient onboarding flow, lifting completion <strong>38%</strong> and
                  cutting support tickets <strong>21%</strong>.
                </p>
                <div className="editor-demo__suggest-foot">
                  <span>Adds two metrics</span>
                  <button type="button">Use this</button>
                </div>
              </div>

              <div className="editor-demo__score">
                <ScoreRing value={92} size={44} stroke={4} />
                <div>
                  <strong>Strong bullet</strong>
                  <span>Action verb · measurable result</span>
                </div>
              </div>
            </div>
          </div>
          <div className="workflow__sticker">
            <Icon name="shield" size={16} />
            <span><strong>ATS-safe</strong> text layer</span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function ExamplesTeaser() {
  const [category, setCategory] = useState('All')

  const visible = useMemo(() => {
    const list = category === 'All' ? examples : examples.filter((e) => e.category === category)
    return list.slice(0, 4)
  }, [category])

  return (
    <section className="section">
      <div className="container">
        <div className="examples-head">
          <div className="section-head">
            <p className="eyebrow">Examples</p>
            <h2 className="h2">See how it reads for your role.</h2>
            <p className="lede">
              Real resumes, written the way a good one should be: specific, quiet, and easy to scan.
            </p>
          </div>
          <Link to="/examples" className="link-arrow examples-head__link">
            All examples <Icon name="arrowRight" size={15} />
          </Link>
        </div>

        <div className="chip-row" role="tablist" aria-label="Resume example categories">
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

        <div className="example-grid">
          {visible.map((example, i) => (
            <Reveal key={example.id} delay={i * 60} className="example-card">
              <Link to="/examples" className="example-card__link">
                <div className="example-card__preview">
                  <SheetThumb resume={example.resume} label={`${example.role} resume example`} />
                  <span className="example-card__view">
                    <Icon name="eye" size={15} /> View example
                  </span>
                </div>
                <div className="example-card__meta">
                  <h3>{example.role}</h3>
                  <p>{example.level}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Testimonials() {
  return (
    <section className="section section--lilac">
      <div className="container">
        <div className="testimonial-head">
          <div className="section-head">
            <p className="eyebrow">From the other side</p>
            <h2 className="h2">The moment it clicks is usually the ATS report.</h2>
          </div>
          <div className="testimonial-score">
            <div className="testimonial-score__stars">
              {[0, 1, 2, 3, 4].map((i) => (
                <Icon key={i} name="star" size={16} />
              ))}
            </div>
            <p>
              <strong>{stats.rating} / 5</strong> · {stats.reviews} verified reviews
            </p>
          </div>
        </div>

        <div className="testimonial-grid">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 70} className="testimonial">
              <Icon name="quote" size={26} className="testimonial__mark" />
              <p className="testimonial__quote">{t.quote}</p>
              <div className="testimonial__person">
                <span className="avatar" style={{ background: t.color }}>{t.initials}</span>
                <div>
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function StatsBand() {
  return (
    <section className="stats-band">
      <div className="container stats-band__inner">
        <div className="stats-band__copy">
          <p className="eyebrow">By the numbers</p>
          <h2 className="h2">Good resumes are not magic. They are specific.</h2>
          <p>
            The patterns behind the numbers are boring and repeatable: standard sections, action
            verbs, real outcomes. We built the tool around them.
          </p>
          <Link to="/ats-checker" className="btn btn--light">
            Check my resume free <Icon name="arrowRight" size={16} />
          </Link>
        </div>
        <div className="stats-band__grid">
          <div><strong>38%</strong><span>more interviews after switching</span></div>
          <div><strong>{stats.resumes}</strong><span>resumes built on Resumate</span></div>
          <div><strong>23%</strong><span>more likely to get an offer</span></div>
          <div><strong>4.8</strong><span>average rating, {stats.reviews} reviews</span></div>
        </div>
      </div>
    </section>
  )
}

function Faq() {
  return (
    <section className="section">
      <div className="container faq">
        <div className="faq__side">
          <p className="eyebrow">Questions</p>
          <h2 className="h2">The things people ask before they start.</h2>
          <p className="lede">
            Still unsure? Write to us. A real person answers, usually within a few hours.
          </p>
          <Link to="/contact" className="link-arrow">
            Contact support <Icon name="arrowRight" size={15} />
          </Link>
        </div>
        <div className="faq__list">
          <Accordion items={faqs} />
        </div>
      </div>
    </section>
  )
}

function FinalCta() {
  return (
    <section className="final-cta-wrap">
      <div className="container">
        <div className="final-cta">
          <div className="final-cta__copy">
            <p className="eyebrow">Ready when you are</p>
            <h2 className="h2">Your next role is closer than your last draft.</h2>
            <p>
              Start free, export a PDF today. No card, no trial countdown, no watermark on your
              experience.
            </p>
            <div className="final-cta__actions">
              <Link to="/builder/new" className="btn btn--primary btn--lg">
                Build my resume <Icon name="arrowRight" size={17} />
              </Link>
              <Link to="/examples" className="btn btn--outline btn--lg">
                See examples
              </Link>
            </div>
          </div>
          <div className="final-cta__art" aria-hidden="true">
            <div className="final-cta__sheet">
              <ResumeSheet resume={{ ...cloneResume(sampleResume), template: 'minimal' }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <LogoStrip />
      <TemplateShowcase />
      <FeatureGrid />
      <Workflow />
      <ExamplesTeaser />
      <Testimonials />
      <StatsBand />
      <Faq />
      <FinalCta />
    </>
  )
}

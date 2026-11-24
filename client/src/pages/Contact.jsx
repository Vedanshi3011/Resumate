import { useState } from 'react'
import PageHeader from '../components/PageHeader.jsx'
import Icon from '../components/Icon.jsx'
import { api } from '../lib/api.js'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', topic: 'Account help', message: '' })
  const [state, setState] = useState({ loading: false, error: '', done: false })

  const submit = async (e) => {
    e.preventDefault()
    setState({ loading: true, error: '', done: false })
    try {
      await api.contact(form)
      setState({ loading: false, error: '', done: true })
      setForm({ name: '', email: '', topic: 'Account help', message: '' })
    } catch (err) {
      setState({ loading: false, error: err.message, done: false })
    }
  }

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title={<>A real person reads <em>every message.</em></>}
        lede="Account trouble, a bug, a billing question, or a resume line you cannot get right — send it over. We usually reply within one business day."
      />

      <section className="section section--tight">
        <div className="container contact-layout">
          <div className="contact-info">
            <div className="card contact-card">
              <span className="contact-card__icon"><Icon name="mail" size={18} /></span>
              <h3>Email us</h3>
              <p>Support is answered by the team that builds the product.</p>
              <a href="mailto:hello@resumate.app">hello@resumate.app</a>
            </div>
            <div className="card contact-card">
              <span className="contact-card__icon"><Icon name="clock" size={18} /></span>
              <h3>Response time</h3>
              <p>Monday to Friday, 9am–6pm Central. Most messages get a reply the same day.</p>
              <span className="contact-card__meta"><span className="dot dot--live" /> Usually under 4 hours</span>
            </div>
            <div className="card contact-card">
              <span className="contact-card__icon"><Icon name="pin" size={18} /></span>
              <h3>Where we are</h3>
              <p>Remote-first, with a small office in Chicago for the days we need a whiteboard.</p>
              <span className="contact-card__meta">Chicago, IL · Lisbon · Bengaluru</span>
            </div>

            <div className="contact-note">
              <Icon name="info" size={16} />
              <p>
                For billing, include the email on your account. Never send your password or full card
                number.
              </p>
            </div>
          </div>

          <div className="card contact-form-card">
            {state.done ? (
              <div className="contact-success">
                <span className="contact-success__icon"><Icon name="checkCircle" size={26} /></span>
                <h2>Message received.</h2>
                <p>
                  Thanks for writing. We will reply to the email you provided, usually within one
                  business day.
                </p>
                <button type="button" className="btn btn--outline" onClick={() => setState({ loading: false, error: '', done: false })}>
                  Send another message
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={submit} noValidate>
                <h2>Send a message</h2>
                <p className="contact-form__sub">Tell us what is going on and we will take it from there.</p>

                <div className="field-row">
                  <div className="field">
                    <label htmlFor="contact-name">Your name</label>
                    <input
                      id="contact-name"
                      className="input"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Maya Chen"
                      required
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="contact-email">Email</label>
                    <input
                      id="contact-email"
                      className="input"
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="you@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="contact-topic">Topic</label>
                  <select
                    id="contact-topic"
                    className="select"
                    value={form.topic}
                    onChange={(e) => setForm({ ...form, topic: e.target.value })}
                  >
                    <option>Account help</option>
                    <option>Billing</option>
                    <option>Bug report</option>
                    <option>Feedback</option>
                    <option>Press</option>
                    <option>Something else</option>
                  </select>
                </div>

                <div className="field">
                  <label htmlFor="contact-message">Message</label>
                  <textarea
                    id="contact-message"
                    className="textarea"
                    rows={7}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="What can we help with?"
                    required
                  />
                  <span className="field__hint">Include the email on your account if it is different.</span>
                </div>

                {state.error && (
                  <div className="form-error" role="alert">
                    <Icon name="alert" size={15} /> {state.error}
                  </div>
                )}

                <button type="submit" className="btn btn--primary btn--lg" disabled={state.loading}>
                  {state.loading ? <><span className="spinner spinner--light" /> Sending…</> : <>Send message <Icon name="send" size={16} /></>}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

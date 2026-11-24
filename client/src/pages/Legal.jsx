import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader.jsx'
import Icon from '../components/Icon.jsx'

const content = {
  privacy: {
    eyebrow: 'Legal',
    title: 'Privacy policy',
    lede: 'The short version: your resume is yours. We store it to run the product, and we delete it when you ask.',
    updated: 'Last updated November 2026',
    sections: [
      {
        h: 'What we collect',
        p: 'Account details (name, email, password hash), the content you enter into resumes, and basic usage events such as when a resume was edited. We do not collect payment card details ourselves; our payment processor does.',
      },
      {
        h: 'What we do with it',
        p: 'We use your data to operate the builder, save your drafts, produce ATS reports, and respond to support messages. We do not sell personal data, and we do not use resume content to train machine-learning models.',
      },
      {
        h: 'Cookies',
        p: 'We use a small number of first-party cookies and local storage entries for authentication and preferences. You can clear them from your browser at any time; you will be signed out.',
      },
      {
        h: 'Your rights',
        p: 'You can export or delete your resumes from your dashboard, or email us to delete your account and all associated content. If you are in the EEA or UK, you also have the right to access, correct, restrict, or object to processing.',
      },
      {
        h: 'Retention',
        p: 'Resumes remain in your account until you delete them. Deleted content is removed from active systems immediately and from backups within 30 days. Support messages are retained for two years.',
      },
      {
        h: 'Contact',
        p: 'Questions about privacy can go to privacy@resumate.app. We aim to respond within five business days.',
      },
    ],
  },
  terms: {
    eyebrow: 'Legal',
    title: 'Terms of service',
    lede: 'The rules for using Resumate. Written to be read, not to be impressive.',
    updated: 'Last updated November 2026',
    sections: [
      {
        h: 'Your account',
        p: 'You are responsible for keeping your login details secure and for the content you add. You must be at least 16 years old to create an account. One person, one account.',
      },
      {
        h: 'Your content',
        p: 'You own the content you put into Resumate. You grant us a limited licence to store and display it so we can provide the service. We do not claim ownership of your resume.',
      },
      {
        h: 'Acceptable use',
        p: 'Do not use Resumate to create fraudulent applications, impersonate another person, or upload unlawful content. We may suspend accounts that do.',
      },
      {
        h: 'Subscriptions',
        p: 'Paid plans renew automatically until cancelled. You can cancel at any time from your account settings; access continues to the end of the current billing period. We do not refund partial periods, except where required by law.',
      },
      {
        h: 'Availability',
        p: 'We aim for high availability but do not guarantee uninterrupted service. Planned maintenance is announced in advance where possible.',
      },
      {
        h: 'Changes',
        p: 'If we make material changes to these terms, we will email account holders at least 14 days before they take effect. Continuing to use the service means you accept the updated terms.',
      },
    ],
  },
}

export default function Legal({ slug }) {
  const doc = content[slug] || content.privacy

  return (
    <>
      <PageHeader eyebrow={doc.eyebrow} title={doc.title} lede={doc.lede} align="left" />

      <section className="section section--tight">
        <div className="container legal-layout">
          <aside className="legal-nav">
            <p className="legal-nav__label">On this page</p>
            <ul>
              {doc.sections.map((section) => (
                <li key={section.h}>
                  <a href={`#${section.h.toLowerCase().replace(/[^a-z]+/g, '-')}`}>{section.h}</a>
                </li>
              ))}
            </ul>
            <div className="legal-nav__note">
              <Icon name="mail" size={15} />
              <p>Questions? <a href="mailto:hello@resumate.app">hello@resumate.app</a></p>
            </div>
          </aside>

          <div className="legal-body">
            <p className="legal-updated">{doc.updated}</p>
            {doc.sections.map((section) => (
              <section key={section.h} id={section.h.toLowerCase().replace(/[^a-z]+/g, '-')}>
                <h2>{section.h}</h2>
                <p>{section.p}</p>
              </section>
            ))}
            <div className="legal-foot">
              <p>See also</p>
              <Link to="/privacy">Privacy policy</Link>
              <Link to="/terms">Terms of service</Link>
              <Link to="/contact">Contact us</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

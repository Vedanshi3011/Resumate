export const articles = [
  {
    slug: 'resume-mistakes-2026',
    title: 'The 7 resume mistakes we still see in 2026',
    excerpt:
      'We read 1,200 resumes this quarter. The same small formatting and phrasing problems keep costing people interviews.',
    category: 'Resume basics',
    readTime: '7 min read',
    date: 'Nov 12, 2026',
    author: 'Elena Marsh',
    featured: true,
    body: [
      {
        type: 'p',
        text: 'Most resumes are not rejected because the candidate is unqualified. They are rejected because the document makes a recruiter work too hard in the first eight seconds. After reviewing more than a thousand applications this quarter, these are the patterns that came up again and again.',
      },
      { type: 'h2', text: '1. A summary that describes a personality, not a person' },
      {
        type: 'p',
        text: '“Results-driven professional with excellent communication skills” tells a reader nothing. A useful summary names a role, a scope, and one proof point: “Product designer with 7 years in B2B health tools; led onboarding redesign that lifted completion 38%.”',
      },
      { type: 'h2', text: '2. Bullets that list duties instead of outcomes' },
      {
        type: 'p',
        text: 'Duties describe the job you were given. Outcomes describe the job you did. Where possible, pair an action with a number: time saved, revenue moved, tickets closed, users retained. If you do not have a number, describe the before and after in plain language.',
      },
      { type: 'h2', text: '3. Inconsistent dates and titles' },
      {
        type: 'p',
        text: 'Applicant tracking systems build a timeline from your dates. “Summer 2023,” “06/23,” and “June 2023” in the same document create ambiguity. Pick one format — we suggest “Jan 2023” — and use it everywhere.',
      },
      { type: 'h2', text: '4. Skills lists that nobody can scan' },
      {
        type: 'p',
        text: 'A 40-item comma-separated wall is not a skills section; it is a word cloud. Group skills into three or four buckets, put the most relevant first, and remove anything you would not be comfortable being interviewed on.',
      },
      { type: 'h2', text: '5. Decorative layouts that break parsing' },
      {
        type: 'p',
        text: 'Text boxes, columns made with tables, and contact details placed in a header can vanish when a parser reads your file. If you use a two-column design, keep the main narrative in one column and test the export as plain text.',
      },
      { type: 'h2', text: '6. One resume for every application' },
      {
        type: 'p',
        text: 'Tailoring does not mean rewriting. It means moving the most relevant role to the top, matching the job’s vocabulary where it is honest, and cutting a line that has nothing to do with the role. Ten minutes of editing beats a hundred applications.',
      },
      { type: 'h2', text: '7. No way to check your own work' },
      {
        type: 'p',
        text: 'Read the resume out loud. Then paste it into a plain-text editor and look at what survives. Then run an ATS check. Each pass catches a different class of problem, and together they take less time than a single interview.',
      },
      {
        type: 'quote',
        text: 'The goal is not a perfect document. It is a document that gives a busy person a reason to keep reading.',
      },
    ],
  },
  {
    slug: 'how-to-write-a-summary',
    title: 'How to write a resume summary that actually gets read',
    excerpt:
      'Three sentences, one proof point, zero adjectives about your personality. A practical template you can fill in tonight.',
    category: 'Writing',
    readTime: '5 min read',
    date: 'Nov 4, 2026',
    author: 'Marcus Bell',
    body: [
      {
        type: 'p',
        text: 'A summary is not an objective statement and it is not a biography. It is a trailer: enough context to make the reader want the full story, and short enough that they actually finish it.',
      },
      { type: 'h2', text: 'The three-sentence shape' },
      {
        type: 'p',
        text: 'Sentence one names your role and scope. Sentence two gives your strongest proof point. Sentence three connects that to the job you are applying for. That is it — roughly 40 to 60 words.',
      },
      {
        type: 'quote',
        text: 'Operations lead with 6 years in last-mile logistics. Cut delivery exceptions 27% across 14 hubs. Looking for a senior role where I can scale a regional network.',
      },
      { type: 'h2', text: 'What to leave out' },
      {
        type: 'ul',
        items: [
          'Adjectives about your character: hardworking, passionate, detail-oriented.',
          'A repeat of your job history with no interpretation.',
          'Anything you cannot defend in an interview.',
          'Objective statements — they read as dated and self-focused.',
        ],
      },
      { type: 'h2', text: 'If you are changing careers' },
      {
        type: 'p',
        text: 'Lead with the through-line, not the gap. “Customer support lead moving into product operations” is clearer than “seeking a new opportunity.” Then prove the transition with one transferable result and one piece of relevant recent work.',
      },
    ],
  },
  {
    slug: 'ats-explained',
    title: 'What an ATS actually reads (and what it ignores)',
    excerpt:
      'Applicant tracking systems are simpler than the internet makes them sound. Here is the plain-English version.',
    category: 'ATS',
    readTime: '6 min read',
    date: 'Oct 27, 2026',
    author: 'Priya Nair',
    body: [
      {
        type: 'p',
        text: 'An applicant tracking system is a database with a search box. When you apply, your file is parsed into fields — name, contact, roles, dates, education, skills — and stored. A recruiter then searches or filters those fields. That is the whole mechanism.',
      },
      { type: 'h2', text: 'What it handles well' },
      {
        type: 'ul',
        items: [
          'Standard section headings such as Experience, Education, and Skills.',
          'A single-column reading order, even when the visual design has two columns.',
          'Common date formats like “Jan 2022 – Present.”',
          'Selectable text in a PDF exported from a word processor or design tool.',
        ],
      },
      { type: 'h2', text: 'What it struggles with' },
      {
        type: 'ul',
        items: [
          'Contact details inside an image, header, or footer.',
          'Text boxes and floating layers that sit outside the main text flow.',
          'Tables used for layout, which can scramble reading order.',
          'Scanned image PDFs with no text layer at all.',
        ],
      },
      { type: 'h2', text: 'The five-minute test' },
      {
        type: 'p',
        text: 'Open your resume, select all, and paste it into a plain text editor. If the order still makes sense and the contact details appear, most systems will read it correctly. If the paste looks like confetti, simplify the layout before you apply.',
      },
      { type: 'h2', text: 'Keywords are not a trick' },
      {
        type: 'p',
        text: 'Matching the job description matters because recruiters search for the words in it. Use the employer’s vocabulary where it is accurate — “customer success” instead of “account management,” for example — but never stuff a keyword you cannot speak to.',
      },
    ],
  },
  {
    slug: 'career-change-resume',
    title: 'A career-change resume that does not apologize',
    excerpt:
      'You do not need to bury your old career. You need to translate it. A framework for making the switch legible.',
    category: 'Career change',
    readTime: '8 min read',
    date: 'Oct 19, 2026',
    author: 'Elena Marsh',
    body: [
      {
        type: 'p',
        text: 'Career-change resumes fail when they read like an apology: a long explanation of why the old career was not right, followed by a hopeful paragraph about the new one. Hiring managers are not looking for a conversion story. They are looking for evidence that you can do this job.',
      },
      { type: 'h2', text: 'Start with the target, not the timeline' },
      {
        type: 'p',
        text: 'Put a target-role headline at the top. Then write a summary that names the overlap explicitly: “Teacher moving into instructional design; 9 years building curriculum for 120+ students.” The reader now has a frame for everything below.',
      },
      { type: 'h2', text: 'Translate, do not delete' },
      {
        type: 'p',
        text: 'Every previous role has transferable outcomes. Classroom management becomes stakeholder facilitation. Event planning becomes project management with budgets and deadlines. Rewrite the bullets in the vocabulary of the target field, but keep the facts intact.',
      },
      { type: 'h2', text: 'Add a bridge section' },
      {
        type: 'p',
        text: 'If your recent experience is thin, add a Projects or Relevant Coursework section above your work history. Two finished projects with links do more than a certificate alone, because they show the work, not just the interest.',
      },
      {
        type: 'quote',
        text: 'The strongest career-change resumes read as continuous, not as a break followed by a new beginning.',
      },
    ],
  },
  {
    slug: 'one-page-or-two',
    title: 'One page or two? A rule that actually holds up',
    excerpt:
      'The old advice is not wrong, it is just incomplete. Here is how to decide based on evidence rather than anxiety.',
    category: 'Formatting',
    readTime: '4 min read',
    date: 'Oct 8, 2026',
    author: 'Marcus Bell',
    body: [
      {
        type: 'p',
        text: 'The one-page rule exists because recruiters skim, not because two pages are forbidden. The real question is whether the second page earns its place.',
      },
      { type: 'h2', text: 'Use one page when' },
      {
        type: 'ul',
        items: [
          'You have fewer than about eight years of relevant experience.',
          'You are applying to a role where concise communication is part of the job.',
          'Your second page would mostly repeat older roles with less relevance.',
        ],
      },
      { type: 'h2', text: 'Use two pages when' },
      {
        type: 'ul',
        items: [
          'You are applying for a senior, specialist, or academic role.',
          'You have measurable outcomes that genuinely differ across roles.',
          'A hiring manager or recruiter has asked for a full CV.',
        ],
      },
      { type: 'h2', text: 'The test that settles it' },
      {
        type: 'p',
        text: 'Cover the second page with your hand. If the first page alone would make you want to interview the candidate, one page is enough. If it feels incomplete without the second, keep both — but make sure page two starts with substance, not a continuation of a bullet list.',
      },
    ],
  },
  {
    slug: 'interview-follow-up',
    title: 'The follow-up email that gets a reply',
    excerpt:
      'Short, specific, and useful. A four-line template for after the interview — plus what not to send.',
    category: 'Job search',
    readTime: '4 min read',
    date: 'Sep 30, 2026',
    author: 'Priya Nair',
    body: [
      {
        type: 'p',
        text: 'Most follow-ups fail for one of two reasons: they are too long, or they ask for something without adding anything. The best ones do one small useful thing and then get out of the way.',
      },
      { type: 'h2', text: 'The four-line version' },
      {
        type: 'ul',
        items: [
          'Thank them for the specific conversation, not “your time.”',
          'Reference one concrete thing you discussed.',
          'Add one small piece of value: a link, a clarification, a relevant example.',
          'State your interest and availability in one sentence.',
        ],
      },
      {
        type: 'quote',
        text: 'Thanks for walking me through the onboarding metrics yesterday. I looked up the activation benchmark you mentioned — the 38% figure lines up with what we saw at Lumen. I am still very interested and free for a next conversation any afternoon this week.',
      },
      { type: 'h2', text: 'Timing and etiquette' },
      {
        type: 'p',
        text: 'Send within 24 hours, during business hours in the interviewer’s time zone. One follow-up is professional. A second after a week is acceptable if you have a genuine update. Anything beyond that starts to cost you goodwill.',
      },
    ],
  },
]

export const articleBySlug = (slug) => articles.find((a) => a.slug === slug)
export const articleCategories = ['All', ...new Set(articles.map((a) => a.category))]

const icons = {
  arrowRight: <path d="M4 12h15m0 0-6-6m6 6-6 6" />,
  arrowLeft: <path d="M20 12H5m0 0 6-6m-6 6 6 6" />,
  arrowUpRight: <path d="M7 17 17 7m0 0H8m9 0v9" />,
  check: <path d="m4.5 12.5 5 5 10-11" />,
  checkCircle: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12.5 2.7 2.7L16.5 9" />
    </>
  ),
  chevronDown: <path d="m6 9 6 6 6-6" />,
  chevronRight: <path d="m9 6 6 6-6 6" />,
  chevronLeft: <path d="m15 6-6 6 6 6" />,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  trash: (
    <>
      <path d="M4 7h16M9 7V5h6v2M6.5 7l.8 13h9.4l.8-13" />
      <path d="M10 11v5M14 11v5" />
    </>
  ),
  copy: (
    <>
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M15 5.5A1.5 1.5 0 0 0 13.5 4h-8A1.5 1.5 0 0 0 4 5.5v8A1.5 1.5 0 0 0 5.5 15" />
    </>
  ),
  download: <path d="M12 4v11m0 0 4-4m-4 4-4-4M5 19h14" />,
  sparkle: (
    <>
      <path d="M12 3.5 13.7 9l5.5 1.7-5.5 1.7L12 18l-1.7-5.6L4.8 10.7 10.3 9 12 3.5Z" />
      <path d="M18.5 16.5 19.2 19l2.3.7-2.3.7-.7 2.4" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3.5 5 6v6c0 4.2 2.9 7.4 7 8.5 4.1-1.1 7-4.3 7-8.5V6l-7-2.5Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  palette: (
    <>
      <path d="M12 3a9 9 0 1 0 0 18c1.4 0 2-.8 2-1.7 0-1.5-1.6-1.8-1.6-3 0-1 .8-1.8 2-1.8H16a5 5 0 0 0 5-5c0-3.7-4-6.5-9-6.5Z" />
      <circle cx="8" cy="10" r="1" />
      <circle cx="12" cy="7.5" r="1" />
      <circle cx="16" cy="10" r="1" />
    </>
  ),
  layout: (
    <>
      <rect x="3.5" y="4" width="17" height="16" rx="2" />
      <path d="M3.5 9h17M9 9v11" />
    </>
  ),
  zap: <path d="M13 3 5 13h6l-1 8 8-10h-6l1-8Z" />,
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3.5 12h17M12 3c2.5 2.4 3.8 5.5 3.8 9S14.5 18.6 12 21c-2.5-2.4-3.8-5.5-3.8-9S9.5 5.4 12 3Z" />
    </>
  ),
  star: <path d="m12 3.6 2.6 5.3 5.9.8-4.3 4.2 1 5.9-5.2-2.8-5.2 2.8 1-5.9L3.5 9.7l5.9-.8L12 3.6Z" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </>
  ),
  phone: <path d="M7 3.5h2.5l1.2 4-1.7 1.3a12 12 0 0 0 6.2 6.2l1.3-1.7 4 1.2V17a3 3 0 0 1-3 3A14.5 14.5 0 0 1 4 6.5a3 3 0 0 1 3-3Z" />,
  pin: (
    <>
      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  link: <path d="M10.5 13.5a4 4 0 0 0 5.7 0l2.3-2.3a4 4 0 1 0-5.7-5.7l-1.1 1.1M13.5 10.5a4 4 0 0 0-5.7 0l-2.3 2.3a4 4 0 1 0 5.7 5.7l1.1-1.1" />,
  linkedin: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="2" />
      <path d="M7.5 10v7M7.5 7.2v.1M11.5 17v-4a2.5 2.5 0 0 1 5 0v4" />
    </>
  ),
  file: (
    <>
      <path d="M6 3.5h7l5 5v12H6v-17Z" />
      <path d="M13 3.5v5h5M9 13h6M9 16.5h4" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4 4" />
    </>
  ),
  eye: (
    <>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  save: (
    <>
      <path d="M5 4h11l3 3v13H5V4Z" />
      <path d="M8 4v5h7V4M8 20v-6h8v6" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20a7 7 0 0 1 14 0" />
    </>
  ),
  logout: <path d="M14 5H6v14h8M10 12h10m0 0-3-3m3 3-3 3" />,
  edit: <path d="m4 16.5-.8 4.3 4.3-.8L19 8.5 15.5 5 4 16.5ZM13.5 7l3.5 3.5" />,
  quote: <path d="M9 6.5c-3 1.4-4.5 3.7-4.5 6.8V19H10v-5.5H6.8c0-1.9.8-3.2 2.7-4.1L9 6.5Zm9 0c-3 1.4-4.5 3.7-4.5 6.8V19H19v-5.5h-3.2c0-1.9.8-3.2 2.7-4.1L18 6.5Z" />,
  lock: (
    <>
      <rect x="4.5" y="10" width="15" height="10" rx="2" />
      <path d="M8 10V7.5a4 4 0 0 1 8 0V10" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5.3l3.5 2" />
    </>
  ),
  external: <path d="M14 4h6v6M20 4l-9 9M18 14v5H5V6h5" />,
  grid: (
    <>
      <rect x="4" y="4" width="6.5" height="6.5" rx="1" />
      <rect x="13.5" y="4" width="6.5" height="6.5" rx="1" />
      <rect x="4" y="13.5" width="6.5" height="6.5" rx="1" />
      <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1" />
    </>
  ),
  sliders: <path d="M4 7h9M17 7h3M4 17h3M11 17h9M15 4v6M9 14v6" />,
  alert: (
    <>
      <path d="M12 4 3.5 19.5h17L12 4Z" />
      <path d="M12 9.5v4M12 16.5v.1" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5M12 7.8v.1" />
    </>
  ),
  xCircle: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m9 9 6 6M15 9l-6 6" />
    </>
  ),
  drag: <path d="M9 6h.1M15 6h.1M9 12h.1M15 12h.1M9 18h.1M15 18h.1" />,
  graduation: <path d="M3 9.5 12 5l9 4.5-9 4.5-9-4.5Zm3 2.7v4.3c0 1.7 2.7 3 6 3s6-1.3 6-3v-4.3" />,
  briefcase: (
    <>
      <rect x="3" y="7.5" width="18" height="12" rx="2" />
      <path d="M9 7.5V5.5h6v2M3 12.5h18" />
    </>
  ),
  send: <path d="M20.5 3.5 3.5 10l6.5 2.5L12.5 20l8-16.5Zm-10.5 9L20.5 3.5" />,
  heart: <path d="M12 20s-7-4.4-7-9.3A4 4 0 0 1 12 7a4 4 0 0 1 7 3.7C19 15.6 12 20 12 20Z" />,
}

export default function Icon({ name, size = 18, className = '', strokeWidth = 1.7, ...rest }) {
  const content = icons[name]
  if (!content) return null
  return (
    <svg
      className={`icon ${className}`.trim()}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {content}
    </svg>
  )
}

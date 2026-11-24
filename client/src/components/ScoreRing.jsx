export default function ScoreRing({ value = 0, size = 72, stroke = 6, label }) {
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (Math.min(100, Math.max(0, value)) / 100) * circumference

  return (
    <div className="score-ring" style={{ width: size, height: size }} role="img" aria-label={label || `${value} out of 100`}>
      <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
        <circle
          className="score-ring__bg"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={stroke}
        />
        <circle
          className="score-ring__fg"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <span className="score-ring__value" style={{ fontSize: size * 0.3 }}>
        {value}
      </span>
    </div>
  )
}

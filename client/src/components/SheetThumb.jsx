import ResumeSheet from './ResumeSheet.jsx'

export default function SheetThumb({ resume, className = '', label }) {
  return (
    <div className={`sheet-thumb ${className}`.trim()} aria-label={label || 'Resume preview'} role="img">
      <div className="sheet-thumb__inner">
        <ResumeSheet resume={resume} />
      </div>
    </div>
  )
}

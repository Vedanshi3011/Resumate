import Icon from '../components/Icon.jsx'
import ResumeSheet from '../components/ResumeSheet.jsx'
import { colors, fonts, templateById, templates } from '../data/templates.js'

export default function Preview({ resume, zoom, setZoom, updateTheme, selectTemplate, onPrint }) {
  const change = (delta) => setZoom((z) => Math.min(1.25, Math.max(0.65, Number((z + delta).toFixed(2)))))

  return (
    <aside className="preview">
      <div className="preview__bar">
        <label className="preview__control">
          <span>Template</span>
          <select
            className="select select--sm"
            value={resume.template}
            onChange={(e) => selectTemplate(templateById(e.target.value))}
            aria-label="Template"
          >
            {templates.map((t) => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
        </label>

        <div className="preview__swatches" aria-label="Accent color">
          {colors.slice(0, 5).map((color) => (
            <button
              key={color.value}
              type="button"
              className={`preview__swatch ${resume.theme.color.toLowerCase() === color.value.toLowerCase() ? 'is-active' : ''}`}
              style={{ background: color.value }}
              onClick={() => updateTheme({ color: color.value })}
              aria-label={color.name}
              title={color.name}
            />
          ))}
          <label className="preview__swatch preview__swatch--custom" title="Custom color">
            <input
              type="color"
              value={resume.theme.color}
              onChange={(e) => updateTheme({ color: e.target.value })}
              aria-label="Custom color"
            />
          </label>
        </div>

        <label className="preview__control preview__control--font">
          <span>Type</span>
          <select
            className="select select--sm"
            value={resume.theme.font}
            onChange={(e) => updateTheme({ font: e.target.value })}
            aria-label="Typeface"
          >
            {fonts.map((f) => (
              <option key={f.id} value={f.id}>{f.name}</option>
            ))}
          </select>
        </label>

        <div className="preview__zoom">
          <button type="button" onClick={() => change(-0.1)} aria-label="Zoom out">
            <Icon name="minus" size={14} />
          </button>
          <span>{Math.round(zoom * 100)}%</span>
          <button type="button" onClick={() => change(0.1)} aria-label="Zoom in">
            <Icon name="plus" size={14} />
          </button>
        </div>

        <button type="button" className="btn btn--primary btn--sm preview__download" onClick={onPrint}>
          <Icon name="download" size={15} /> PDF
        </button>
      </div>

      <div className="preview__stage">
        <div className="preview__canvas" style={{ '--zoom': zoom }}>
          <div className="print-area">
            <ResumeSheet resume={resume} />
          </div>
        </div>
        <p className="preview__hint">
          <Icon name="file" size={13} /> A4 · 210 × 297 mm · selectable text
        </p>
      </div>
    </aside>
  )
}

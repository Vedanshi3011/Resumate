import { StepHead } from './Field.jsx'
import SheetThumb from '../components/SheetThumb.jsx'
import Icon from '../components/Icon.jsx'
import { colors, fonts, templateById, templates } from '../data/templates.js'

export default function StepDesign({ resume, selectTemplate, updateTheme }) {
  return (
    <div className="step">
      <StepHead
        title="Design"
        description="Everything here is reversible. The text layer never changes when you switch a layout."
        icon="palette"
      />

      <div className="design-block">
        <div className="design-block__head">
          <h3>Template</h3>
          <span className="badge">{templateById(resume.template).name}</span>
        </div>
        <div className="design-templates">
          {templates.map((template) => (
            <button
              key={template.id}
              type="button"
              className={`design-template ${resume.template === template.id ? 'is-active' : ''}`}
              onClick={() => selectTemplate(template)}
              aria-pressed={resume.template === template.id}
            >
              <div className="design-template__preview">
                <SheetThumb
                  resume={{
                    ...resume,
                    template: template.id,
                    theme: { ...resume.theme, color: template.color, font: template.font },
                  }}
                />
                {resume.template === template.id && (
                  <span className="design-template__check"><Icon name="check" size={12} /></span>
                )}
              </div>
              <span>{template.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="design-block">
        <div className="design-block__head">
          <h3>Accent color</h3>
          <span className="design-block__value">{resume.theme.color.toUpperCase()}</span>
        </div>
        <div className="swatches">
          {colors.map((color) => (
            <button
              key={color.value}
              type="button"
              className={`swatch ${resume.theme.color.toLowerCase() === color.value.toLowerCase() ? 'is-active' : ''}`}
              style={{ '--swatch': color.value }}
              onClick={() => updateTheme({ color: color.value })}
              aria-label={color.name}
              title={color.name}
            >
              <span />
            </button>
          ))}
          <label className="swatch swatch--custom" title="Custom color">
            <input
              type="color"
              value={resume.theme.color}
              onChange={(e) => updateTheme({ color: e.target.value })}
              aria-label="Custom accent color"
            />
            <Icon name="plus" size={14} />
          </label>
        </div>
      </div>

      <div className="design-block">
        <div className="design-block__head">
          <h3>Typeface</h3>
        </div>
        <div className="font-options">
          {fonts.map((font) => (
            <button
              key={font.id}
              type="button"
              className={`font-option ${resume.theme.font === font.id ? 'is-active' : ''}`}
              onClick={() => updateTheme({ font: font.id })}
              aria-pressed={resume.theme.font === font.id}
            >
              <span className="font-option__sample" style={{ fontFamily: font.stack }}>Aa</span>
              <span className="font-option__name">{font.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="design-block">
        <div className="design-block__head">
          <h3>Density</h3>
          <span className="design-block__value">{resume.theme.density === 'compact' ? 'Compact' : 'Cozy'}</span>
        </div>
        <div className="segmented">
          <button
            type="button"
            className={resume.theme.density !== 'compact' ? 'is-active' : ''}
            onClick={() => updateTheme({ density: 'cozy' })}
          >
            Cozy
          </button>
          <button
            type="button"
            className={resume.theme.density === 'compact' ? 'is-active' : ''}
            onClick={() => updateTheme({ density: 'compact' })}
          >
            Compact
          </button>
        </div>
        <p className="design-block__hint">
          Compact tightens spacing to help a long resume fit one page. Check the preview before you
          export.
        </p>
      </div>

      <div className="tip-box">
        <Icon name="shield" size={16} />
        <p>
          Every template keeps a single-column text layer for parsers, even when it looks like two
          columns. You can check that in the ATS report.
        </p>
      </div>
    </div>
  )
}

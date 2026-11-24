import mongoose from 'mongoose'

const experienceSchema = new mongoose.Schema(
  {
    id: String,
    role: { type: String, default: '' },
    company: { type: String, default: '' },
    location: { type: String, default: '' },
    start: { type: String, default: '' },
    end: { type: String, default: '' },
    current: { type: Boolean, default: false },
    bullets: { type: [String], default: [] },
  },
  { _id: false }
)

const educationSchema = new mongoose.Schema(
  {
    id: String,
    degree: { type: String, default: '' },
    school: { type: String, default: '' },
    location: { type: String, default: '' },
    start: { type: String, default: '' },
    end: { type: String, default: '' },
    details: { type: String, default: '' },
  },
  { _id: false }
)

const projectSchema = new mongoose.Schema(
  {
    id: String,
    name: { type: String, default: '' },
    link: { type: String, default: '' },
    description: { type: String, default: '' },
  },
  { _id: false }
)

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    title: { type: String, default: 'Untitled resume', trim: true, maxlength: 120 },
    template: {
      type: String,
      enum: ['classic', 'modern', 'minimal', 'bold', 'executive', 'compact', 'elegant', 'creative'],
      default: 'modern',
    },
    theme: {
      color: { type: String, default: '#5B3DF5' },
      font: { type: String, default: 'inter' },
      density: { type: String, enum: ['cozy', 'compact'], default: 'cozy' },
    },
    data: {
      personal: {
        fullName: { type: String, default: '' },
        role: { type: String, default: '' },
        email: { type: String, default: '' },
        phone: { type: String, default: '' },
        location: { type: String, default: '' },
        website: { type: String, default: '' },
        linkedin: { type: String, default: '' },
      },
      summary: { type: String, default: '' },
      experience: { type: [experienceSchema], default: [] },
      education: { type: [educationSchema], default: [] },
      skills: { type: [String], default: [] },
      projects: { type: [projectSchema], default: [] },
      certifications: { type: [String], default: [] },
    },
    atsScore: { type: Number, default: 0, min: 0, max: 100 },
    lastEditedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
)

resumeSchema.index({ user: 1, updatedAt: -1 })

export default mongoose.model('Resume', resumeSchema)

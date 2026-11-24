import mongoose from 'mongoose'

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    email: { type: String, required: true, trim: true, lowercase: true },
    topic: { type: String, default: 'General' },
    message: { type: String, required: true, trim: true, maxlength: 4000 },
    handled: { type: Boolean, default: false },
  },
  { timestamps: true }
)

export default mongoose.model('Contact', contactSchema)

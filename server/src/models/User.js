import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    passwordHash: { type: String, required: true },
    plan: { type: String, enum: ['free', 'pro'], default: 'free' },
    lastLoginAt: { type: Date },
  },
  { timestamps: true }
)

userSchema.methods.toSafeJSON = function toSafeJSON() {
  return {
    id: this._id.toString(),
    name: this.name,
    email: this.email,
    plan: this.plan,
    createdAt: this.createdAt,
  }
}

export default mongoose.model('User', userSchema)

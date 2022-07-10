import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
    },
    googleId: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('User', UserSchema);

import mongoose = require('mongoose');

export type TUserModel = mongoose.Document & {
  name: string; 
  username: string;
  email: string; 
  password: string; 
  verified: string;
  resetLink: Date; 
};

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  verified: {
    type: Boolean,
    default: false
  },
  resetLink: {
    type: String,
    default: ''
  }
}, { timestamps: true });

export const User = mongoose.model<TUserModel>("User", UserSchema);
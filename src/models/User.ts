import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  phone: string;
  password: string;
  role: "customer" | "courier" | "admin";
}

const userSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { 
      type: String, 
      enum: ["customer", "courier", "admin"], 
      default: "customer" 
    },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", userSchema);

import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "./User";

export interface IOrder extends Document {
  pickup: string;
  dropoff: string;
  status: "pending" | "assigned" | "in_transit" | "delivered";
  details?: string;
  customer: IUser["_id"];
  courier?: IUser["_id"];
}

const orderSchema: Schema<IOrder> = new Schema(
  {
    pickup: { type: String, required: true },
    dropoff: { type: String, required: true },
    status: { 
      type: String, 
      enum: ["pending", "assigned", "in_transit", "delivered"], 
      default: "pending" 
    },
    details: { type: String },
    customer: { type: Schema.Types.ObjectId, ref: "User", required: true },
    courier: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.model<IOrder>("Order", orderSchema);

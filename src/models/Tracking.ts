import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "./User";
import { IOrder } from "./Order";

export interface ITracking extends Document {
  status: string;
  note?: string;
  order: IOrder["_id"];
  updatedBy: IUser["_id"];
  timestamp: Date;
}

const trackingSchema: Schema<ITracking> = new Schema(
  {
    status: { type: String, required: true },
    note: { type: String },
    order: { type: Schema.Types.ObjectId, ref: "Order", required: true },
    updatedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model<ITracking>("Tracking", trackingSchema);

import { Schema, model, models } from "mongoose";

const slotSchema = new Schema(
  {
    date: {
      type: Date,
      required: [true, "Date is required"],
    },
    slots: {
      "10am-11am": { type: Boolean, default: false },
      "11am-12pm": { type: Boolean, default: false },
      "12pm-1pm": { type: Boolean, default: false },
      "1pm-2pm": { type: Boolean, default: false },
    },
    bookedSlots: {
      type: [String], // Array of booked time slots
      default: [], 
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt
  }
);

export default models.Slot || model("Slot", slotSchema);

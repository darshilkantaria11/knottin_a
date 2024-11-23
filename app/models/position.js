// /models/position.js
import { Schema, model, models } from "mongoose";

const positionSchema = new Schema({
  positionName: {
    type: String,
    required: [true, "Position name is required"],
    trim: true,
  },
  shortDescription: {
    type: String,
    required: [true, "Short description is required"],
    trim: true,
  },
  longDescription: {
    type: String,
    required: [true, "Long description is required"],
    trim: true,
  },
  positionType: {
    type: String,
    enum: ["Full-time", "Part-time"], // Only allow these two options
    required: [true, "Position type is required"],
  },
  
}, {
  timestamps: true, // Automatically manage createdAt and updatedAt
});


export default models.Position || model("Position", positionSchema);

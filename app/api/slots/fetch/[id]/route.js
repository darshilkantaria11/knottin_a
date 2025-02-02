// /app/api/slots/fetch/[id]/route.js

import { dbConnect } from "../../../../utils/mongoose";
import Slot from "../../../../models/slot";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = await params;
  try {
    await dbConnect();

    // Get today's date at midnight (without time)
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Reset time to 00:00:00 for comparison

    // Automatically delete slots for today and earlier dates
    await Slot.deleteMany({ date: { $lte: currentDate } });

    // Fetch remaining slots
    const slots = await Slot.findById(id);
    return NextResponse.json(slots);
  } catch (error) {
    console.error("Error fetching slots:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

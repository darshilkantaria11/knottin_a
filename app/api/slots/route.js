// /app/api/slots/route.js

import { dbConnect } from '../../utils/mongoose';
import Slot from '../../models/slot';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        await dbConnect();

        // Get today's date at midnight (without time)
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0); // Reset time to 00:00:00 for comparison

        // Automatically delete slots for today and earlier dates
        await Slot.deleteMany({ date: { $lte: currentDate } }); // Delete all slots with a date today or earlier

        // Fetch remaining slots
        const slots = await Slot.find(); 
        return NextResponse.json(slots);
    } catch (error) {
        console.error('Error fetching slots:', error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

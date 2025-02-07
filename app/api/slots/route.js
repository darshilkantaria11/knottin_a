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

        // Sort slots object in each document
        const sortedSlots = slots.map(slot => {
            return {
                ...slot.toObject(),
                slots: {
                    "10am-11am": slot.slots["10am-11am"] ?? false,
                    "11am-12pm": slot.slots["11am-12pm"] ?? false,
                    "12pm-1pm": slot.slots["12pm-1pm"] ?? false,
                    "1pm-2pm": slot.slots["1pm-2pm"] ?? false,
                }
            };
        });

        return NextResponse.json(sortedSlots);
    } catch (error) {
        console.error('Error fetching slots:', error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// /app/api/slots/route.js

import { dbConnect } from '../../utils/mongoose';
import Slot from '../../models/slot';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        await dbConnect();
        const slots = await Slot.find(); // Fetch all slots from the database
        return NextResponse.json(slots);
    } catch (error) {
        console.error('Error fetching slots:', error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

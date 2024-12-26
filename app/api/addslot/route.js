// /app/api/addslot/route.js

import { dbConnect } from '../../utils/mongoose';
import Slot from '../../models/slot';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        await dbConnect();
        const { date, slots } = await req.json(); // Expecting date and slot availability (an object)

        // Ensure slots object has valid properties
        if (!slots || typeof slots !== 'object' || !Object.keys(slots).length) {
            return NextResponse.json({ error: 'Slots data is required' }, { status: 400 });
        }

        const newSlot = new Slot({
            date,
            slots,
        });

        await newSlot.save();
        return NextResponse.json({ message: 'Slot added successfully' }, { status: 201 });
    } catch (error) {
        console.error('Error:', error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

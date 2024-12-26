// /app/api/updateslot/[id]/route.js

import { dbConnect } from '../../../utils/mongoose';
import Slot from '../../../models/slot';
import { NextResponse } from 'next/server';

export async function PUT(req, { params }) {
    const { id } = params;

    try {
        await dbConnect();
        const { date, slots } = await req.json(); // Expecting updated date and slots object

        // Ensure slots data is valid
        if (!slots || typeof slots !== 'object' || !Object.keys(slots).length) {
            return NextResponse.json({ error: 'Slots data is required' }, { status: 400 });
        }

        const updatedSlot = await Slot.findByIdAndUpdate(id, {
            date,
            slots,
        }, { new: true });

        return NextResponse.json({ message: 'Slot updated successfully', slot: updatedSlot }, { status: 200 });
    } catch (error) {
        console.error('Error:', error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// /app/api/deleteslot/[id]/route.js

import { dbConnect } from '../../../utils/mongoose';
import Slot from '../../../models/slot';
import { NextResponse } from 'next/server';

export async function DELETE(req, { params }) {
    const { id } = params;

    try {
        await dbConnect();
        await Slot.findByIdAndDelete(id); // Delete slot by its ID
        return NextResponse.json({ message: 'Slot deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error:', error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

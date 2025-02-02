// /app/api/updateposition/[id]/route.js
import { dbConnect } from '../../../../utils/mongoose';
import Position from '../../../../models/position';
import { NextResponse } from 'next/server';

export async function PUT(req, { params }) {
    const { id } = await params;

    try {
        await dbConnect();
        const { positionName, shortDescription, longDescription, positionType } = await req.json();

        const updatedPosition = await Position.findByIdAndUpdate(id, {
            positionName,
            shortDescription,
            longDescription,
            positionType,
        }, { new: true });

        return NextResponse.json({ message: 'Position updated successfully', position: updatedPosition }, { status: 200 });
    } catch (error) {
        console.error('Error:', error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// /app/api/deleteposition/[id]/route.js
import { dbConnect } from '../../../utils/mongoose';
import Position from '../../../models/position';
import { NextResponse } from 'next/server';

export async function DELETE(req, { params }) {
    const { id } = params;

    try {
        await dbConnect();
        await Position.findByIdAndDelete(id);
        return NextResponse.json({ message: 'Position deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error:', error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

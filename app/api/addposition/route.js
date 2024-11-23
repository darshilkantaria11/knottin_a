
import { dbConnect } from '../../utils/mongoose';
import Position from '../../models/position';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        await dbConnect();
        const { positionName, shortDescription, longDescription, positionType } = await req.json();

        const newPosition = new Position({
            positionName,
            shortDescription,
            longDescription,
            positionType,
        });

        await newPosition.save();
        return NextResponse.json({ message: 'Position added successfully' }, { status: 201 });
    } catch (error) {
        console.error('Error:', error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

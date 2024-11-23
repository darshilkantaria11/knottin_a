import { dbConnect } from '../../utils/mongoose';
import Position from '../../models/position';
import { NextResponse } from 'next/server';

export async function GET() {
    
        await dbConnect();
        const positions = await Position.find(); // Fetch all positions from the database   
        return NextResponse.json(positions);
}

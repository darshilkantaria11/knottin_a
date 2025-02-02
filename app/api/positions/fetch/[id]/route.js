import { dbConnect } from '../../../../utils/mongoose';
import Position from '../../../../models/position';
import { NextResponse } from 'next/server';

export async function GET(req,{params}) {
        
        const {id} = await params;
    
        try {
            await dbConnect();
            const position = await Position.findById(id);

            if (!position) {
              return NextResponse.json({ message: 'Position not found' }, { status: 404 });
            }
        
            return NextResponse.json(position);
        } catch (error) {
            console.error(error);
            return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
        }
}
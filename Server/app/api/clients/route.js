import prisma from '../../../lib/prisma';
import {NextResponse} from 'next/server';

// GET ALL THE CLIENTS
export async function GET() {
    try{
        const clients = await prisma.client.findMany();
        console.log('Fetched clients:', clients);
        return NextResponse.json(clients, { status: 200 });
    }catch (error) {
        console.error('Error fetching clients:', error);
        return NextResponse.json({ error: 'Failed to fetch clients' }, { status: 500 }); 
    }
}

// CREATE A NEW CLIENT
export async function POST(request) {
    try {
        // Extract client data from the request body
        const { firstName, lastName, mobile } = await request.json();

        const newClient = await prisma.client.create({
            data: {firstName, lastName, mobile},
        });

        console.log('Created new client:', newClient);

        return NextResponse.json(newClient, { status: 201 });

    } catch (error) {
        console.error('Error creating client:', error);
        return NextResponse.json({ error: 'Failed to create client' }, { status: 500 });
    }
}


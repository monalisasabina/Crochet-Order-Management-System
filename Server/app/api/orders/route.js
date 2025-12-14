import prisma from '../../../lib/prisma';
import {NextResponse} from 'next/server';

// GET ALL THE ORDERS
export async function GET() {
    try{
        const orders = await prisma.order.findMany();
        console.log('Fetched orders:', orders);
        return NextResponse.json(orders, { status: 200 });
    }catch (error) {
        console.error('Error fetching orders:', error);
        return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 }); 
    }
}

// CREATE A NEW ORDER
export async function POST(request) {
    try {
        // Extract client data from the request body
        const { title, imageUrl, endDate, clientId } = await request.json();

        const newOrder = await prisma.order.create({
            data: {title, imageUrl, endDate, clientId},
        });

        console.log('Created new order:', newOrder);

        return NextResponse.json(newOrder, { status: 201 });

    } catch (error) {
        console.error('Error creating order:', error);
        return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
    }
}


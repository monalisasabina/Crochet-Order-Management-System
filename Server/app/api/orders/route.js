import prisma from '../../../lib/prisma';
import {NextResponse} from 'next/server';

// CORS HEADERS
const corsHeaders ={
    'Access-Control-Allow-Origin': 'http://localhost:4000',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

//Preflight request handler
export async function OPTIONS() {
    return new NextResponse(null, {
        status: 200,
        headers: corsHeaders
    });
}



// GET ALL THE ORDERS
export async function GET() {
    try{
        const orders = await prisma.order.findMany({
            include:{
                client: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                   }
               }
            }
        });

        console.log('Fetched orders:', orders);
        return NextResponse.json(orders, {
                                           status: 200 
                                        , headers: corsHeaders });
    }catch (error) {
        console.error('Error fetching orders:', error);
        return NextResponse.json(
            { error: 'Failed to fetch orders' }, 
            { status: 500, headers: corsHeaders }); 
    }
}

// CREATE A NEW ORDER
export async function POST(request) {
    try {
        // Extract client data from the request body
        const { title, imageUrl, endDate, clientId } = await request.json();

        const newOrder = await prisma.order.create({
            data: {
                title, 
                imageUrl, 
                endDate: new Date(endDate), 
                clientId: parseInt(clientId)},
        });

        console.log('Created new order:', newOrder);

        return NextResponse.json(newOrder, { status: 201, headers: corsHeaders });

    } catch (error) {
        console.error('Error creating order:', error);
        return NextResponse.json(
            { error: 'Failed to create order' },
            { status: 500, headers: corsHeaders });
    }
}


import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

// HELPER FUNCTIONS------------------------------------
// Get order ID from request URL
function getOrderId(request){
    const id = request.url.split("/").pop();

    const orderId = Number(id);

    return isNaN(orderId) ? null : orderId;
}

// Invalid order ID response
function invalidResponse(request){
    return NextResponse.json(
        { error: "Invalid order ID" },
        { status: 400 }
    )
}

// CRUD METHODS---------------------------------------
// FETCHING A SINGLE ORDER BY ID
export async function GET(request) {

    try{
    // Extracting order ID from the URL parameters
    const orderId = getOrderId(request);
    
    // Validating order ID
    if (!orderId) return invalidResponse();
    
    // Fetching the order by ID from the database
    const order = await prisma.order.findUnique({
        where: { id: Number(orderId) },
    });

    if (!order) {
        return NextResponse.json(
            { error: 'Order not found' },
            { status: 404 }
        );
    }

    // Returning response 
    return NextResponse.json(order, { status: 200 });
    } catch (error) {
        console.error('Error fetching order by ID:', error);
        return NextResponse.json({ error: 'Failed to fetch order' }, { status: 500 });
    }

}


// UPDATE AN EXISTING ORDER CREDENTIALS
export async function PATCH(request) {
    try {
        // Extracting client ID from the URL parameters
        const id = getOrderId(request);
        console.log('Order ID to update:', id);

        // Extracting client data from the request body
        const body = await request.json();

        const { title, imageUrl, endDate, clientId, isCompleted } = body;

        const updatedOrder = await prisma.order.update({

            // Number() converts string to integer
            where: { id: Number(id)},

            // only updates provided field
            data: { title, imageUrl, endDate, clientId, isCompleted },  
        })
                
        console.log('Updated order:', updatedOrder);

        return NextResponse.json(updatedOrder, { status: 200 });
        } catch (error) {
        console.error('Error updating order:', error);
        return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
    }
}

// DELETE AN ORDER BY ID
export async function DELETE(request) {
    try {
        const orderId = getOrderId(request);

        // Validating order ID
        if (!orderId) return invalidResponse();

        const deletedOrder = await prisma.order.delete({
            where: { id: Number(orderId) },
        });

        console.log('Deleted order:', deletedOrder);

        return NextResponse.json(deletedOrder, { status: 200 });
    } catch (error) {
        console.error('Error deleting order:', error);
        return NextResponse.json({ error: 'Failed to delete order' }, { status: 500 });
    }
}   
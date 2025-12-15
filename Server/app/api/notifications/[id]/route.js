import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

// CORS HEADERS
const corsHeaders ={
    'Access-Control-Allow-Origin': 'http://localhost:4000',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

//Preflight request handler
export async function OPTIONS() {
    return new NextResponse(null, {
        status: 200,
        headers: corsHeaders
    });
}


// HELPER FUNCTIONS------------------------------------
// Get Notification ID from request URL
function getNotificationId(request){
    const id = request.url.split("/").pop();

    const notificationId = Number(id);
    return isNaN(notificationId) ? null : notificationId;
}

// Invalid notification ID response
function invalidResponse(request){
    return NextResponse.json(
        { error: "Invalid notification ID" },
        { status: 400, header: corsHeaders }
    )
}

// CRUD METHODS---------------------------------------
// FETCHING A SINGLE NOTIFICATION BY ID
export async function GET(request) {

    try{
    // Extracting notification ID from the URL parameters
    const notificationId = getNotificationId(request);
    
    // Validating notification ID
    if (!notificationId) return invalidResponse();
    
    // Fetching the notification by ID from the database
    const notification = await prisma.notification.findUnique({
        where: { id: Number(notificationId) },
    });

    if (!notification) {
        return NextResponse.json(
            { error: 'Notification not found' },
            { status: 404, header: corsHeaders }
        );
    }

    // Returning response 
    return NextResponse.json(notification, { status: 200 });
    } catch (error) {
        console.error('Error fetching notification by ID:', error);
        return NextResponse.json({ error: 'Failed to fetch notification' }, { status: 500, header: corsHeaders });
    }
}

// UPDATE AN EXISTING NOTIFICATION
export async function PATCH(request) {
    try {
        // Extracting notification ID from the URL parameters
        const id = getNotificationId(request);
        console.log('Notification ID to update:', id);

        // Validating notification ID
        if (!id) return invalidResponse();

        // Extracting updated data from the request body
        const { message, isRead } = await request.json();

        const dataToUpdate = {};
        if (message) dataToUpdate.message = message;
        if (isRead !== undefined) dataToUpdate.isRead = isRead;

        // Updating the notification in the database
        const updatedNotification = await prisma.notification.update({
            where: { id: Number(id) },
            data: dataToUpdate,
        });

        console.log('Updated notification:', updatedNotification);

        return NextResponse.json(updatedNotification, { status: 200, header: corsHeaders });

    } catch (error) {
        console.error('Error updating notification:', error);
        return NextResponse.json({ error: 'Failed to update notification' }, { status: 500, header: corsHeaders });
    }               

}

// DELETE A NOTIFICATION
export async function DELETE(request) {
    try {
        // Extracting notification ID from the URL parameters
        const id = getNotificationId(request);
        console.log('Notification ID to delete:', id);

        // Validating notification ID
        if (!id) return invalidResponse();

        // Deleting the notification from the database
        await prisma.notification.delete({
            where: { id: Number(id) },
        });

        console.log('Deleted notification with ID:', id);

        return NextResponse.json(
            { message: 'Notification deleted successfully' },
            { status: 200, header: corsHeaders }
        );

    } catch (error) {
        console.error('Error deleting notification:', error);
        return NextResponse.json({ error: 'Failed to delete notification' }, { status: 500, header: corsHeaders });
    }               

}
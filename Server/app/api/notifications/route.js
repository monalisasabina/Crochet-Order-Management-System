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

// GET ALL THE NOTIFICATIONS
export async function GET() {
    try{
        const notifications = await prisma.notification.findMany();
        console.log('Fetched notifications:', notifications);

        return NextResponse.json(notifications, { status: 200, headers: corsHeaders });
    }catch (error) {
        console.error('Error fetching notifications:', error);
        return NextResponse.json({ error: 'Failed to fetch notifications' }, { status: 500, headers: corsHeaders}); 
    }
}

// CREATE A NEW NOTIFICATION
export async function POST(request) {
    try {
        // Extract notification data from the request body
        const { message } = await request.json();

        const newNotification = await prisma.notification.create({
            data: {message},
        });

        console.log('Created new notification:', newNotification);

        return NextResponse.json(newNotification, { status: 201, headers: corsHeaders});

    } catch (error) {
        console.error('Error creating notification:', error);
        return NextResponse.json({ error: 'Failed to create notification' }, { status: 500, headers: corsHeaders});
    }
}
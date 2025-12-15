import prisma from '../../../lib/prisma';
import {NextResponse} from 'next/server';
import bcrypt from 'bcryptjs';

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

// GET ALL THE ADMINS
export async function GET() {
    try{
        const admins = await prisma.admin.findMany();
        console.log('Fetched admins:', admins);

        return NextResponse.json(admins, { status: 200, headers: corsHeaders });
    }catch (error) {
        console.error('Error fetching admins:', error);
        return NextResponse.json({ error: 'Failed to fetch admins' }, { status: 500, headers: corsHeaders }); 
    }
}

// CREATE A NEW ADMIN
export async function POST(request) {
    try {
        // Extract client data from the request body
        const { firstName, lastName, userName, email, password } = await request.json();

        // Hashing the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newAdmin = await prisma.admin.create({
            data: {firstName, lastName, userName, email, password: hashedPassword},
        });

        // Not exposing the password
        const { password: _, ...adminWithoutPassword } = newAdmin;

        console.log('Created new admin:', adminWithoutPassword);

        return NextResponse.json(adminWithoutPassword, { status: 201, headers: corsHeaders });

    } catch (error) {
        console.error('Error creating admin:', error);
        return NextResponse.json({ error: 'Failed to create admin' }, { status: 500, headers: corsHeaders });
    }
}
import prisma from '../../../lib/prisma';
import {NextResponse} from 'next/server';
import bcrypt from 'bcryptjs';

// GET ALL THE ADMINS
export async function GET() {
    try{
        const admins = await prisma.admin.findMany();
        console.log('Fetched admins:', admins);

        return NextResponse.json(admins, { status: 200 });
    }catch (error) {
        console.error('Error fetching admins:', error);
        return NextResponse.json({ error: 'Failed to fetch admins' }, { status: 500 }); 
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

        return NextResponse.json(adminWithoutPassword, { status: 201 });

    } catch (error) {
        console.error('Error creating admin:', error);
        return NextResponse.json({ error: 'Failed to create admin' }, { status: 500 });
    }
}
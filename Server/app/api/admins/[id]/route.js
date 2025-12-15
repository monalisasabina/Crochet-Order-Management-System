import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';
import bcrypt from 'bcryptjs';

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
// Get Admin ID from request URL
function getAdminId(request){
    const id = request.url.split("/").pop();

    const adminId = Number(id);
    return isNaN(adminId) ? null : adminId;
}

// Invalid admin ID response
function invalidResponse(request){
    return NextResponse.json(
        { error: "Invalid admin ID" },
        { status: 400, header: corsHeaders }
    )
}

// CRUD METHODS---------------------------------------
// FETCHING A SINGLE ADMIN BY ID
export async function GET(request) {

    try{
    // Extracting admin ID from the URL parameters
    const adminId = getAdminId(request);
    
    // Validating admin ID
    if (!adminId) return invalidResponse();
    
    // Fetching the admin by ID from the database
    const admin = await prisma.admin.findUnique({
        where: { id: Number(adminId) },
    });

    if (!admin) {
        return NextResponse.json(
            { error: 'Admin not found' },
            { status: 404, headers: corsHeaders }
        );
    }

    // Returning response 
    return NextResponse.json(admin, { status: 200,  });
    } catch (error) {
        console.error('Error fetching admin by ID:', error);
        return NextResponse.json({ error: 'Failed to fetch admin' }, { status: 500, headers: corsHeaders });
    }

}

// UPDATE AN EXISTING ADMIN CREDENTIALS
export async function PATCH(request) {
    try {
        // Extracting client ID from the URL parameters
        const id = getAdminId(request);
        console.log('Admin ID to update:', id);

        // Validating admin ID
        if (!id) return invalidResponse();

        // Extracting updated data from the request body
        const { firstName, lastName, userName, email, password } = await request.json();

        // Preparing data object for update
        const dataToUpdate = { firstName, lastName, userName, email };

        // If password is provided, hash it before updating
        if (password) {
            
            const hashedPassword = await bcrypt.hash(password, 10);
            dataToUpdate.password = hashedPassword;
        }

        // Updating the admin in the database
        const updatedAdmin = await prisma.admin.update({
            where: { id: Number(id) },
            data: dataToUpdate,
        });

        console.log('Updated admin:', updatedAdmin);

        return NextResponse.json(updatedAdmin, { status: 200, headers: corsHeaders });

    } catch (error) {
        console.error('Error updating admin:', error);
        return NextResponse.json({ error: 'Failed to update admin' }, { status: 500, headers: corsHeaders });
    }
}

// DELETE AN ADMIN BY ID
export async function DELETE(request) {
    try {
        const adminId = getAdminId(request);

        // Validating admin ID
        if (!adminId) return invalidResponse();

        const deletedAdmin = await prisma.admin.delete({
            where: { id: Number(adminId) },
        });
        
        // STRIPPING PASSWORD BEFORE SENDING RESPONSE
        const { password: _, ...adminWithoutPassword } = deletedAdmin;

      
        // console.log('Deleted admin:', deletedAdmin);

        return NextResponse.json(adminWithoutPassword, { status: 200 });
    } catch (error) {
        if (error.code === 'P2025') {
            return NextResponse.json(
                { error: 'Admin not found' },
                { status: 404, headers: corsHeaders }
            );
        }
        console.error('Error deleting admin:', error);
        return NextResponse.json({ error: 'Failed to delete admin' }, { status: 500, headers: corsHeaders});
    }
}
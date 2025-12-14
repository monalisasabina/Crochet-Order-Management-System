import prisma from "../../../../lib/prisma";
import {NextResponse} from 'next/server';


// FETCHING A SINGLE CLIENT BY ID
export async function GET(request) {

    try{
    //Extracting client ID from the URL parameters 
    const id = request.url.split("/").pop();

    // Validating the extracted ID
    if (!id || isNaN(Number(id))) {
        return NextResponse.json(
            { error: "Invalid client ID" },
            { status: 400 }
        );
    }
    
    // Fetching the client by ID from the database
    const client = await prisma.client.findUnique({
        where: { id: Number(id) },
    });

    // Returning response 
    return NextResponse.json(client, { status: 200 });
    } catch (error) {
        console.error('Error fetching client by ID:', error);
        return NextResponse.json({ error: 'Failed to fetch client' }, { status: 500 });
    }

}



// UPDATE AN EXISTING CLIENT CREDENTIALS
export async function PATCH(request) {
    try {
        // Extracting client ID from the URL parameters
        const id = request.url.split("/").pop();

         if (!id || isNaN(Number(id))) {
            return NextResponse.json(
                { error: 'Invalid client ID' }, 
                { status: 400 });
        }

        // Extracting client data from the request body
        const body = await request.json();

        const updatedClient = await prisma.client.update({

            // Number() converts string to integer
            where: { id: Number(id)},

            // only updates provided field
            data: body,  
        })

        console.log('Updated client:', updatedClient);

        return NextResponse.json(updatedClient, { status: 200 });
        } catch (error) {
        console.error('Error updating client:', error);
        return NextResponse.json({ error: 'Failed to update client' }, { status: 500 });
    }
}


// DELETE A CLIENT BY ID
export async function DELETE(request) {
    try {
        // Extracting client ID from the URL parameters
        const id = request.url.split("/").pop();

         if (!id || isNaN(Number(id))) {
            return NextResponse.json(
                { error: 'Invalid client ID' }, 
                { status: 400 });
        }

        const deletedClient = await prisma.client.delete({
            where: { id: Number(id) },
        });

        console.log('Deleted client:', deletedClient);

        return NextResponse.json(deletedClient, { status: 200 });
    } catch (error) {
        console.error('Error deleting client:', error);
        return NextResponse.json({ error: 'Failed to delete client' }, { status: 500 });
    }
}   
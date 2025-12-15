import prisma from "../../../../lib/prisma";
import {NextResponse} from 'next/server';

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
// Get client ID from request URL
function getClientId(request){
    const id = request.url.split("/").pop();

    const clientId = Number(id);

    return isNaN(clientId) ? null : clientId;
}

// Invalid client ID response
function invalidResponse(request){
    return NextResponse.json(
        { error: "Invalid client ID" },
        { status: 400, header: corsHeaders }
    )
}

// CRUD METHODS---------------------------------------
// FETCHING A SINGLE CLIENT BY ID
export async function GET(request) {

    try{
    // Extracting client ID from the URL parameters
    const clientId = getClientId(request);
    
    // Validating client ID
    if (!clientId) return invalidResponse();
    
    // Fetching the client by ID from the database
    const client = await prisma.client.findUnique({
        where: { id: Number(clientId) },
    });

    if (!client) {
        return NextResponse.json(
            { error: 'Client not found' },
            { status: 404, header: corsHeaders }
        );
    }

    // Returning response 
    return NextResponse.json(client, { status: 200, header: corsHeaders });
    } catch (error) {
        console.error('Error fetching client by ID:', error);
        return NextResponse.json({ error: 'Failed to fetch client' }, { status: 500, header: corsHeaders });
    }

}


// UPDATE AN EXISTING CLIENT CREDENTIALS
export async function PATCH(request) {
    try {
        // Extracting client ID from the URL parameters
        const clientId = getClientId(request);

        // Validating client ID
        if (!clientId) return invalidResponse();

        // Extract updated client data from the request body
        const updatedClient = await prisma.client.update({
            // Number() converts string to integer
            where: { id: clientId },
            data: await request.json(),  
        });
        console.log('Updated client:', updatedClient);

        return NextResponse.json(updatedClient, { status: 200, header: corsHeaders });
        } catch (error) {
        console.error('Error updating client:', error);
        return NextResponse.json({ error: 'Failed to update client' }, { status: 500, header: corsHeaders });
    }
}


// DELETE A CLIENT BY ID
export async function DELETE(request) {
    try {
        const clientId = getClientId(request);

        if (!clientId) return invalidResponse();

        const removedClient = await prisma.client.delete({
            where: { id: clientId },
        });
        console.log('Deleted client:', removedClient);

        return NextResponse.json(removedClient, { status: 200, header: corsHeaders });
    } catch (error) {
        console.error('Error deleting client:', error);
        return NextResponse.json({ error: 'Failed to delete client' }, { status: 500, header: corsHeaders });
    }
}   
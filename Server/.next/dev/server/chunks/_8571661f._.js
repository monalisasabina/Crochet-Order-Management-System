module.exports = [
"[project]/lib/prisma.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dotenv$2f$config$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/dotenv/config.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$adapter$2d$better$2d$sqlite3$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@prisma/adapter-better-sqlite3/dist/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$generated$2f$prisma$2f$client$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/generated/prisma/client.js [app-route] (ecmascript)");
;
;
;
const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$adapter$2d$better$2d$sqlite3$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PrismaBetterSqlite3"]({
    url: connectionString
});
const prisma = new __TURBOPACK__imported__module__$5b$project$5d2f$generated$2f$prisma$2f$client$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PrismaClient"]({
    adapter
});
const __TURBOPACK__default__export__ = prisma;
}),
"[project]/app/api/orders/[id]/route.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DELETE",
    ()=>DELETE,
    "GET",
    ()=>GET,
    "OPTIONS",
    ()=>OPTIONS,
    "PATCH",
    ()=>PATCH
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/prisma.ts [app-route] (ecmascript)");
;
;
// CORS HEADERS
const corsHeaders = {
    'Access-Control-Allow-Origin': 'http://localhost:4000',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
};
async function OPTIONS() {
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"](null, {
        status: 200,
        headers: corsHeaders
    });
}
// HELPER FUNCTIONS------------------------------------
// Get order ID from request URL
function getOrderId(request) {
    const id = request.url.split("/").pop();
    const orderId = Number(id);
    return isNaN(orderId) ? null : orderId;
}
// Invalid order ID response
function invalidResponse(request) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        error: "Invalid order ID"
    }, {
        status: 400,
        headers: corsHeaders
    });
}
async function GET(request) {
    try {
        // Extracting order ID from the URL parameters
        const orderId = getOrderId(request);
        // Validating order ID
        if (!orderId) return invalidResponse();
        // Fetching the order by ID from the database
        const order = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].order.findUnique({
            where: {
                id: Number(orderId)
            }
        });
        if (!order) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Order not found'
            }, {
                status: 404,
                headers: corsHeaders
            });
        }
        // Returning response 
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(order, {
            status: 200,
            headers: corsHeaders
        });
    } catch (error) {
        console.error('Error fetching order by ID:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Failed to fetch order'
        }, {
            status: 500,
            headers: corsHeaders
        });
    }
}
async function PATCH(request) {
    try {
        // Extracting client ID from the URL parameters
        const id = getOrderId(request);
        console.log('Order ID to update:', id);
        // Extracting client data from the request body
        const body = await request.json();
        const { title, imageUrl, endDate, clientId, isCompleted } = body;
        const updatedOrder = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].order.update({
            // Number() converts string to integer
            where: {
                id: Number(id)
            },
            // only updates provided field
            data: {
                title,
                imageUrl,
                endDate,
                clientId,
                isCompleted
            }
        });
        console.log('Updated order:', updatedOrder);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(updatedOrder, {
            status: 200,
            headers: corsHeaders
        });
    } catch (error) {
        console.error('Error updating order:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Failed to update order'
        }, {
            status: 500,
            headers: corsHeaders
        });
    }
}
async function DELETE(request) {
    try {
        const orderId = getOrderId(request);
        // Validating order ID
        if (!orderId) return invalidResponse();
        const deletedOrder = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].order.delete({
            where: {
                id: Number(orderId)
            }
        });
        console.log('Deleted order:', deletedOrder);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(deletedOrder, {
            status: 200,
            headers: corsHeaders
        });
    } catch (error) {
        console.error('Error deleting order:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Failed to delete order'
        }, {
            status: 500,
            headers: corsHeaders
        });
    }
}
}),
];

//# sourceMappingURL=_8571661f._.js.map
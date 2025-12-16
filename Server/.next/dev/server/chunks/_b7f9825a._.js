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
"[project]/app/api/notifications/[id]/route.js [app-route] (ecmascript)", ((__turbopack_context__) => {
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
// Get Notification ID from request URL
function getNotificationId(request) {
    const id = request.url.split("/").pop();
    const notificationId = Number(id);
    return isNaN(notificationId) ? null : notificationId;
}
// Invalid notification ID response
function invalidResponse(request) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        error: "Invalid notification ID"
    }, {
        status: 400,
        headers: corsHeaders
    });
}
async function GET(request) {
    try {
        // Extracting notification ID from the URL parameters
        const notificationId = getNotificationId(request);
        // Validating notification ID
        if (!notificationId) return invalidResponse();
        // Fetching the notification by ID from the database
        const notification = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].notification.findUnique({
            where: {
                id: Number(notificationId)
            }
        });
        if (!notification) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Notification not found'
            }, {
                status: 404,
                header: corsHeaders
            });
        }
        // Returning response 
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(notification, {
            status: 200,
            headers: corsHeaders
        });
    } catch (error) {
        console.error('Error fetching notification by ID:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Failed to fetch notification'
        }, {
            status: 500,
            headers: corsHeaders
        });
    }
}
async function PATCH(request) {
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
        const updatedNotification = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].notification.update({
            where: {
                id: Number(id)
            },
            data: dataToUpdate
        });
        console.log('Updated notification:', updatedNotification);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(updatedNotification, {
            status: 200,
            headers: corsHeaders
        });
    } catch (error) {
        console.error('Error updating notification:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Failed to update notification'
        }, {
            status: 500,
            headers: corsHeaders
        });
    }
}
async function DELETE(request) {
    try {
        // Extracting notification ID from the URL parameters
        const id = getNotificationId(request);
        console.log('Notification ID to delete:', id);
        // Validating notification ID
        if (!id) return invalidResponse();
        // Deleting the notification from the database
        await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].notification.delete({
            where: {
                id: Number(id)
            }
        });
        console.log('Deleted notification with ID:', id);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            message: 'Notification deleted successfully'
        }, {
            status: 200,
            headers: corsHeaders
        });
    } catch (error) {
        console.error('Error deleting notification:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Failed to delete notification'
        }, {
            status: 500,
            headers: corsHeaders
        });
    }
}
}),
];

//# sourceMappingURL=_b7f9825a._.js.map
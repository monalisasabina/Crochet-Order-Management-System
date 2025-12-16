import prisma from "../../../../lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"; // ✅ use bcrypt for password hashing
import jwt from "jsonwebtoken"; // ✅ optional, for issuing tokens

// JWT
// RUN: npm install jsonwebtoken

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

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    // 1. Find admin by email
    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin) {
      return NextResponse.json(
        { error: "Invalid credentials" }, 
        { status: 401, headers: corsHeaders });
    }

    // 2. Compare password
    const isValid = await bcrypt.compare(password, admin.password);
    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401, headers: corsHeaders });
    }

    // 3. Issue token (optional)
    const token = jwt.sign(
      { id: admin.id, email: admin.email },
      process.env.JWT_SECRET, // store secret in .env
      { expiresIn: "1h" }
    );

    return NextResponse.json(
      { message: "Login successful", token },
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Failed to login" }, { status: 500, headers: corsHeaders });
  }
}
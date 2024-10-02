// lib/cors.js
import { NextResponse } from "next/server";

export function cors(req: any) {
  const origin =
    process.env.NODE_ENV === "development"
      ? "http://localhost:8081"
      : "https://your-production-domain.com"; // Update with your production domain

  const response = NextResponse.next(); // Create a new NextResponse

  // Set CORS headers
  response.headers.set("Access-Control-Allow-Origin", origin);
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight (OPTIONS) requests
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  return response;
}

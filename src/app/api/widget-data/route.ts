// src/app/api/widget-data/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {   
    
    const response = NextResponse.json({ message: 'Hello from your Next.js widget!' });
    // Add CORS headers
    response.headers.set('Access-Control-Allow-Origin', '*'); // Allow all origins
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type');

    return response;
}

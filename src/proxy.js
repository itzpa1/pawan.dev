import { NextResponse } from 'next/server';

export function proxy(request) {
  // Skip API protection in development when using mock data
  if (process.env.NODE_ENV === 'development') {
    return NextResponse.next();
  }

  // Protect API routes in production
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const apiKey = request.headers.get('x-api-key');
    
    if (!apiKey || apiKey !== process.env.API_KEY) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
};
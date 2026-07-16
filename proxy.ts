import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server'; 

export async function proxy(request: NextRequest) { 
  const { pathname } = request.nextUrl;
  
  const token = 
    request.cookies.get('better-auth.session_token')?.value || 
    request.cookies.get('__Secure-better-auth.session_token')?.value ||  
    request.cookies.get('__secure-better-auth.session_token')?.value ||  
    request.cookies.get('better-auth.session')?.value || 
    request.cookies.get('__Secure-better-auth.session')?.value ||
    request.cookies.get('__secure-better-auth.session')?.value;

  console.log('--- Middleware Check ---');
  console.log('Pathname:', pathname);
  console.log('All cookies:', request.cookies.getAll().map(c => c.name)); 
  console.log('Detected Token:', token ? "Yes" : "No");

  // /dashboard এর জায়গায় /admin করা হয়েছে, কারণ আপনার ম্যাচার ও রুট হচ্ছে /admin
  if (!token && pathname.startsWith("/admin")) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname); 
    return NextResponse.redirect(loginUrl);
  }

  if (token && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(new URL('/', request.url)); 
  }

  return NextResponse.next();
}
 
export const config = {
  matcher: ['/admin/:path*', '/login', '/register'] 
};
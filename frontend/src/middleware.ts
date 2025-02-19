import {NextResponse } from "next/server";
import { NextRequest } from "next/server";
export default async function middleware(request: NextRequest){
    const baseURL = request.nextUrl.origin
    const homePage = new URL ('/', baseURL)
    const query = request.nextUrl.searchParams;
    const email = query.get('email');
    if(request.nextUrl.pathname !== '/'){
        if(!email){
            return NextResponse.redirect(homePage)
        }
    }
    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
        * Match all request paths except for the ones starting with:
        * - api (API routes)
        * - _next/static (static files)
        * - _next/image (image optimization files)
        * - favicon.ico (favicon file)
        */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ]
}
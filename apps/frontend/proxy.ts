import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("jwt_token")?.value;
  //console.log("token", token);

  const encodedRole = request.cookies.get('role')?.value;
  //console.log("encodedRole", encodedRole);
  
  let role: string | null = null;
  
  if (encodedRole) {
    try {
      // Remove 's:' prefix if present and split by '.' to get the base64 part
      const cookieValue = encodedRole.startsWith('s:') 
        ? encodedRole.slice(2) 
        : encodedRole;
      
      const base64Part = cookieValue.split('.')[0];
      
      // Decode from Base64
      const decodedJson = Buffer.from(base64Part, 'base64').toString('utf-8');
      
      // Parse the JSON
      const roleData = JSON.parse(decodedJson);
      
      // console.log("roleData is: ", roleData); 
      // console.log("roleData.message", roleData.message);
      role = roleData.message;
    } catch (error) {
      console.error("Error decoding role:", error);
    }
  }

  // If user is logged in and tries to access /login, redirect based on role
  if (token && pathname === "/login") {
    if (role === "employee") {
      return NextResponse.redirect(new URL("/screenshots", request.url));
    }
    if (role === "admin" || role === "owner") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  // If user is logged in and tries to access /register, redirect based on role
  if (token && pathname === "/register") {
    if (role === "employee") {
      return NextResponse.redirect(new URL("/screenshots", request.url));
    }
    if (role === "admin" || role === "owner") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  // Not logged in - redirect to login
  if (!token && (pathname.startsWith("/dashboard") || pathname.startsWith("/screenshots"))) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Admin/Owner trying to access employee-only page
  if ((role === "admin" || role === "owner") && pathname.startsWith("/screenshots")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Employee trying to access admin-only page
  if (role === "employee" && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/screenshots", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/screenshots/:path*", "/login", "/register"],
};
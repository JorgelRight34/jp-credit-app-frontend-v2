import { NextRequest, NextResponse } from "next/server";
import { ACCESS_TOKEN } from "./utils";
import { isJwtValid } from "./utils/auth-utils";

export async function proxy(request: NextRequest) {
    const token = request.cookies.get(ACCESS_TOKEN)?.value;

    if (isJwtValid(token)) {
        return NextResponse.next()
    }

    return NextResponse.redirect(new URL("/login", request.url))
}

export const config = {
    matcher: [
        '/((?!login).*)'
    ]
};
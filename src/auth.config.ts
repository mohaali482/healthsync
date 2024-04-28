import type { NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";

export const authConfig = {
    pages: {
        signIn: "/login",
    },
    callbacks: {
        authorized({ auth, request: req }) {
            const isAuth = !!auth?.user;

            const isAuthPage = req.nextUrl.pathname.startsWith("/login");

            if (isAuthPage) {
                if (isAuth) {
                    return NextResponse.redirect(
                        new URL("/dashboard", req.url)
                    );
                }

                return NextResponse.next();
            }

            if (!isAuth) {
                let from = req.nextUrl.pathname;
                if (req.nextUrl.search) {
                    from += req.nextUrl.search;
                }

                return NextResponse.redirect(
                    new URL(`/login?from=${encodeURIComponent(from)}`, req.url)
                );
            }
            return NextResponse.next();
        },
    },
    providers: [],
} satisfies NextAuthConfig;

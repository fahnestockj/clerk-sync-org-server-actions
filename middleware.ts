import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// This Middleware does not protect any routes by default.
// See https://clerk.com/docs/references/nextjs/clerk-middleware for more information about configuring your Middleware
export default clerkMiddleware(
  async (auth, req) => {
    return NextResponse.next()
  },
  {
    organizationSyncOptions: {
      organizationPatterns: [
        '/:slug', // Match the org slug
        '/:slug/(.*)', // Wildcard match for optional trailing path segments
      ],
    },
    debug: true,
  },
)

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};

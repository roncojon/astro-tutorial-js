import { allowedOrigins, checkOrigin } from "@/utils/originUtils";
import type { APIRoute } from "astro";

export const prerender = false;
export const GET: APIRoute = async ({request, redirect, cookies }) => {
   // Check the origin of the request
   if (!checkOrigin(request, allowedOrigins)) {
    return new Response(JSON.stringify({ error: 'Forbidden' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  
  cookies.delete("__session", {
    path: "/",
  });
  return redirect("/signin");
};
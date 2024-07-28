import type { APIRoute } from "astro";
import { serverApp } from "../../../firebase/server";
import { getAuth } from "firebase-admin/auth";

export const prerender = false;
export const GET: APIRoute = async ({ cookies }) => {
  const auth = getAuth(serverApp);

  const sessionCookie = cookies.get("__session")?.value;
  if (!sessionCookie) {
    return new Response(
      JSON.stringify({ isAuthenticated: false }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    await auth.verifySessionCookie(sessionCookie);
    return new Response(
      JSON.stringify({ isAuthenticated: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ isAuthenticated: false }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

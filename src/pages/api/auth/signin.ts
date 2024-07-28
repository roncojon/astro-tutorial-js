import type { APIRoute } from "astro";
import { serverApp } from "../../../firebase/server";
import { getAuth } from "firebase-admin/auth";
import { allowedOrigins, checkOrigin } from "@/utils/originUtils";

export const prerender = false;
export const GET: APIRoute = async ({ request, cookies, redirect }) => {
  if (!checkOrigin(request, allowedOrigins)) {
    return new Response(JSON.stringify({ error: 'Forbidden' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  const auth = getAuth(serverApp);

  /* Get token from request headers */
  const idToken = request.headers.get("Authorization")?.split("Bearer ")[1];
  if (!idToken) {
    return new Response(
      "No token found",
      { status: 401 }
    );
  }

  /* Verify id token */
  try {
    await auth.verifyIdToken(idToken);
  } catch (error) {
    return new Response(
      "Invalid token",
      { status: 401 }
    );
  }

  /* Create and set session cookie */
  const fiveDays = 60 * 60 * 24 * 5 * 1000;
  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: fiveDays,
  });

  cookies.set("__session", sessionCookie, {
    path: "/",
  });

  const redirectTo = new URL(request.url).searchParams.get('redirect') || '/dashboard';
  return redirect(redirectTo);
};

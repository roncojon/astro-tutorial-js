import type { APIRoute } from "astro";
import { getAuth } from "firebase-admin/auth";
import { serverApp } from "../../../firebase/server";
import { allowedOrigins, checkOrigin } from "@/utils/originUtils";

export const prerender = false;

export const POST: APIRoute = async ({ request, redirect }) => {
    if (!checkOrigin(request, allowedOrigins)) {
        return new Response(JSON.stringify({ error: 'Forbidden' }), {
            status: 403,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const auth = getAuth(serverApp);

    // Get the session cookie from request headers
    const sessionCookie = request.headers.get('Cookie')?.split('session=')[1];

    if (!sessionCookie) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    try {
        // Verify the session cookie
        const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);
        console.log('Authenticated user:', decodedClaims.email);

        // You can now use the email or any other user information
        if(decodedClaims.email!=='roncojon94@gmail.com') {
            return new Response("Unauthorized", { status: 401 });
        }
        // for the rest of your logic here

    } catch (error) {
        console.error('Error verifying session cookie:', error);
        return new Response("Unauthorized", { status: 401 });
    }

    const formData = await request.formData();
    console.log('Form Data:', formData);

    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();
    const name = formData.get("name")?.toString();

    if (!email || !password || !name) {
        return new Response("Missing form data", { status: 400 });
    }

    try {
        await auth.createUser({ email, password, displayName: name });
        console.log('User created successfully');
    } catch (error: any) {
        console.error('Error creating user:', error);
        return new Response("Something went wrong", { status: 400 });
    }

    return redirect("/signin");
};

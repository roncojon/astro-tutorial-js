import type { APIRoute } from "astro";
import { getAuth } from "firebase-admin/auth";
import { serverApp } from "../../../firebase/server";

export const prerender = false;

export const POST: APIRoute = async ({ request, redirect }) => {
    const auth = getAuth(serverApp);
    
    const formData = await request.formData();

    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();
    const name = formData.get("name")?.toString();

    if (!email || !password || !name) {
        return new Response("Missing form data", { status: 400 });
    }

    try {
        await auth.createUser({ email, password, displayName: name });
    } catch (error: any) {
        console.error('Error creating user:', error);
        return new Response("Something went wrong", { status: 400 });
    }

    return redirect("/signin");
};

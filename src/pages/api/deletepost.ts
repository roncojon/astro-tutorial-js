import type { APIRoute } from 'astro';
import { getFirestore } from 'firebase-admin/firestore';
import { serverApp } from '../../firebase/server';
import { allowedOrigins, checkOrigin } from '@/utils/originUtils';
import { getAuth } from 'firebase-admin/auth';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  if (!checkOrigin(request, allowedOrigins)) {
    return new Response(JSON.stringify({ error: 'Forbidden' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }

    /* Check if the user is authenticated */
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
    
  try {
    const { id } = await request.json();
    const db = getFirestore(serverApp);
    const postRef = db.collection('posts').doc(id);

    await postRef.delete();

    return new Response(JSON.stringify({ message: 'Post deleted successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Error deleting post:', err);
    return new Response(JSON.stringify({ error: 'Error deleting post' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

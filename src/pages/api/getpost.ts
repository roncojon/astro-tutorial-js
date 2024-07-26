// Import necessary modules and functions
import type { APIRoute } from 'astro';
import { getFirestore } from 'firebase-admin/firestore';
import { allowedOrigins, checkOrigin } from '@/utils/originUtils';
import { serverApp } from '@/firebase/server';

// Disable prerendering for this route
export const prerender = false;

// Define the GET route for fetching a post
export const GET: APIRoute = async ({ request }) => {
  // Check the origin of the request
  if (!checkOrigin(request, allowedOrigins)) {
    return new Response(JSON.stringify({ error: 'Forbidden' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Extract the post ID from the request URL
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  try {
    // Initialize Firestore
    const db = getFirestore(serverApp);

    // Get a reference to the post document
    const postRef = db.collection('posts').doc(id ?? '');

    // Fetch the post document
    const doc = await postRef.get();

    // If the post doesn't exist, return a 404 response
    if (!doc.exists) {
      return new Response(JSON.stringify({ error: 'Post not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // If the post exists, return it in the response
    return new Response(JSON.stringify(doc.data()), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    // If there's an error, return a 500 response
    return new Response(JSON.stringify({ error: 'Error fetching post' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
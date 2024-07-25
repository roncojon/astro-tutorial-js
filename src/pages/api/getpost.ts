import type { APIRoute } from 'astro';
import { getFirestore } from 'firebase-admin/firestore';
// import { serverApp } from '../../firebase/server';
import { allowedOrigins, checkOrigin } from '@/utils/originUtils';
import { serverApp } from '@/firebase/server';

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  if (!checkOrigin(request, allowedOrigins)) {
    return new Response(JSON.stringify({ error: 'Forbidden' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  try {
    const db = getFirestore(serverApp);
    const postRef = db.collection('posts').doc(id ?? '');
    const doc = await postRef.get();

    if (!doc.exists) {
      return new Response(JSON.stringify({ error: 'Post not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify(doc.data()), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Error fetching post' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

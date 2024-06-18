import type { APIRoute } from 'astro';
import { app } from '../../firebase/server';
import { getFirestore } from "firebase-admin/firestore";

// import { getFirestore, collection, addDoc } from 'firebase/firestore';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  // console.log('requestrequest', request);

  try {
    const db = getFirestore(app);

    const postData = await request.json();
    console.log('postDatapostData', postData);

    const postRef = await db.collection('posts');
    await postRef.add({
      title:postData.title,
      content:postData.content,
    });
    return new Response(JSON.stringify({ id: postRef.id }), {
      status: 200,
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: 'Error creating post' }), {
      status: 500,
    });
  }
}

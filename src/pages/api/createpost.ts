import type { APIRoute } from 'astro';
import { serverApp } from '../../firebase/server';
import { getFirestore } from 'firebase-admin/firestore';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  console.log('Received request:', request);

  try {
    const db = getFirestore(serverApp);

    const postData = await request.json();
    console.log('Post data:', postData);

    const postRef = await db.collection('posts').add({
      title: postData.title,
      content: postData.content,
    });
    console.log('Firestore reference:', db);
    console.log('Firestore collection (posts):', db.collection('posts'));

    // Determine the base URL
    const baseUrl = process.env.MY_WEBSITE_URL ? `https://${process.env.MY_WEBSITE_URL}` : 
    (import.meta.env.MY_WEBSITE_URL ? `https://${import.meta.env.MY_WEBSITE_URL}` : 'http://localhost:4321');
    console.log('process.env.MY_WEBSITE_URL',process.env.MY_WEBSITE_URL)
    console.log('import.meta.env.MY_WEBSITE_URL',import.meta.env.MY_WEBSITE_URL)
    const redeployUrl = `${baseUrl}/api/redeploy`;

    // Call the redeploy endpoint
    const redeployResponse = await fetch(redeployUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });

    console.log('Redeploy response:', redeployResponse);
    if (!redeployResponse.ok) {
      const errorBody = await redeployResponse.text();
      throw new Error(`Redeploy failed: ${redeployResponse.statusText} - ${errorBody}`);
    }

    const redeployData = await redeployResponse.json();
    console.log('Redeploy data:', redeployData);

    return new Response(JSON.stringify({ id: postRef.id }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    console.error('Error creating post:', err);
    return new Response(JSON.stringify({ error: 'Error creating post' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

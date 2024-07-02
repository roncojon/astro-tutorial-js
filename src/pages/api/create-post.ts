import type { APIRoute } from 'astro';
import { serverApp } from '../../firebase/server';
import { getFirestore } from "firebase-admin/firestore";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  console.log('requestrequest', request);

  try {
    const db = getFirestore(serverApp);

    const postData = await request.json();
    console.log('postDatapostData', postData);

    const postRef = await db.collection('posts').add({
      title: postData.title,
      content: postData.content,
    });
    console.log('dbdbdb', db);
    console.log('dbCollectionPosts', db.collection('posts'));

    // Call the redeploy endpoint
    const redeployResponse = await fetch('/api/redeploy').then((res) => { console.log('aaaaaaaaares',res);return res.json()});
    // , {
      // method: "GET",
      // headers: {
      //   Authorization: `Bearer ${idToken}`,
      // },
    // });
console.log('redeployResponse', redeployResponse);
    if (!redeployResponse.ok) {
      throw new Error(`Redeploy failed: ${redeployResponse.statusText}`);
    }

    const redeployData = await redeployResponse.json();
    console.log('redeployData', redeployData);

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

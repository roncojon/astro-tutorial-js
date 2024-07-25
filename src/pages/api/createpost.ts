import type { APIRoute } from 'astro';
import { serverApp } from '../../firebase/server';
import { getFirestore } from 'firebase-admin/firestore';
import { v2 as cloudinary } from 'cloudinary';
import { JSDOM } from 'jsdom';
import { allowedOrigins, checkOrigin } from '@/utils/originUtils';

cloudinary.config({
  cloud_name: import.meta.env.CLOUDINARY_CLOUD_NAME,
  api_key: import.meta.env.CLOUDINARY_API_KEY,
  api_secret: import.meta.env.CLOUDINARY_API_SECRET,
});

export const prerender = false;

const uploadImage = async (base64String: string) => {
  try {
    const result = await cloudinary.uploader.upload(base64String);
    return result.secure_url; // This is the URL of the uploaded image
  } catch (err) {
    console.error(err);
    throw new Error('Error uploading image');
  }
};

const processHtmlContent = async (htmlContent: string) => {
  const dom = new JSDOM(htmlContent);
  const document = dom.window.document;
  const images = document.querySelectorAll('img');

  for (const img of images) {
    const src = img.getAttribute('src');
    if (src && src.startsWith('data:image/')) {
      const imageUrl = await uploadImage(src);
      img.setAttribute('src', imageUrl);
    }
  }

  return document.documentElement.outerHTML;
};

export const POST: APIRoute = async ({ request }) => {
  console.log('Received request:', request);

  if (!checkOrigin(request, allowedOrigins)) {
    console.log('ForbiddenCreatePost');
    return new Response(JSON.stringify({ error: 'Forbidden' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  console.log('CreatingPost');

  try {
    const db = getFirestore(serverApp);

    const postData = await request.json();
    console.log('Post data:', postData);

    const { title, content } = postData;

    const processedContent = await processHtmlContent(content);

    const postRef = await db.collection('posts').add({
      title,
      content: processedContent,
    });

    // Determine the base URL
    const baseUrl = process.env.MY_WEBSITE_URL
      ? `https://${process.env.MY_WEBSITE_URL}`
      : (import.meta.env.MY_WEBSITE_URL
        ? `https://${import.meta.env.MY_WEBSITE_URL}`
        : 'http://localhost:4321');
    console.log('process.env.MY_WEBSITE_URL', process.env.MY_WEBSITE_URL);
    console.log('import.meta.env.MY_WEBSITE_URL', import.meta.env.MY_WEBSITE_URL);
    const redeployUrl = `${baseUrl}/api/redeploy`;

    // Call the redeploy endpoint
    const redeployResponse = await fetch(redeployUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
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
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Error creating post:', err);
    return new Response(JSON.stringify({ error: 'Error creating post' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

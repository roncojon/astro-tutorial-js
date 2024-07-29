// Import necessary modules and functions
import type { APIRoute } from 'astro';
import { serverApp } from '../../firebase/server';
import { getFirestore } from 'firebase-admin/firestore';
import { v2 as cloudinary } from 'cloudinary';
import { JSDOM } from 'jsdom';
import { allowedOrigins, checkOrigin } from '@/utils/originUtils';
// import { getAuth } from 'firebase-admin/auth';

// Disable prerendering for this route
export const prerender = false;

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: import.meta.env.CLOUDINARY_CLOUD_NAME,
  api_key: import.meta.env.CLOUDINARY_API_KEY,
  api_secret: import.meta.env.CLOUDINARY_API_SECRET,
});

// Define a function to upload an image to Cloudinary and return its URL
const uploadImage = async (base64String: string) => {
  try {
    const result = await cloudinary.uploader.upload(base64String);
    return result.secure_url;
  } catch (err) {
    console.error(err);
    throw new Error('Error uploading image');
  }
};

// Define a function to process HTML content, uploading any embedded images to Cloudinary
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

// Define the POST route for updating a post
export const POST: APIRoute = async ({ request }) => {
  // Check the origin of the request
  if (!checkOrigin(request, allowedOrigins)) {
    return new Response(JSON.stringify({ error: 'Forbidden' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // /* Check if the user is authenticated */
  // const auth = getAuth(serverApp);

  // /* Get token from request headers */
  // const idToken = request.headers.get("Authorization")?.split("Bearer ")[1];
  // if (!idToken) {
  //   return new Response(
  //     "No token found",
  //     { status: 401 }
  //   );
  // }

  // /* Verify id token */
  // try {
  //   await auth.verifyIdToken(idToken);
  // } catch (error) {
  //   return new Response(
  //     "Invalid token",
  //     { status: 401 }
  //   );
  // }

  try {
    // Initialize Firestore
    const db = getFirestore(serverApp);

    // Extract the post ID from the request URL
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    // Parse the request body
    const postData = await request.json();

    // Process the post content
    const { title, content, tags } = postData;
    const processedContent = await processHtmlContent(content);

    // Update the post in Firestore
    await db.collection('posts').doc(id ?? '').update({
      title,
      content: processedContent,
      tags: tags || [],
    });

    // Return a success response
    return new Response(JSON.stringify({ message: 'Post updated successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    // Log the error and return an error response
    console.error('Error updating post:', err);
    return new Response(JSON.stringify({ error: 'Error updating post' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
// src/pages/api/upload-image.js
import { v2 as cloudinary } from 'cloudinary';

export const prerender = false;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function post({ request }) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const result = await cloudinary.uploader.upload(file.path);
    return new Response(JSON.stringify({ secure_url: result.secure_url }), {
      status: 200,
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: 'Error uploading image' }), {
      status: 500,
    });
  }
}

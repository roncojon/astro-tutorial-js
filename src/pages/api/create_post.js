import { createDOMPurify } from 'dompurify';
import { JSDOM } from 'jsdom';
import { TursoClient } from 'turso'; // Adjust this import based on your actual Turso client

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

export async function post({ request }) {
  try {
    const { title, content } = await request.json();
    if (!title || !content) {
      return new Response('Title and content are required.', { status: 400 });
    }

    // Sanitize content
    const sanitizedContent = DOMPurify.sanitize(content);

    const post = {
      title,
      content: sanitizedContent,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    // Initialize Turso client and insert post
    const turso = new TursoClient({ /* connection details */ });
    await turso.insert('posts', post); // Adjust this to your actual Turso insert method

    return new Response('Post saved successfully.', { status: 201 });
  } catch (error) {
    return new Response('Error saving post: ' + error.message, { status: 500 });
  }
}

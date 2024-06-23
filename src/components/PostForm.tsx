import { useState } from 'react';
import TinyMCEEditor from './TinyMCEEditor'; // Fix import

// export const prerender = false;

const PostForm = () => {
  const [editorContent, setEditorContent] = useState('');

  const handleSubmit = async (e: { preventDefault: () => void; target: any; }) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = {
      title: formData.get('title'),
      content: editorContent,
    };
    // Create postData ensuring it's a plain object
    const postData = {
      title: formData.get('title'),
      content: editorContent,
    };

    try {
      const response = await fetch('/api/create-post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

console.log('createPostResponse',response);

      if (response.ok) {
        alert('Post created successfully');
      } else {
        alert('Failed to create post');
      }
    } catch (err) {
      alert('Error creating post');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" required />
      </div>
      <div>
        <label htmlFor="content">Content</label>
        <TinyMCEEditor onContentChange={(c) => { console.log('contentChange', c); setEditorContent(c); }} />
      </div>
      <button type="submit">Create Post</button>
    </form>
  );
};

export default PostForm;

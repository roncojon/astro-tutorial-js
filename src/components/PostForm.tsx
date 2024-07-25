// Import necessary hooks and components
import { useState, useEffect } from 'react';
import TinyMCEEditor from './TinyMCEEditor';

// Define the props for the PostForm component
type PostFormProps = {
  postId?: string; // postId is optional because it's not needed when creating a new post
}

// Define the PostForm component
const PostForm = ({ postId }:PostFormProps) => {
  // Initialize state variables for the editor content and the post title
  const [editorContent, setEditorContent] = useState('');
  const [title, setTitle] = useState('');

  // Use the useEffect hook to fetch post data when the component mounts
  // and whenever the postId prop changes
  useEffect(() => {
    if (postId) {
      // If postId is provided, we're in edit mode, so fetch the post data
      fetch(`/api/getpost?id=${postId}`)
        .then(response => response.json())
        .then(data => {
          // Update the state variables with the fetched data
          setTitle(data.title);
          setEditorContent(data.content);
        });
    }
  }, [postId]);

  // Define the handleSubmit function that will be called when the form is submitted
  const handleSubmit = async (e:any) => {
    e.preventDefault();
    // Prepare the form data
    const formData = {
      title,
      content: editorContent,
    };

    try {
      // Determine the URL based on whether we're creating or updating a post
      const url = postId ? `/api/updatepost?id=${postId}` : '/api/createpost';
      // Send a POST request to the appropriate URL
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Check the response status and show an alert message
      if (response.ok) {
        alert(`Post ${postId ? 'updated' : 'created'} successfully`);
      } else {
        alert(`Failed to ${postId ? 'update' : 'create'} post`);
      }
    } catch (err) {
      alert(`Error ${postId ? 'updating' : 'creating'} post`);
    }
  };

  // Render the form
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="content">Content</label>
        <TinyMCEEditor
          initialValue={editorContent}
          onContentChange={(c) => setEditorContent(c)}
        />
      </div>
      <button type="submit">{postId ? 'Update' : 'Create'} Post</button>
    </form>
  );
};

export default PostForm;
import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { clientApp } from '@/firebase/client';

type BlogPostCrudProps = { url: string, postId: string };

const BlogPostCrud = ({ url, postId }: BlogPostCrudProps) => {
  const [idToken, setIdToken] = useState<string | null>(null);

  useEffect(() => {
    const auth = getAuth(clientApp);

    // Listen for authentication state changes
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken();
        setIdToken(token);
      } else {
        setIdToken(null);
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  const sessionCookie = getCookie('__session');
  if (!sessionCookie || !sessionCookie.length) return null;

  console.log('urlurlurl', url);
  const finalUrl = String(url).replace('/posts/', '');

  const handleDelete = async () => {
    const confirmed = confirm('Are you sure you want to delete this post?');
    if (confirmed) {
      try {
        if (!idToken) {
          alert('User is not authenticated');
          return;
        }

        const response = await fetch('/api/deletepost', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${idToken}`, // Include the idToken in the headers
          },
          body: JSON.stringify({ id: postId }),
        });

        if (response.ok) {
          alert('Post deleted successfully');
          location.reload();
        } else {
          alert('Failed to delete post');
        }
      } catch (err) {
        alert('Error deleting post');
      }
    }
  };

  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      <button onClick={() => {
        window.location.assign(`/signin?redirect=/post-editor/${finalUrl}`);
      }}>Edit</button>
      <button className="delete-button" onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default BlogPostCrud;

// Utility function to get cookie value
function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
}

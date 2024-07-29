import React, { useEffect } from 'react'

type BlogPostCrudProps = { url: string, postId: string }

const BlogPostCrud = ({ url, postId }: BlogPostCrudProps) => {
    const sessionCookie = getCookie('__session');
    if (!sessionCookie || !sessionCookie.length) return null;

    console.log('urlurlurl', url);
    const finalUrl = String(url).replace('/posts/', '');

    const handleDelete = async () => {
        const confirmed = confirm('Are you sure you want to delete this post?');
        if (confirmed) {
            try {
                const response = await fetch('/api/deletepost', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
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
}

export default BlogPostCrud;

// Utility function to get cookie value
function getCookie(name: string) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts?.pop()?.split(';').shift();
}

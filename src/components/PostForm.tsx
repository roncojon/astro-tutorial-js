import { useState, useEffect } from 'react';
import TinyMCEEditor from './TinyMCEEditor';

type PostFormProps = {
  postId?: string;
};

const PostForm = ({ postId }: PostFormProps) => {
  const [editorContent, setEditorContent] = useState('');
  const [title, setTitle] = useState('');
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');

  useEffect(() => {
    if (postId) {
      fetch(`/api/getpost?id=${postId}`)
        .then(response => response.json())
        .then(data => {
          setTitle(data.title);
          setEditorContent(data.content);
          setSelectedTags(data.tags || []);
        });
    }

    // Fetch available tags from the API
    fetch('/api/gettags')
      .then(response => response.json())
      .then(data => {
        console.log('/api/gettags_data',data);
        setAvailableTags(data?.tags ?? []);
      });
  }, [postId]);

  const handleTagSelection = (tag: string) => {
    setSelectedTags(prevTags =>
      prevTags.includes(tag) ? prevTags?.filter(t => t !== tag) : [...prevTags, tag]
    );
  };

  const handleAddTag = () => {
    if (newTag && !availableTags?.includes(newTag)) {
      setAvailableTags(prevTags => [...prevTags, newTag]);
    }
    if (newTag && !selectedTags?.includes(newTag)) {
      setSelectedTags(prevTags => [...prevTags, newTag]);
    }
    setNewTag('');
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = {
      title,
      content: editorContent,
      tags: selectedTags,
    };

    try {
      const url = postId ? `/api/updatepost?id=${postId}` : '/api/createpost';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert(`Post ${postId ? 'updated' : 'created'} successfully`);
      } else {
        alert(`Failed to ${postId ? 'update' : 'create'} post`);
      }
    } catch (err) {
      alert(`Error ${postId ? 'updating' : 'creating'} post`);
    }
  };

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
      <div>
        <label>Tags</label>
        <div>
          {availableTags?.map((tag) => (
            <button
              type="button"
              key={tag}
              onClick={() => handleTagSelection(tag)}
              style={{
                backgroundColor: selectedTags.includes(tag) ? 'lightblue' : 'white',
                margin: '0 5px',
                padding: '5px',
                border: '1px solid #ccc',
                borderRadius: '5px',
              }}
            >
              {tag}
            </button>
          ))}
        </div>
        <div>
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="Add new tag"
          />
          <button type="button" onClick={handleAddTag}>
            Add Tag
          </button>
        </div>
      </div>
      <button type="submit">{postId ? 'Update' : 'Create'} Post</button>
    </form>
  );
};

export default PostForm;

// src/components/FriendForm.jsx
import { h } from 'preact';
import { useState } from 'preact/hooks';

const FriendForm = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [isBestFriend, setIsBestFriend] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      name: formData.get('name'),
      age: formData.get('age'),
      isBestFriend: formData.get('isBestFriend') === 'on',
    };

    const response = await fetch('/api/friends', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      console.log('Friend added successfully');
      // Handle success (e.g., clear the form, show a message, etc.)
    } else {
      console.error('Error adding friend');
      // Handle error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label for="name">Name</label>
      <input type="text" id="name" name="name" value={name} onInput={(e) => setName(e.target.value)} />
      
      <label for="age">Age</label>
      <input type="number" id="age" name="age" value={age} onInput={(e) => setAge(e.target.value)} />
      
      <label for="isBestFriend">Is best friend?</label>
      <input type="checkbox" id="isBestFriend" name="isBestFriend" checked={isBestFriend} onChange={(e) => setIsBestFriend(e.target.checked)} />
      
      <button type="submit">Add friend</button>
    </form>
  );
};

export default FriendForm;

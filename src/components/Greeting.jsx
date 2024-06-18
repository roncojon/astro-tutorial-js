import { useState } from "react";

export default function Greeting({ messages }) {
  const [greeting, setGreeting] = useState(messages[0]);

  const randomMessage = () => {
    const actualMessageIndex = messages.indexOf(greeting);
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * messages.length);
    } while (randomIndex === actualMessageIndex);
    return messages[randomIndex];
  };

  return (
    <div>
      <h3>{greeting}! Thank you for visiting!</h3>
      <button onClick={() => setGreeting(randomMessage())}>New Greeting</button>
    </div>
  );
}
import React, { useState } from 'react';
import { Property } from '../types/property';
import { processUserInput } from '../utils/openai';
import { searchProperties } from '../utils/fakeDatabase';

interface ChatbotProps {
  setProperties: (properties: Property[]) => void;
}

const Chatbot: React.FC<ChatbotProps> = ({ setProperties }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages([...messages, `You: ${input}`]);
    setInput('');

    try {
      const filter = await processUserInput(input);
      const properties = await searchProperties(filter);
      setProperties(properties);
      setMessages((prev) => [...prev, `Bot: Here are some properties in Miami based on your request.`]);
    } catch (error) {
      console.error('Error processing request:', error);
      setMessages((prev) => [...prev, `Bot: Sorry, I couldn't process your request. Please try again.`]);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="h-64 overflow-y-auto mb-4">
        {messages.map((message, index) => (
          <p key={index} className="mb-2">{message}</p>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Find me places in Miami..."
          className="flex-grow px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chatbot;

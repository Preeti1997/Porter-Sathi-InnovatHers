import React from 'react';

const Conversation = ({ messages }) => {
  return (
    <div className="overflow-y-auto h-96 p-4 bg-white rounded shadow space-y-3">
      {messages.map((msg, i) => (
        <div
          key={i}
          className={`max-w-md p-3 rounded-lg ${
            msg.role === 'assistant' ? 'bg-blue-100 text-gray-900 self-start' : 'bg-blue-600 text-white self-end ml-auto'
          }`}
        >
          {msg.text}
        </div>
      ))}
    </div>
  );
};

export default Conversation;
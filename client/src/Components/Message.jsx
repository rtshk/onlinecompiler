import React from 'react';

const Message = ({ message }) => {
  return (
    <div
      className={`flex ${
        message.role === 'user' ? 'justify-end' : 'justify-start'
      } my-2`}
    >
      <div
        className={`${
          message.role === 'user'
            ? 'bg-[#1DB954] text-white'
            : 'bg-[#363636] text-white'
        } p-3 rounded-lg max-w-[70%] whitespace-pre-wrap`}
      >
        {message.parts[0].text}
      </div>
    </div>
  );
};

export default Message;

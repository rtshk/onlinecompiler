import React from "react";

const Message = ({ message }) => {
  const isUser = message.role === "user";
  const text = message.parts[0]?.text || "";

  return (
    <div
      className={`flex items-start gap-2 mb-3 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {/* Avatar */}
      {!isUser && (
        <div className="w-8 h-8 flex items-center justify-center bg-[#1db954] text-black rounded-full text-sm font-bold">
          🤖
        </div>
      )}

      {/* Message bubble */}
      <div
        className={`max-w-[75%] px-4 py-2 rounded-lg text-sm whitespace-pre-wrap ${
          isUser
            ? "bg-[#1db954] text-black rounded-br-none"
            : "bg-[#2b2b2b] text-white rounded-bl-none"
        }`}
      >
        {text}
      </div>

      {/* User Avatar */}
      {isUser && (
        <div className="w-8 h-8 flex items-center justify-center bg-white text-black rounded-full text-sm font-bold">
          🧑
        </div>
      )}
    </div>
  );
};

export default Message;

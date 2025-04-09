import React, { useState, useRef, useEffect } from "react";
import Nav from "./Nav";
import { useDispatch, useSelector } from "react-redux";
import { setHistory } from "../redux/mainSlice";
import Message from "./Message";
import { IoSend } from "react-icons/io5";

const Gemini = () => {
  const dispatch = useDispatch();
  const [prompt, setPrompt] = useState("");
  const context = useSelector((state) => state.main.history);
  const code = useSelector((state) => state.main.code);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [context]);

  const handlePromptSubmit = async () => {
    if (!prompt.trim()) return; // prevent empty submissions
    try {
      setPrompt("");

      dispatch(
        setHistory([...context, { role: "user", parts: [{ text: prompt }] }])
      );

      const response = await fetch(`${VITE_BACKENDURL}/api/gemini/prompt`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ context, prompt, code }),
      });

      if (!response.body) {
        throw new Error("ReadableStream not supported in response.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let modelReply = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        modelReply += chunk;

        dispatch(
          setHistory([
            ...context,
            { role: "user", parts: [{ text: prompt }] },
            { role: "model", parts: [{ text: modelReply }] },
          ])
        );
      }

      console.log("Full response received:", modelReply);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="w-full h-full rounded-md flex flex-col justify-between text-white">
      <div>
        <h1 className="text-2xl font-bold p-3 text-white">ChatBot</h1>
        <Nav />
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-[#444]">
        {context.map((message, index) => (
          <Message key={index} message={message} />
        ))}
        <div ref={messagesEndRef}></div>
      </div>

      {/* Input Box */}
      <div className="p-3">
        <div className="flex items-center bg-[#2e2e2e] rounded-full px-4 py-2 shadow-md focus-within:ring-2 ring-[#1db954] transition-all">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 bg-transparent text-white placeholder-gray-400 focus:outline-none text-sm md:text-base"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handlePromptSubmit();
            }}
          />
          <button
            onClick={handlePromptSubmit}
            className="p-2 ml-2 text-lg bg-[#1db954] hover:bg-[#159943] rounded-full transition duration-200 flex items-center justify-center"
          >
            <IoSend className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Gemini;

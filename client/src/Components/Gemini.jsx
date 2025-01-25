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
    try {
      setPrompt("");

      // Add user's input to the chat context immediately
      dispatch(
        setHistory([...context, { role: "user", parts: [{ text: prompt }] }])
      );

      // Make the POST request using Fetch
      const response = await fetch(`http://localhost:8000/api/gemini/prompt`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ context, prompt, code }),
      });

      if (!response.body) {
        throw new Error("ReadableStream not supported in response.");
      }

      // Process the streamed response
      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");

      let modelReply = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        console.log(value);
        const chunk = decoder.decode(value);
        modelReply += chunk;

        // Update the chat context incrementally
        dispatch(
          setHistory([
            ...context,
            { role: "user", parts: [{ text: prompt }] },
            { role: "model", parts: [{ text: modelReply }] }, // Append the response progressively
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
      <div className="flex-1 overflow-y-auto p-4">
        {context.map((message, index) => (
          <Message key={index} message={message} />
        ))}
        <div ref={messagesEndRef}></div>
      </div>
      <div className="p-2">
        <div className="flex items-center bg-[#2b2b2b] rounded-full p-1 w-full h-[50px]">
          <input
            type="text"
            placeholder="Message Gemini"
            className="flex-1 bg-transparent text-white placeholder-gray-400 focus:outline-none px-4"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handlePromptSubmit();
              }
            }}
          />
          <div className=" h-[100%] hover:bg-[#696969] flex items-center justify-center p-3 rounded-full">
            <IoSend onClick={handlePromptSubmit}>Submit</IoSend>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gemini;

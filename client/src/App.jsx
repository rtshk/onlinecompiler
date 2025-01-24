import React from "react";
import { Routes, Route } from "react-router";
import Home from "./Components/Home";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Notes from "./Components/Notes";
import ChatGPT from "./Components/ChatGPT";
import InputOutput from "./Components/InputOutput";
import Complexity from "./Components/Complexity";

function App() {
  return (
    <>
      <Routes>
        {/* Home Route */}
        <Route path="/" element={<Home />}>
          <Route path="notes" element={<Notes />} />
          <Route path="chatbot" element = {<ChatGPT/>}/>
          <Route path="/" element = {<InputOutput/>}/>
          <Route path="/complexity" element = {<Complexity/>}/>
        </Route>
        {/* Auth Routes with Layout */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;

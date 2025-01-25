import React from "react";
import { Routes, Route } from "react-router";
import Home from "./Components/Home";
import Notes from "./Components/Notes";
import Gemini from "./Components/Gemini";
import InputOutput from "./Components/InputOutput";
import Complexity from "./Components/Complexity";

function App() {
  return (
    <>
      <Routes>
        {/* Home Route */}
        <Route path="/" element={<Home />}>
          <Route path="notes" element={<Notes />} />
          <Route path="chatbot" element = {<Gemini/>}/>
          <Route path="/" element = {<InputOutput/>}/>
          <Route path="/complexity" element = {<Complexity/>}/>
        </Route>
      </Routes>
    </>
  );
}

export default App;

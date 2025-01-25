import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import { useDispatch, useSelector } from "react-redux";
import { setCode, setOutput } from "../redux/mainSlice";
import axios from "axios";

const CodeEditor = () => {
  const dispatch = useDispatch();
  const main = useSelector(state => state.main)
  const code = main.code;
  const input = main.input;
  const handleCompile = async () => {
    try {
      const result = await axios.post(`http://localhost:8000/compile/`, {code, input})
      console.log(result)
      dispatch(setOutput(result.data.output));
    } catch (error) {
     console.log(error) 
    }
  }

  return (
    <div className="p-2 pt-0 pr-0 bg-[#1e1e1e] rounded-md">
      <div className="flex justify-end pb-1 text-white ">
        <button className="p-1 px-6 rounded-tr-md rounded-bl-md bg-[#1DB954] hover:bg-[#159943]"
        onClick={handleCompile}>
          Run
        </button>
      </div>
      <Editor
        theme="vs-dark"
        defaultLanguage="cpp"
        defaultValue={`#include <iostream>
using namespace std;
int main() {
   
}`}
        height="83.8vh"
        onChange={(value) => {
          dispatch(setCode(value));
        }}
      />
    </div>
  );
};

export default CodeEditor;

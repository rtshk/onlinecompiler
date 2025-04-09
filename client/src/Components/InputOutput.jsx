import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Nav from "./Nav";
import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";
import { setInput } from "../redux/mainSlice"; // ⬅️ import action

const InputOutput = () => {
  const dispatch = useDispatch();
  const input = useSelector((state) => state.main.input);
  const output = useSelector((state) => state.main.output);

  return (
    <div className="w-full rounded-md text-white h-full flex flex-col bg-[#1e1e1e]">
      {/* Header */}
      <h1 className="text-2xl font-bold p-3">Input/Output</h1>

      {/* Navigation */}
      <Nav />

      {/* Resizable Panels */}
      <PanelGroup>
        {/* Input Panel */}
        <Panel>
          <div className="bg-[#1E1E1E] rounded-md p-4 h-full">
            <h2 className="text-xl font-semibold mb-2">Input</h2>
            <textarea
              placeholder="Enter your input here..."
              value={input}
              onChange={(e) => dispatch(setInput(e.target.value))} // ✅ update Redux on input
              className="bg-transparent text-white outline-none resize-none w-full h-full"
            />
          </div>
        </Panel>

        {/* Resize Handle */}
        <PanelResizeHandle
          style={{
            backgroundColor: "#151515",
            height: "5px",
          }}
        />

        {/* Output Panel */}
        <Panel>
          <div className="bg-[#1E1E1E] rounded-md p-4 h-full">
            <h2 className="text-xl font-semibold mb-2">Output</h2>
            <textarea
              placeholder="Output will be displayed here..."
              className="bg-transparent text-white outline-none resize-none w-full h-full"
              value={output || ""}
              readOnly
            />
          </div>
        </Panel>
      </PanelGroup>
    </div>
  );
};

export default InputOutput;

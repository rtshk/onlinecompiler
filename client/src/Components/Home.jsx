import React from "react";
import CodeEditor from "./CodeEditor";
import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";
import Navbar from "./Navbar";
import { Outlet } from "react-router";

const Home = () => {
  return (
    <div className="bg-[#151515] flex flex-col pb-3  min-h-screen max-h-screen h-screen">
        <Navbar />
      <div className="pl-3 pr-3 h-[91%]">
      <PanelGroup autoSaveId="example" direction="horizontal">
          <Panel>
            <CodeEditor />
          </Panel>
          <PanelResizeHandle
            style={{
              backgroundColor: "#151515",
              width: "5px", // Adjust the width of the resize handle
            }}
            hitAreaMargins={{ coarse: 20, fine: 10 }}
          />
          <Panel>
            <div className="bg-[#1E1E1E] h-[100%] rounded-md">
              <Outlet />
            </div>
          </Panel>
        </PanelGroup>
      </div>
      </div>
  );
};

export default Home;

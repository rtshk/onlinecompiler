import React from "react";
import Nav from "./Nav";
import { useSelector } from "react-redux";
import parse from 'html-react-parser';


const Notes = () => {
  const notes = useSelector(state => state.main.notes);
  
  return (
    <div className="w-full rounded-md  text-white h-[100%] ">
        <h1 className="text-2xl font-bold p-3">Notes</h1>
        <Nav/>
     <div className="p-6 h-[88%] overflow-y-scroll overflow-x-auto">
     {parse(notes)}
     </div>
    </div>
  );
};

export default Notes;

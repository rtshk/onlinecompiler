import React from "react";
import Nav from "./Nav";
import { useSelector } from "react-redux";
import parse from 'html-react-parser';
import {Grid} from 'react-loading-icons'


const Notes = () => {
  const notes = useSelector(state => state.main.notes);
    const loading = useSelector((state) => state.main.notesLoading);
  
  return (
    <div className="w-full rounded-md  text-white h-[100%] ">
        <h1 className="text-2xl font-bold p-3">Notes</h1>
        <Nav/>{
                  loading ? <div className="w-full h-full flex items-center justify-center">
                    <Grid height="30px" width="30px"/>
                  </div> :   <div className="p-6 h-[88%] overflow-y-scroll overflow-x-auto">
     {parse(notes)}
     </div>
}
    </div>
  );
};

export default Notes;

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router"; // Use react-router-dom for routing
import { setComplexity, setNotes } from "../redux/mainSlice";
import axios from "axios";

const Nav = () => {
  const dispatch = useDispatch();
  const main = useSelector((state) => state.main);

  const handleNotes = async () => {
    try {
      console.log("notes fetching");
      const result = await axios.post(
        `http://localhost:8000/api/gemini/notes`,
        main
      );
      const notes = result.data.notes.replace(/```html|```/g, "").trim();
      dispatch(setNotes(notes));
      console.log(notes);
    } catch (error) {
      console.log(error);
    }
  };
  const handleComplexity = async () => {
    try {
      console.log("complexity fetching");
      const response = await axios.post(
        `http://localhost:8000/api/gemini/complexity`,
        main
      );
      const complexityString = response?.data?.complexity;
      const cleanedString = complexityString.replace(/```json|```/g, "").trim();
      const parsedObject = JSON.parse(cleanedString);
      dispatch(setComplexity(parsedObject.complexity));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <nav className="bg-[#222222] text-[#CCCCCC] w-full rounded-lg">
      <ul className="flex">
        <NavLink
          to="/"
          end
          className="flex-1 text-center px-4  hover:bg-gray-600 hover:text-white"
        >
          I/O
        </NavLink>
        <NavLink
          to="/chatbot"
          end
          className="flex-1 text-center px-4 hover:bg-gray-600 hover:text-white"
        >
          Chatbot
        </NavLink>
        <NavLink
          to="/notes"
          end
          className="flex-1 text-center px-4  hover:bg-gray-600 hover:text-white"
          onClick={handleNotes}
        >
          Notes
        </NavLink>
        <NavLink
          to="/complexity"
          end
          className="flex-1 text-center px-4 hover:bg-gray-600 hover:text-white"
          onClick={handleComplexity}
        >
          Complexity
        </NavLink>
      </ul>
    </nav>
  );
};

export default Nav;

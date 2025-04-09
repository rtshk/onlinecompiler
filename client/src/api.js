import axios from "axios";
import { LANGUAGE_VERSIONS } from "./constants";

const API = axios.create({
  baseURL: "https://emkc.org/api/v2/piston",
});

/**
 * Executes code using the Piston API with optional stdin input
 * @param {string} language - The programming language
 * @param {string} sourceCode - The code to be executed
 * @param {string} input - Optional stdin input (default: "")
 * @returns {Promise<Object>} - API response
 */
export const executeCode = async (language, sourceCode, input = "") => {
  const response = await API.post("/execute", {
    language,
    version: LANGUAGE_VERSIONS[language],
    files: [
      {
        content: sourceCode,
      },
    ],
    stdin: input, // ✅ Pass input here
  });

  return response.data;
};

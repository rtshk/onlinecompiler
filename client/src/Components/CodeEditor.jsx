import React, { useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import { useDispatch, useSelector } from "react-redux";
import { setCode, setOutput } from "../redux/mainSlice";
import { executeCode } from "../api";
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS } from "../constants";

const CodeEditor = () => {
  const dispatch = useDispatch();
  const editorRef = useRef(null);
  const main = useSelector((state) => state.main);
  const code = main.code;
  const input = main.input;

  const [language, setLanguage] = useState("javascript");
  const [isLoading, setIsLoading] = useState(false);

  // ✅ Load default JavaScript code once when component mounts
  useEffect(() => {
    dispatch(setCode(CODE_SNIPPETS["javascript"]));
  }, [dispatch]);

  const handleCompile = async () => {
    const sourceCode = editorRef.current?.getValue();
    if (!sourceCode) return;

    try {
      setIsLoading(true);
      const result = await executeCode(language, sourceCode, input);
      dispatch(setOutput(result.run.output));
    } catch (error) {
      console.error("Error running code:", error);
      dispatch(setOutput("Error occurred while compiling the code."));
    } finally {
      setIsLoading(false);
    }
  };

  const handleLanguageSelect = (lang) => {
    const defaultSnippet = CODE_SNIPPETS[lang] || "";
    setLanguage(lang);
    dispatch(setCode(defaultSnippet));

    if (editorRef.current && editorRef.current.monaco) {
      const model = editorRef.current.getModel();
      if (model) {
        editorRef.current.monaco.editor.setModelLanguage(model, lang);
      }
    }
  };

  const onMount = (editor, monaco) => {
    editorRef.current = editor;
    editorRef.current.monaco = monaco;
    editor.focus();
  };

  return (
    <div
      className="p-2 pt-0 pr-0 bg-[#1e1e1e] rounded-md text-white flex flex-col"
      style={{ height: "100vh" }}
    >
      <div className="flex justify-between items-center pb-2">
        <LanguageSelector language={language} onSelect={handleLanguageSelect} />
        <button
          className="p-1 px-6 rounded-tr-md rounded-bl-md bg-[#1DB954] hover:bg-[#159943]"
          onClick={handleCompile}
          disabled={isLoading}
        >
          {isLoading ? "Running..." : "Run"}
        </button>
      </div>

      <div style={{ flexGrow: 1, height: "100%" }}>
        <Editor
          theme="vs-dark"
          language={language}
          value={code}
          onMount={onMount}
          onChange={(value) => {
            dispatch(setCode(value));
          }}
          options={{
            minimap: {
              enabled: false,
            },
          }}
        />
      </div>
    </div>
  );
};

export default CodeEditor;

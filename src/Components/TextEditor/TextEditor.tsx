import React from "react";
import Editor from "./Components/Editor";
import { themes } from "prism-react-renderer";

const TextEditor = () => {
  return (
    <div>
      <h2>React-simple-code-editor</h2>
      <p>Just a simple code-editor with highlighting</p>
      <Editor language="cpp" theme={themes.oneDark} />
    </div>
  );
};

export default TextEditor;

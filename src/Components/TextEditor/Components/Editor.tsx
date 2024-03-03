import React, { useEffect, useRef, useState } from "react";
import { Highlight, PrismTheme, themes } from "prism-react-renderer";
import "./Editor.css";

type languages =
  | "markup"
  | "jsx"
  | "tsx"
  | "swift"
  | "kotlin"
  | "objectivec"
  | "js-extras"
  | "reason"
  | "rust"
  | "graphql"
  | "yaml"
  | "go"
  | "cpp"
  | "markdown"
  | "python";

interface EditorProps {
  language: languages;
  theme?: PrismTheme | undefined;
}

const Editor = ({ language, theme }: EditorProps) => {
  const [code, setCode] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const codeContainerRef = useRef<HTMLPreElement | null>(null);
  const handleTextAreaScroll = () => {
    if (textAreaRef.current && codeContainerRef.current) {
      codeContainerRef.current.scrollTop = textAreaRef.current.scrollTop;
    }
  };
  const handleCodeContainerScroll = () => {
    if (textAreaRef.current && codeContainerRef.current) {
      textAreaRef.current.scrollTop = codeContainerRef.current.scrollTop;
    }
  };
  useEffect(() => {
    const textArea = textAreaRef?.current;
    const codeContainer = codeContainerRef?.current;
    if (textArea) {
      textArea.addEventListener("scroll", handleTextAreaScroll);
    }
    if (codeContainer) {
      codeContainer.addEventListener("scroll", handleCodeContainerScroll);
    }
    return () => {
      if (textArea) {
        textArea.removeEventListener("scroll", handleTextAreaChange);
      }
      if (codeContainer) {
        codeContainer.removeEventListener("scroll", handleCodeContainerScroll);
      }
    };
  }, [textAreaRef, codeContainerRef]);

  const handleTextAreaChange = (e) => {
    setCode(e.target.value);
  };

  return (
    <>
      <div className="grow-wrap">
        <textarea
          name="text"
          id="text"
          value={code}
          spellCheck={false}
          autoCorrect={"false"}
          onChange={handleTextAreaChange}
          ref={textAreaRef}
        ></textarea>

        <Highlight theme={theme} code={code} language={language}>
          {({ style, tokens, getLineProps, getTokenProps }) => (
            <pre
              style={style}
              ref={codeContainerRef}
              className="code__container"
            >
              {tokens.map((line, idx) => (
                <div key={idx} {...getLineProps({ line })}>
                  <div className="settings">
                    <div className="line__index">
                      <span>{idx + 1}</span>
                    </div>
                    <div className="line__text">
                      {line.map((token, key) => {
                        return <span key={key} {...getTokenProps({ token })} />;
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </div>
    </>
  );
};

Editor.defaultProps = {
  language: "jsx",
  theme: themes.oneLight,
};

export default Editor;

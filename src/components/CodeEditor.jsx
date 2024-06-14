import { useState, useEffect, useRef } from "react";
import { Field, Radio, RadioGroup } from "@headlessui/react";
import Editor from "@monaco-editor/react";
import { useStore } from "@nanostores/react";
import { $files, updateFile } from "../stores/files";

function CodeEditor() {
  const editorRef = useRef(null);

  const files = useStore($files);

  const fileNames = Object.keys(files);
  const [selectedFileName, setSelectedFileName] = useState(fileNames[0]);

  const fileContents = files[selectedFileName].file.contents;

  const handleEditorWillMount = (monaco) => {
    import("monaco-themes/themes/Blackboard.json").then((data) => {
      monaco.editor.defineTheme("Blackboard", data);
      monaco.editor.setTheme("Blackboard");
    });
  };
  const handleEditorChange = async (value) => {
    // console.log("🚀 ~ handleEditorChange ~ value:", value);
    updateFile(selectedFileName, value);
  };

  useEffect(() => {
    editorRef.current?.focus();
  }, [selectedFileName]);

  return (
    <>
      <RadioGroup
        value={selectedFileName}
        onChange={setSelectedFileName}
        aria-label="Server size"
        className="flex text-slate-400 text-xs leading-6"
      >
        {fileNames.map((fileName) => (
          <Field key={fileName}>
            <Radio value={fileName} className="code-radio">
              <span>{fileName}</span>
            </Radio>
          </Field>
        ))}
      </RadioGroup>
      <Editor
        height="600px"
        theme="vs-dark"
        path={selectedFileName}
        defaultValue={fileContents}
        beforeMount={handleEditorWillMount}
        onChange={handleEditorChange}
        onMount={(editor) => (editorRef.current = editor)}
      />
    </>
  );
}

export default CodeEditor;

import { useState, useEffect, useRef } from "react";
import { Field, Label, Radio, RadioGroup } from "@headlessui/react";
import Editor from "@monaco-editor/react";
import files from "../assets/files";

function CodeEditor() {
  const editorRef = useRef(null);

  const fileNames = Object.keys(files);
  const [selectedFileName, setSelectedFileName] = useState(fileNames[0]);

  const fileContents = files[selectedFileName].file.contents;

  function handleEditorWillMount(monaco) {
    import("monaco-themes/themes/Blackboard.json").then((data) => {
      monaco.editor.defineTheme("Blackboard", data);
      monaco.editor.setTheme("Blackboard");
    });
  }

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
        height="80vh"
        theme="vs-dark"
        path={selectedFileName}
        defaultValue={fileContents}
        beforeMount={handleEditorWillMount}
        onMount={(editor) => (editorRef.current = editor)}
      />
    </>
  );
}

export default CodeEditor;

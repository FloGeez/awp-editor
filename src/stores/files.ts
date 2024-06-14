import { atom, computed, type WritableAtom } from "nanostores";
import initialFiles from "../assets/files";
import type { FileNode, FileSystemTree } from "@webcontainer/api";

interface File {
  name: string;
  content: string;
}

const files = initialFiles as FileSystemTree;
const fileNames = Object.keys(files);
const currentFileName = fileNames[0];

const $files: WritableAtom<FileSystemTree> = atom(files);
const $currentFile: WritableAtom<File> = atom({
  name: currentFileName,
  content: (files[currentFileName] as FileNode).file.contents,
});

const updateFile = (fileName: string, content: string) => {
  console.log("🚀 ~ updateFile ~ fileName, content:", fileName, content);
  $currentFile.set({
    name: fileName,
    content: content,
  });
  const files = $files.get();
  (files[fileName] as FileNode).file.contents = content;
  $files.set({ ...files });
};

export { $files, $currentFile, updateFile };

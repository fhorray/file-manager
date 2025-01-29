import React, { createContext, useContext, useState } from "react";
import { SelectFile } from "../@types/files";
import { r2ListResponse } from "../../data";

type FileManagerContextProps = {
  path: string;
  setPath: React.Dispatch<React.SetStateAction<string>>;
  currentFolder: SelectFile | undefined;
  setCurrentFolder: React.Dispatch<
    React.SetStateAction<SelectFile | undefined>
  >;
  folders: (SelectFile | undefined)[];
  files: SelectFile[] | null;
  activePreview: boolean;
  setActivePreview: React.Dispatch<React.SetStateAction<boolean>>;
};

const FileManagerContext = createContext<FileManagerContextProps | undefined>(
  undefined
);

const FileManagerProvider = ({ children }: { children: React.ReactNode }) => {
  const [activePreview, setActivePreview] = useState(false);

  const [currentPath, setCurrentPath] = useState("/");
  const [currentFolder, setCurrentFolder] = useState<SelectFile | undefined>(
    undefined
  );

  const mapped = r2ListResponse.objects.map((file) => {
    return {
      key: file.key,
      size: file.size,
      lastModified: file.uploaded.toISOString(),
    };
  });
  const organized = organizeFiles(mapped);

  const files = organized.filter((file) => {
    return !file.isDir;
  });

  const folders = organized.filter((file) => {
    return file.isDir;
  });

  return (
    <FileManagerContext.Provider
      value={{
        path: currentPath,
        setPath: setCurrentPath,
        files,
        folders,
        currentFolder,
        setCurrentFolder,
        activePreview,
        setActivePreview,
      }}
    >
      {children}
    </FileManagerContext.Provider>
  );
};

const useFileManager = () => {
  const context = useContext(FileManagerContext);

  return context as FileManagerContextProps;
};

// function to organize file keys
const organizeFiles = (
  keys: { key: string; size?: number; lastModified?: string }[]
): SelectFile[] => {
  const files: SelectFile[] = [];
  const dirMap = new Map<string, string>(); // Mapeia caminhos para IDs

  keys.forEach(({ key, size, lastModified }) => {
    const parts = key.split("/");
    let parentId: string | undefined = undefined;
    let currentPath = "";

    for (let i = 0; i < parts.length; i++) {
      const name = parts[i];
      currentPath += (i > 0 ? "/" : "") + name;
      const isLast = i === parts.length - 1;
      const id = btoa(currentPath); // Criando um ID único com Base64

      if (!isLast) {
        // Diretório
        if (!dirMap.has(currentPath)) {
          dirMap.set(currentPath, id);
          files.push({
            id,
            name,
            path: currentPath,
            isDir: true,
            parentId,
          });
        }
      } else {
        // Arquivo
        files.push({
          id,
          name,
          path: currentPath,
          isDir: false,
          parentId,
          size: size ? `${size} bytes` : undefined,
          lastModified,
        });
      }

      parentId = id; // O próximo item pertence a este diretório
    }
  });

  return files;
};

// eslint-disable-next-line react-refresh/only-export-components
export { useContext, useFileManager, FileManagerContext, FileManagerProvider };

import React, { createContext, useContext, useState } from 'react';
import { Folder, File } from '../@types/files';
import { r2ListResponse } from '../../data';
import { buildFolderStructure, organizeFiles } from '../utils/file-manager';

type FileManagerContextProps = {
  path: string;
  setPath: React.Dispatch<React.SetStateAction<string>>;
  folders: Folder;
  files: File[] | null;
  activePreview: boolean;
  setActivePreview: React.Dispatch<React.SetStateAction<boolean>>;
  selectedFiles: File[];
  setSelectedFiles: React.Dispatch<React.SetStateAction<File[]>>;
};

const FileManagerContext = createContext<FileManagerContextProps | undefined>(
  undefined,
);

const FileManagerProvider = ({ children }: { children: React.ReactNode }) => {
  const [activePreview, setActivePreview] = useState(false);
  const [currentPath, setCurrentPath] = useState('/');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

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

  const folders = buildFolderStructure(files);

  return (
    <FileManagerContext.Provider
      value={{
        path: currentPath,
        setPath: setCurrentPath,
        files,
        folders,
        activePreview,
        setActivePreview,
        selectedFiles,
        setSelectedFiles,
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

// eslint-disable-next-line react-refresh/only-export-components
export { useContext, useFileManager, FileManagerContext, FileManagerProvider };

import React, { createContext, useContext, useState } from 'react';
import { Folder, SelectFile } from '../@types/files';
import { r2ListResponse } from '../../data';

type FileManagerContextProps = {
  path: string;
  setPath: React.Dispatch<React.SetStateAction<string>>;
  currentFolder: SelectFile | undefined;
  setCurrentFolder: React.Dispatch<
    React.SetStateAction<SelectFile | undefined>
  >;
  folders: Folder;
  files: SelectFile[] | null;
  activePreview: boolean;
  setActivePreview: React.Dispatch<React.SetStateAction<boolean>>;
};

const FileManagerContext = createContext<FileManagerContextProps | undefined>(
  undefined,
);

const FileManagerProvider = ({ children }: { children: React.ReactNode }) => {
  const [activePreview, setActivePreview] = useState(false);

  const [currentPath, setCurrentPath] = useState('/');
  const [currentFolder, setCurrentFolder] = useState<SelectFile | undefined>(
    undefined,
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

  const folders = buildFolderStructure(files);

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
  keys: { key: string; size?: number; lastModified?: string }[],
): SelectFile[] => {
  const files: SelectFile[] = [];
  const dirMap = new Map<string, string>(); // Mapeia caminhos para IDs

  keys.forEach(({ key, size, lastModified }) => {
    const parts = key.split('/');
    let parentId: string | undefined = undefined;
    let currentPath = '';

    for (let i = 0; i < parts.length; i++) {
      const name = parts[i];
      currentPath += (i > 0 ? '/' : '') + name;
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
const buildFolderStructure = (files: SelectFile[]): Folder => {
  const root: Folder = {
    id: 'root',
    name: 'Root',
    path: '',
    files: [],
    folders: [],
  };

  files.forEach((file) => {
    const pathParts = file.path.split('/').filter(Boolean); // Divide e remove strings vazias
    pathParts.shift(); // remove 'files/' from URL
    const fileName = pathParts.pop(); // Remove nome do arquivo do path

    let currentFolder = root;

    for (let i = 0; i < pathParts.length; i++) {
      const part = pathParts[i];
      const isFile = fileName && part === fileName; // Verifica se o caminho é o nome do arquivo
      let existingFolder = currentFolder.folders.find((f) => f.name === part);

      if (!existingFolder) {
        // Se não existe a pasta, criamos uma nova
        existingFolder = {
          id: file.id,
          name: part,
          path: currentFolder.path + part + '/',
          files: [], // Inicialmente sem arquivos
          folders: [],
        };
        currentFolder.folders.push(existingFolder);
      }

      currentFolder = existingFolder;

      // Se for um arquivo, adiciona ao array de arquivos da pasta atual
      if (isFile) {
        currentFolder.files.push(file);
        break; // Não precisamos continuar procurando mais pastas
      }
    }
  });

  return root;
};

// eslint-disable-next-line react-refresh/only-export-components
export { useContext, useFileManager, FileManagerContext, FileManagerProvider };

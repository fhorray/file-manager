import { Folder, File } from "../types/files";

// function to organize file keys
export const organizeFiles = (
  keys: { key: string; size?: number; lastModified?: string }[]
): File[] => {
  const files: File[] = [];
  const dirMap = new Map<string, string>(); // Mapeia caminhos para IDs

  keys?.forEach(({ key, size, lastModified }) => {
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

      parentId = id;
    }
  });

  return files;
};

export const buildFolderStructure = (files: File[]): Folder => {
  const root: Folder = {
    id: "root",
    name: "Root",
    path: "",
    files: [],
    folders: [],
  };

  files?.forEach((file) => {
    const pathParts = file.path.split("/").filter(Boolean); // Divide e remove strings vazias
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
          path: currentFolder.path + part + "/",
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

export const formatBytes = (
  bytes: number | string,
  decimals?: number
): string => {
  const parsed = typeof bytes === "string" ? parseInt(bytes) : bytes;

  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals ?? 2 < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(parsed) / Math.log(k));

  const value = parseFloat((parsed / Math.pow(k, i)).toFixed(dm));
  return `${value} ${sizes[i]}`;
};

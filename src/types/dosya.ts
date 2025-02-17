import { File, Folder, R2ObjectsList } from "./files";

// CONTEXT
export type DosyaContext = {
  error?: DosyaError;
  setError?: (error: DosyaError) => void;
  baseUrl?: string;
};

// DOSYA CONFIG
export type DosyaConfig = {
  baseUrl?: string;
};

// ERRO
export type DosyaError = Error & {
  isError: boolean;
};

// LAYOUT
export type DosyaLayout = {
  mode: "grid" | "list";
  set: (mode: "grid" | "list") => void;
};

// PATH
export type DosyaPath = {
  current: string;
  set: (path: string) => void;
};

// FOLDERS
// Considerando que 'Folder' já esteja definido em outro lugar
export type DosyaFolders = {
  current: string;
  list: Folder[];
  fetch: Operation<undefined, { data: Folder[] }>;
};

// FILES
// Ajustado o parâmetro de 'update' para refletir sua ação
export type Operation<T, R = unknown> = [T] extends [undefined]
  ? (operation: () => Promise<R>) => Promise<void>
  : (arg: T, operation: () => Promise<R>) => Promise<void>;

export type DosyaFiles = {
  list: File[] | null;
  delete: Operation<string>;
  update: Operation<string>;
  fetch: Operation<undefined, { data: R2ObjectsList }>;
  upload: Operation<File>;
};

// FILE PREVIEW
export type DosyaPreview = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  file: File | null;
  setFile: (file: File | null) => void;
  clear: () => void;
};

// SELECTED FILES
export type DosyaSelectedFiles = {
  list: File[];
  set: React.Dispatch<React.SetStateAction<File[]>>;
  clear: () => void;
  delete: (file: File) => void;
};

// SIDEBAR
export type DosyaSidebar = {
  isOpen: boolean;
  toggle: () => void;
};

// STORE
export type DosyaStoreProps = {
  context: DosyaContext;
  layout: DosyaLayout;
  path: DosyaPath;
  folders: DosyaFolders;
  files: DosyaFiles;
  preview: DosyaPreview;
  selectedFiles: DosyaSelectedFiles;
  sidebar: DosyaSidebar;
};

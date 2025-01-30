export type File = {
  id: string;
  name: string;
  path: string;
  isDir: boolean;
  parentId?: string;
  size?: string;
  lastModified?: string;
};

export type Folder = {
  id: string;
  name: string;
  path: string;
  files: File[];
  folders: Folder[];
};

// Tipagem do retorno do put
export interface R2Object {
  key: string;
  version: string;
  size: number;
  etag: string;
  httpMetadata?: Record<string, string>;
  customMetadata?: Record<string, string>;
  uploaded: Date;
}

// Tipagem do retorno do list
export interface R2ObjectsList {
  objects: R2Object[];
  truncated: boolean;
  cursor?: string | null;
}

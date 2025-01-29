export type SelectFile = {
  id: string;
  name: string;
  path: string;
  isDir: boolean;
  parentId?: string;
  size?: string;
  lastModified?: string;
};

// Tipagem para o método put
export interface R2PutOptions {
  httpMetadata?: HeadersInit;
  customMetadata?: Record<string, string>;
}

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

export type SelectFile = {
  id: string;
  name: string;
  path: string;
  isDir: boolean;
  parentId?: string;
  size?: string;
  lastModified?: string;
};

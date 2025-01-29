import { FolderIcon } from "lucide-react";
import { Folder } from "../@types/files";
import { useFileManager } from "../contexts/file-manager";

const FolderTree = () => {
  const { folders } = useFileManager();

  return (
    <div>
      {folders.folders.map((folder) => (
        <FolderRenderer key={folder.id} folder={folder} />
      ))}
    </div>
  );
};

const FolderRenderer = ({ folder }: { folder: Folder }) => {
  return (
    <div>
      <div className="flex items-center gap-4">
        <FolderIcon />
        {folder.name}
      </div>

      {/* Render subfolders recursively if they exist */}
      {folder.folders && folder.folders.length > 0 && (
        <div className="ml-4">
          {folder.folders.map((subfolder) => (
            <FolderRenderer key={subfolder.id} folder={subfolder} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FolderTree;

import { FolderIcon } from "lucide-react";
import { Folder } from "../@types/files";
import { useFileManager } from "../contexts/file-manager";

export const FolderRenderer = ({ file }: { file: Folder }) => {
  const { path, setPath } = useFileManager();

  console.log(file.path);
  console.log(path);

  return (
    <div
      className="flex items-center w-full h-full border border-gray-300 rounded-xl relative cursor-pointer group p-4 gap-4"
      onClick={() => setPath(file.path)}
    >
      {/* IMAGE INFO */}
      <FolderIcon className="w-10 h-10 text-orange-200 group-hover:scale-110 transition-all" />
      {/* FILE INFO */}
      <div className="">
        {file.name.charAt(0).toUpperCase() + file.name.slice(1)}
      </div>
    </div>
  );
};

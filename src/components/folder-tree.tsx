import { ChevronRight, FolderIcon, FileIcon } from "lucide-react";
import { Folder } from "../types/files";

import { useState } from "react";
import { cn } from "../lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useDosya } from "../stores/dosya-store";

export const FolderTree = () => {
  const { folders } = useDosya();

  return (
    <ul className="space-y-2">
      {folders.list.folders.map((folder) => (
        <FolderRenderer key={folder.id} folder={folder} />
      ))}
    </ul>
  );
};

export const FolderRenderer = ({ folder }: { folder: Folder }) => {
  const [expanded, setExpanded] = useState(false);
  const { path, selectedFiles } = useDosya();

  const hasSubfolders = folder.folders && folder.folders.length > 0;
  const hasFiles = folder.files && folder.files.length > 0;

  return (
    <li className="list-none">
      <div
        className={cn(
          "select-none flex items-center gap-2 w-full p-2 rounded-md transition-all duration-200 ease-in-out cursor-pointer",
          path.current === folder.path
            ? "bg-blue-100 text-blue-800"
            : "hover:bg-gray-200"
        )}
        onClick={() => {
          path.set(folder.path);
          if (hasSubfolders) {
            setExpanded(!expanded);
            selectedFiles.clear();
          }
        }}
      >
        <button className="p-0 hover:bg-transparent">
          <motion.div
            animate={{ rotate: expanded ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronRight
              className={cn("w-4 h-4", !hasSubfolders && "opacity-0")}
            />
          </motion.div>
        </button>
        <FolderIcon
          className={cn(
            "w-5 h-5",
            expanded || path.current === folder.path
              ? "text-blue-500"
              : "text-yellow-500"
          )}
        />
        <span className="text-sm font-medium">
          {folder.name.charAt(0).toUpperCase() + folder.name.slice(1)}
        </span>
      </div>

      <AnimatePresence>
        {expanded && (hasSubfolders || hasFiles) && (
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="pl-4 mt-1 space-y-1"
          >
            {folder.folders?.map((subfolder) => (
              <FolderRenderer key={subfolder.id} folder={subfolder} />
            ))}
            {folder.files?.map((file) => (
              <FileRenderer key={file.id} file={file} />
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </li>
  );
};

export const FileRenderer = ({
  file,
}: {
  file: { id: string; name: string };
}) => {
  return (
    <li className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-200 transition-all duration-200 ease-in-out cursor-pointer">
      <FileIcon className="w-4 h-4 text-gray-500" />
      <span className="text-sm">{file.name}</span>
    </li>
  );
};

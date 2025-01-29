import React, { useState } from "react";
import {
  FolderIcon,
  SearchIcon,
  ChevronRight,
  ChevronDown,
  PanelTopCloseIcon,
} from "lucide-react";
import { Input } from "./ui/input";
import { useFileManager } from "../contexts/file-manager";
import { cn } from "../lib/utils";
import type { SelectFile } from "../@types/files";
import { Button } from "./ui/button";

const Sidebar = () => {
  const { path, setPath, folders, setCurrentFolder } = useFileManager();
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(
    new Set()
  );

  const filterFiles = (value: string) => {
    console.log(value);
    // Implement file filtering logic here
  };

  const toggleFolder = (folderId: string) => {
    setExpandedFolders((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(folderId)) {
        newSet.delete(folderId);
      } else {
        newSet.add(folderId);
      }
      return newSet;
    });
  };

  const handleCloseAll = () => {
    setExpandedFolders(new Set());
  };

  const renderFolder = (folder: SelectFile, depth = 0) => {
    const isExpanded = expandedFolders.has(folder.id);
    const hasChildren = folders.some((f) => f?.parentId === folder.id);

    return (
      <div key={folder.id} className="flex flex-col">
        <div
          className={cn(
            "flex items-center gap-2 py-2 px-3 rounded-md cursor-pointer hover:bg-gray-200 transition-all",
            folder.path === path && "bg-gray-300 hover:bg-gray-400",
            depth > 0 && `ml-4`
          )}
          onClick={() => {
            setPath(folder.path ?? "/");
            setCurrentFolder(folder);
            if (hasChildren) toggleFolder(folder.id);
          }}
        >
          {hasChildren &&
            React.createElement(isExpanded ? ChevronDown : ChevronRight, {
              size: 16,
            })}
          <FolderIcon size={16} />
          <span>
            {folder.name.charAt(0).toUpperCase() + folder.name.slice(1)}
          </span>
        </div>
        {isExpanded &&
          folders
            .filter((f) => f?.parentId === folder.id)
            .map((childFolder) => renderFolder(childFolder!, depth + 1))}
      </div>
    );
  };

  return (
    <aside className="flex flex-col gap-4 bg-gray-100 h-screen w-[350px] p-4 border-r-2 border-gray-300 overflow-y-auto">
      <h2 className="text-2xl font-bold py-4">Gerenciador de Arquivos</h2>
      <div className="relative">
        <Input
          type="search"
          placeholder="Search a file..."
          onChange={(e) => filterFiles(e.target.value)}
        />
        <SearchIcon className="absolute right-2 top-2 text-gray-300" />
      </div>
      {/* OPTIONS */}
      <div>
        <Button
          size={"icon"}
          variant={"outline"}
          onClick={handleCloseAll}
          disabled={expandedFolders.size <= 0}
        >
          <PanelTopCloseIcon />
        </Button>
      </div>
      <div className="text-sm text-gray-600">Current Path: {path}</div>
      <div className="flex flex-col gap-2">
        {folders
          .filter((folder) => !folder?.parentId)
          .map((folder) => renderFolder(folder as SelectFile))}
      </div>
    </aside>
  );
};

export default Sidebar;

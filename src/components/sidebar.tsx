import { FolderIcon, SearchIcon } from "lucide-react";
import { Input } from "./ui/input";
import { mockFiles } from "../../data";
import { Button } from "./ui/button";
import { useState } from "react";

const Sidebar = () => {
  const [currentPath, setCurrentPath] = useState("/");

  const folders = mockFiles.filter(
    (file) => file.isDir && !file.name.startsWith("/")
  );

  const filterFiles = (value: string) => {
    console.log(value);
  };

  return (
    <aside className="flex flex-col gap-4 bg-gray-100 h-screen w-[20%] p-4 border-r-2 border-gray-300">
      <h2 className="text-2xl font-bold py-4">Gerenciador de Arquivos</h2>
      {/* search input */}
      <div className="relative">
        <Input
          type="search"
          placeholder="Search a file..."
          onChange={(e) => filterFiles(e.target.value)}
        />
        <SearchIcon className="absolute right-2 top-2 text-gray-300" />
      </div>
      Current Path: {currentPath}
      {/* FOLDERS */}
      <div className="flex flex-col gap-2">
        {folders.map((folder) => (
          <Button
            className="justify-start"
            variant={"outline"}
            onClick={() => setCurrentPath(folder.path ?? "/")}
          >
            <FolderIcon />
            {folder.name}
          </Button>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;

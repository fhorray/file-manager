import { FolderArchive, UploadCloudIcon } from "lucide-react";

import FolderTree from "./folder-tree";
import { Heading } from "./heading";
import { Button } from "./ui/button";

const Sidebar = () => {
  return (
    <aside className="fixed flex flex-col gap-4 bg-gray-100 h-screen w-[350px] p-4 border-r-2 border-gray-300 overflow-y-auto">
      <h2 className="flex items-center gap-2 text-2xl font-bold py-4 self-center">
        <FolderArchive className="w-8 h-8 text-blue-400" />
        File Manager
      </h2>

      {/* UPLOAD BUTTON */}
      <Button onClick={() => window.alert("UPLOAD MODAL LOGIC...")}>
        <UploadCloudIcon />
        Upload File
      </Button>

      {/* FOLDER TREE */}
      <Heading className="uppercase">Folders</Heading>
      <FolderTree />
    </aside>
  );
};

export default Sidebar;

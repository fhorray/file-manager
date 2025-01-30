import {
  ChevronLeft,
  ChevronRight,
  FolderArchive,
  UploadCloudIcon,
} from "lucide-react";

import FolderTree from "./folder-tree";
import { Heading } from "./heading";
import { Button } from "./ui/button";

import { motion } from "motion/react";
import { useState } from "react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <motion.aside
        className="fixed flex flex-col gap-4 bg-gray-100 h-screen w-[350px] p-4 border-r-2 border-gray-300 overflow-y-auto"
        initial={{
          width: !isOpen ? 70 : 350,
        }}
        animate={{
          width: isOpen ? 350 : 70,
        }}
      >
        <button
          className="rounded-full absolute w-8 h-8 p2 bg-white border-2 border-gray-300 flex items-center justify-center -right-4 top-7 z-10"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <ChevronLeft className="w-5 h-5" />
          ) : (
            <ChevronRight className="w-5 h-5" />
          )}
        </button>

        <div className="flex items-center gap-2 text-2xl font-bold py-4 self-center">
          <FolderArchive className="w-8 h-8 text-blue-400" />
          <motion.span
            animate={{
              opacity: isOpen ? 100 : 0,
            }}
          >
            File Manager
          </motion.span>
        </div>

        {/* UPLOAD BUTTON */}
        <motion.div
          animate={{
            opacity: isOpen ? 100 : 0,
          }}
          className="w-full"
        >
          <Button
            className="w-full"
            onClick={() => window.alert("UPLOAD MODAL LOGIC...")}
          >
            <UploadCloudIcon />
            Upload File
          </Button>
        </motion.div>

        {/* FOLDER TREE */}
        <motion.div
          animate={{
            opacity: isOpen ? 100 : 0,
          }}
        >
          <Heading className="uppercase">Folders</Heading>
          <FolderTree />
        </motion.div>
      </motion.aside>
    </div>
  );
};

export default Sidebar;

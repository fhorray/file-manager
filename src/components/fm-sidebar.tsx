import { ChevronLeftIcon, ChevronRightIcon, SearchIcon } from 'lucide-react';

import { FolderTree } from './fm-folder-tree';
import { Heading } from './fm-heading';

import { motion } from 'motion/react';
import { useFileManager } from '../contexts/file-manager';
import { cn } from '../lib/utils';

export const Sidebar = () => {
  const { sidebar } = useFileManager();

  const filterFiles = (value: string) => {
    console.log(value);
    // Implement file filtering logic here
  };

  return (
    <div className="h-full w-full flex flex-row-reverse">
      {/* close/open button */}
      <motion.button
        onClick={() => sidebar.setIsOpen(!sidebar.isOpen)}
        className="self-start p-1 bg-gray-200 rounded-r-full -ml-2 mt-8 z-20"
        whileHover={{ marginLeft: 0 }}
      >
        {sidebar.isOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </motion.button>

      <motion.aside
        className={cn(
          'w-full flex flex-col gap-4 bg-gray-100 h-full border-r-2 border-gray-300 overflow-y-auto z-20',
          sidebar.isOpen && 'p-0',
        )}
        initial={{
          width: sidebar.isOpen ? 300 : 0,
        }}
        animate={{
          width: sidebar.isOpen ? 300 : 0,
        }}
      >
        <div className="w-full relative">
          <input
            className="w-full p-4 focus-visible:ring-offset-0"
            type="search"
            placeholder="Search a file..."
            onChange={(e) => filterFiles(e.target.value)}
          />
          <SearchIcon className="absolute right-3 top-1/2 -translate-y-[50%] text-gray-300" />
        </div>

        <div className="w-full p-4">
          {/* FOLDER TREE */}
          <Heading className="uppercase">Folders</Heading>
          <FolderTree />
        </div>
      </motion.aside>
    </div>
  );
};

import { useEffect } from 'react';
import { useFileManager } from '../contexts/file-manager';
import { cn } from '../lib/utils';
import { Breadcrumbs } from './fm-breadcrumb';
import { Heading } from './fm-heading';
import { FileManagerList } from './fm-list';
import { FileManagerPreview } from './fm-preview';
import { Sidebar } from './fm-sidebar';

import { motion } from 'motion/react';
import { File } from '../@types/files';
import { getFiles } from '../utils/get-files';
import { Viewer } from './fm-viewer';

const FileManager = () => {
  const { files, folders, sidebar, selectedFiles } = useFileManager();

  useEffect(() => {
    if (files.list?.length) return;
    const fetchFiles = async () => {
      files.fetch(getFiles);
    };

    fetchFiles();
  }, []);

  console.log(selectedFiles.list.length);
  console.log(folders.current.files?.length);

  return (
    <main className="flex h-full">
      <div className="h-full fixed">
        <Sidebar />
      </div>

      <motion.div
        className={cn('h-full w-full flex flex-col gap-4 !p-8')}
        initial={{
          marginLeft: sidebar.isOpen ? 310 : 0,
        }}
        animate={{
          marginLeft: sidebar.isOpen ? 310 : 0,
        }}
      >
        <Heading size="xl">Files ({folders.current.files?.length})</Heading>
        <div className="flex items-center justify-between">
          <Breadcrumbs />
          <Viewer />
        </div>

        <div className="w-full py-4">
          <div className="flex items-center gap-2">
            <input
              className="w-4 h-4"
              type="checkbox"
              checked={
                selectedFiles.list.length === folders.current.files?.length
              }
              onChange={(e) => {
                // get all files from current folder
                const folderFiles = folders.current.files;

                if (e.target.checked) {
                  // Select all files in the current folder
                  selectedFiles.set(folderFiles as File[]);
                } else {
                  // Deselect all files in the current folder
                  const remainingFiles = selectedFiles.list.filter(
                    (file) =>
                      !folderFiles?.some(
                        (folderFile) => folderFile.id === file.id,
                      ),
                  );
                  selectedFiles.set(remainingFiles);
                }
              }}
            />
            Selecionar todos
          </div>
        </div>
        <FileManagerList />
        <FileManagerPreview />
      </motion.div>
    </main>
  );
};

export default FileManager;

import { useEffect } from "react";
import { cn } from "../lib/utils";
import { Breadcrumbs } from "./breadcrumb";
import { Heading } from "./heading";
import { Sidebar } from "./sidebar";

import { motion } from "motion/react";
import { getFiles, getFolders } from "../utils/get-files";
import { ListItem } from "./list-item";
import { FileList } from "./file-list";
import { FilePreview } from "./preview";
import { useDosya } from "../stores/dosya-store";

const FileManager = () => {
  const { files, sidebar, folders } = useDosya();

  useEffect(() => {
    if (files.list?.length) return;
    const fetchFiles = async () => {
      files.fetch(getFiles);
    };

    fetchFiles();
  }, [files]);

  useEffect(() => {
    if (files.list?.length) return;
    const fetchFfolders = async () => {
      files.fetch(getFolders);
    };

    fetchFfolders();
  }, [folders]);

  return (
    <main className="flex h-full">
      <div className="h-full fixed">
        <Sidebar />
      </div>

      <motion.div
        className={cn("h-full w-full flex flex-col gap-4 !p-8")}
        initial={{
          marginLeft: sidebar.isOpen ? 310 : 0,
        }}
        animate={{
          marginLeft: sidebar.isOpen ? 310 : 0,
        }}
      >
        <Heading size="xl">Files (10)</Heading>
        <div className="flex items-center justify-between">
          <Breadcrumbs />
          <ListItem />
        </div>

        <div className="w-full py-4">
          <div className="flex items-center gap-2">
            <input
              className="w-4 h-4"
              type="checkbox"
              // checked={
              //   selectedFiles.list.length === folders.current.files?.length
              // }
              // onChange={(e) => {
              //   // get all files from current folder
              //   const folderFiles = folders.current.files;

              //   if (e.target.checked) {
              //     // Select all files in the current folder
              //     selectedFiles.set(folderFiles as File[]);
              //   } else {
              //     // Deselect all files in the current folder
              //     const remainingFiles = selectedFiles.list.filter(
              //       (file) =>
              //         !folderFiles?.some(
              //           (folderFile) => folderFile.id === file.id
              //         )
              //     );
              //     selectedFiles.set(remainingFiles);
              //   }
              // }}
            />
            Selecionar todos
          </div>
        </div>
        <FileList />
        <FilePreview />
      </motion.div>
    </main>
  );
};

export default FileManager;

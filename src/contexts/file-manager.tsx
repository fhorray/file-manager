import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import { buildFolderStructure, organizeFiles } from "../utils/dosya";
import dayjs from "dayjs";
import { File, Folder, R2ObjectsList } from "../types/files";

const FileManagerContext = createContext<FileManagerStoreProps | undefined>(
  undefined
);

const FileManagerProvider = ({
  children,
  config,
}: {
  children: React.ReactNode;
  config?: FileManagerConfig;
}) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentPath, setCurrentPath] = useState("/");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewFile, setPreviewFile] = useState<File | null>(null);
  const [layout, setLayout] = useState<"grid" | "list">("grid");

  const [error, setError] = useState<FileManagerContext["error"]>({
    isError: false,
    name: "",
    message: "",
  });

  const [filesData, setFilesData] = useState<R2ObjectsList | undefined>(
    undefined
  );

  // FETCH FILES FROM API
  const fetchFiles = useCallback(
    async (
      fetchFunction: () => Promise<{ data: R2ObjectsList } | undefined>
    ) => {
      try {
        if (fetchFunction) {
          const data = await fetchFunction();
          setFilesData(data?.data);
        }
      } catch (error) {
        if (error instanceof Error) {
          setError({
            isError: true,
            ...error,
          });
        }
      }
    },
    []
  );

  // DELETE FILE FROM API
  const deleteFile = useCallback(
    async (key: string, deleteFileFunction: (key: string) => Promise<any>) => {
      if (deleteFileFunction) {
        await deleteFileFunction(key);
      }
    },
    []
  );

  // UPDATE FILE FROM API
  const updateFile = useCallback(
    async (key: string, updateFileFunction: (key: string) => Promise<any>) => {
      if (updateFileFunction) {
        await updateFileFunction(key);
      }
    },
    []
  );

  // UPDATE FILE FROM API
  const uploadFile = useCallback(
    async (file: File, uploadFileFunction: (file: File) => Promise<any>) => {
      if (uploadFileFunction) {
        await uploadFileFunction(file);
      }
    },
    []
  );

  const files = useMemo(() => {
    const mapped = filesData?.objects?.map((file) => {
      return {
        key: file.key,
        size: file.size,
        lastModified: dayjs(file.uploaded).toISOString(),
      };
    });

    const organized = organizeFiles(mapped!);

    return organized.filter((file) => {
      return !file.isDir;
    });
  }, [filesData]);

  const folders = useMemo(() => {
    return buildFolderStructure(files);
  }, [files]);

  // CONTEXT OBJECT
  const context: FileManagerContext = {
    error: error as FileManagerContext["error"],
    setError: setError,
    baseUrl: config?.baseUrl,
  };

  return (
    <FileManagerContext.Provider
      value={{
        context,

        layout: {
          style: layout,
          setStyle: setLayout,
        },

        path: {
          current: currentPath,
          set: setCurrentPath,
        },
        files: {
          list: files,
          fetch: fetchFiles,
          delete: deleteFile,
          update: updateFile,
          upload: uploadFile,
        },
        folders: {
          list: folders,
          current: {
            files: files?.filter((file) => {
              const splited = file.path.split("/");

              splited.shift();

              return splited.join("/").startsWith(currentPath);
            }),
          },
        },
        preview: {
          isOpen: isPreviewOpen,
          setIsOpen: setIsPreviewOpen,
          file: previewFile,
          setFile: setPreviewFile,
          clear: () => setPreviewFile(null),
        },
        selectedFiles: {
          list: selectedFiles,
          set: setSelectedFiles,
          clear: () => setSelectedFiles([]),
          delete: (file) => {
            const filtered = selectedFiles?.filter((f) => f.id !== file.id);
            setSelectedFiles(filtered);
          },
        },

        sidebar: {
          isOpen: isSidebarOpen,
          setIsOpen: setIsSidebarOpen,
        },
      }}
    >
      {children}
    </FileManagerContext.Provider>
  );
};

const useFileManager = () => {
  const context = useContext(FileManagerContext);

  return context as FileManagerStoreProps;
};

// eslint-disable-next-line react-refresh/only-export-components
export { useContext, useFileManager, FileManagerContext, FileManagerProvider };

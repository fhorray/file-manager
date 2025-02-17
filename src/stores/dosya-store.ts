import { create } from "zustand";
import { DosyaStoreProps } from "../types/dosya";
import { File, Folder, R2ObjectsList } from "../types/files";
import dayjs from "dayjs";
import { organizeFiles } from "../utils/dosya";

export const useDosya = create<DosyaStoreProps>((set) => ({
  // CONTEXT
  context: {
    error: {
      isError: false,
      message: "",
      name: "",
      stack: "",
    },
    setError: () => {},
    baseUrl: "https://media.grupometrcasa.com",
  },

  // UI
  layout: {
    mode: "grid",
    set: (mode: "grid" | "list") =>
      set((state) => ({
        layout: {
          mode: mode,
          set: state.layout.set,
        },
      })),
  },

  // FILES
  files: {
    list: [],
    fetch: async (fetchFiles: () => Promise<{ data: R2ObjectsList }>) => {
      try {
        const result = await fetchFiles();
        if (result?.data) {
          const mapped = result?.data.objects?.map((file) => {
            return {
              key: file.key,
              size: file.size,
              lastModified: dayjs(file.uploaded).toISOString(),
            };
          });

          set((state) => ({
            ...state,
            files: {
              ...state.files,
              list: organizeFiles(mapped),
            },
          }));
        }
      } catch (error) {
        if (error instanceof Error) {
          set({
            context: {
              error: {
                isError: true,
                ...error,
              },
            },
          });
        }
      }
    },
    upload: async (file: File, uploadFile: () => Promise<unknown>) => {
      try {
        await uploadFile();
        return undefined;
      } catch (error) {
        if (error instanceof Error) {
          set({
            context: {
              error: {
                isError: true,
                ...error,
              },
            },
          });
        }
      }
    },
    delete: async (key: string, deleteFileFunction: () => Promise<unknown>) => {
      try {
        await deleteFileFunction();
      } catch (error) {
        if (error instanceof Error) {
          set({
            context: {
              error: {
                isError: true,
                ...error,
              },
            },
          });
        }
      }
    },
    update: async (key: string, updateFileFunction: () => Promise<unknown>) => {
      try {
        await updateFileFunction();
      } catch (error) {
        if (error instanceof Error) {
          set({
            context: {
              error: {
                isError: true,
                ...error,
              },
            },
          });
        }
      }
    },
  },

  // FOLDERS
  folders: {
    current: "test",
    list: [],
    fetch: async (fetchFolders: () => Promise<{ data: Folder[] }>) => {
      try {
        const result = await fetchFolders();
        console.log("RETRIEVED FOLDERS: ");
        console.log(result);
        // if (result?.data) {
        //   set((state) => ({
        //     ...state,
        //     folders: {
        //       ...state.folders,
        //       list: result.data,
        //     },
        //   }));
        // }
      } catch (error) {
        if (error instanceof Error) {
          set({
            context: {
              error: {
                isError: true,
                ...error,
              },
            },
          });
        }
      }
    },
  },

  // PATH
  path: {
    current: "",
    set: (path: string) =>
      set((state) => ({
        path: {
          current: path,
          set: state.path.set,
        },
      })),
  },

  // PREVIEW
  preview: {
    isOpen: false,
    setIsOpen: () => {},
    file: null,
    setFile: () => {},
    clear: () => {},
  },

  selectedFiles: {
    set: () => {},
    clear: () => {},
    delete: () => {},
    list: [],
  },

  sidebar: {
    isOpen: true,
    toggle: () => {},
  },
}));

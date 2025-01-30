import { useFileManager } from "../contexts/file-manager";
import { FileRenderer } from "./file-renderer";
import { FolderRenderer } from "./folder-renderer";

const FileManagerGrid = () => {
  const { files, folders, path } = useFileManager();

  const nestedFolders = folders.folders.map((folder) => folder.path);

  console.log(nestedFolders);

  return (
    <main className="w-full h-screen flex flex-col gap-4">
      {/* FOLDERS RENDER */}
      <div className="w-full h-full max-h-[60px] grid grid-cols-4 gap-4 grid-rows-1">
        {folders.folders.map((item) => (
          <FolderRenderer file={item} />
        ))}
      </div>

      {/* FILES RENDER */}
      <div className="w-full h-full max-h-[300px] grid grid-cols-4 gap-4">
        {files?.map((file) => {
          const fileName = file.path.split("/");
          fileName.pop(); // remove last item which is the file name temrinating in .jpg/.jpg etc...
          fileName.shift();

          if (path !== fileName.join("/") + "/") return null; // verify if current path from context is equal to the fileName.join("/") path

          return <FileRenderer key={file.id} file={file} />;
        })}
      </div>
    </main>
  );
};

export default FileManagerGrid;

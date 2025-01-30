import { useFileManager } from "../contexts/file-manager";
import Breadcrumbs from "./breadcrumbs";
import FileManagerGrid from "./file-manager-grid";
import { Filters } from "./filters";
import { Heading } from "./heading";
import Sidebar from "./sidebar";

const FileManager = () => {
  const { files, path } = useFileManager();

  const totalFilesInFolder = files?.filter((file) => {
    const splited = file.path.split("/");

    splited.shift();
    console.log(path);
    console.log(splited.join("/"));

    return splited.join("/").startsWith(path);
  });

  return (
    <main className="flex h-auto">
      <Sidebar />

      <div className="p-4 w-full flex flex-col gap-4 h-auto pl-[360px]">
        <Heading size="xl">Files ({totalFilesInFolder?.length})</Heading>
        <Breadcrumbs />
        <Filters />
        <FileManagerGrid />
      </div>
    </main>
  );
};

export default FileManager;

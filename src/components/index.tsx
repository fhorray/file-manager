import { useFileManager } from '../contexts/file-manager';
import FileManagerGrid from './file-manager-grid';
import { Heading } from './heading';
import Sidebar from './sidebar';

const FileManager = () => {
  const { files, path } = useFileManager();

  const totalFilesInFolder = files?.filter((file) => {
    const splited = file.path.split('/');

    splited.shift();
    console.log(path);
    console.log(splited.join('/'));

    return splited.join('/').startsWith(path);
  });

  console.log(files);

  return (
    <main className="flex h-auto">
      <Sidebar />

      <div className="p-4 w-full flex flex-col gap-4">
        <Heading size="xl">Files ({totalFilesInFolder?.length})</Heading>
        <FileManagerGrid />
      </div>
    </main>
  );
};

export default FileManager;

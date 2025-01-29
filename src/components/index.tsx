import FileManagerGrid from './file-manager-grid';
import Sidebar from './sidebar';

const FileManager = () => {
  return (
    <main className="flex">
      <Sidebar />
      <FileManagerGrid />
    </main>
  );
};

export default FileManager;

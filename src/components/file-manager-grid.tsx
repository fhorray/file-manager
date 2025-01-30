import { useFileManager } from '../contexts/file-manager';
import FileRenderer from './file-renderer';

const FileManagerGrid = () => {
  const { files, path } = useFileManager();

  return (
    <main className="w-full h-full grid grid-cols-4 gap-4 grid-rows-3">
      {files?.map((file) => {
        const fileName = file.path.split('/');
        fileName.pop(); // remove last item which is the file name temrinating in .jpg/.jpg etc...
        fileName.shift();

        if (path !== fileName.join('/') + '/') return null; // verify if current path from context is equal to the fileName.join("/") path

        return <FileRenderer key={file.id} file={file} />;
      })}
    </main>
  );
};

export default FileManagerGrid;

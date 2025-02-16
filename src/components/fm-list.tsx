import { useFileManager } from '../contexts/file-manager';
import { cn } from '../lib/utils';
import { FileRenderer } from './fm-file-renderer';

export const FileManagerList = () => {
  const { files, path, layout } = useFileManager();

  return (
    <main
      className={cn(
        'w-full h-full',
        layout.style === 'grid'
          ? 'grid grid-cols-4 gap-4 '
          : 'flex flex-col gap-0',
      )}
    >
      {files.list?.map((file) => {
        const fileName = file.path.split('/');
        fileName.pop(); // remove last item which is the file name temrinating in .jpg/.jpg etc...
        fileName.shift();

        if (path.current !== fileName.join('/') + '/') return null; // verify if current path from context is equal to the fileName.join("/") path

        return <FileRenderer key={file.id} file={file} />;
      })}
    </main>
  );
};

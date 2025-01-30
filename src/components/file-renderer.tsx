import { ImageIcon, Trash2Icon } from 'lucide-react';
import { File } from '../@types/files';
import FileManagerPreview from './file-manager-preview';

import { useFileManager } from '../contexts/file-manager';
import { Checkbox } from './ui/checkbox';

const FileRenderer = ({ file }: { file: File }) => {
  const { selectedFiles, setSelectedFiles } = useFileManager();
  return (
    <div className="w-full h-full border border-gray-300 rounded-xl relative cursor-pointer">
      {/* OPTIONS */}
      <button
        className="absolute right-2 top-2 p-1 hover:bg-gray-200 transition-all rounded-md"
        onClick={() => window.alert(`DELETE FILE: ${file.path}`)}
      >
        <Trash2Icon className="w-5 text-red-500" />
      </button>

      {/* SELECT ICON */}
      <Checkbox
        className="z-10 absolute w-4 h-4 left-4 top-4"
        checked={!!selectedFiles.find((f) => f.id === file.id)}
        onCheckedChange={(v) => {
          const found = selectedFiles.find((f) => f.id === file.id);
          if (!found && v) setSelectedFiles([...selectedFiles, file]);
          if (!v) {
            const filtered = selectedFiles.filter((f) => f.id !== file.id);
            setSelectedFiles(filtered);
          }
        }}
      />

      <FileManagerPreview key={file.id} file={file}>
        <div className="w-full h-full max-h-[30%] bg-gradient-to-t from-black/40 to-transparent absolute bottom-0 rounded-xl" />

        {/* IMAGE INFO */}
        <ImageIcon className="w-20 h-20 text-gray-300 absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 group-hover:scale-110 transition-all" />
        {/* FILE INFO */}
        <div className="absolute bottom-4 p-4">
          {file.name} - {file.size}
        </div>
      </FileManagerPreview>
    </div>
  );
};

export default FileRenderer;

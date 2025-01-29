import { FolderIcon } from 'lucide-react';
import { Folder } from '../@types/files';
import { useFileManager } from '../contexts/file-manager';
import { useState } from 'react';
import { cn } from '../lib/utils';
import { Button } from './ui/button';

const FolderTree = () => {
  const { folders } = useFileManager();

  return (
    <ul>
      {folders.folders.map((folder) => (
        <FolderRenderer key={folder.id} folder={folder} />
      ))}
    </ul>
  );
};

const FolderRenderer = ({ folder }: { folder: Folder }) => {
  const [expanded, setExpanded] = useState(false);
  const { setPath, path } = useFileManager();

  return (
    <li className="">
      <div
        className={cn(
          'flex items-center gap-4 w-full p-2 border-2 border-transparent select-none rounded-lg',
          expanded
            ? 'border border-gray-300 hover:bg-gray-300 transition-all'
            : 'flex items-center gap-4',
          path === folder.path &&
            'bg-gray-300 hover:bg-gray-400 hover:text-gray-700',
        )}
      >
        <Button
          className="hover:bg-gray-400"
          variant={'ghost'}
          size={'icon'}
          onClick={() => {
            if (folder.folders.length) {
              setExpanded(!expanded);
            }
            setPath(folder.path);
          }}
        >
          <FolderIcon className={cn('', expanded && 'fill-gray-500')} />
        </Button>
        {folder.name}
      </div>

      {/* Render subfolders recursively if they exist */}
      {expanded && (
        <>
          {folder.folders && folder.folders.length > 0 && (
            <ul className={cn('', expanded && 'pl-4')}>
              {folder.folders.map((subfolder) => (
                <FolderRenderer key={subfolder.id} folder={subfolder} />
              ))}
            </ul>
          )}
        </>
      )}
    </li>
  );
};

export default FolderTree;

import { FolderIcon, SearchIcon } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useFileManager } from '../contexts/file-manager';
import { cn } from '../lib/utils';

const Sidebar = () => {
  const { path, setPath, files, folders } = useFileManager();

  // console.log({ files });
  // console.log({ folders });

  const filterFiles = (value: string) => {
    console.log(value);
  };

  return (
    <aside className="flex flex-col gap-4 bg-gray-100 h-screen w-[20%] p-4 border-r-2 border-gray-300 overflow-scroll">
      <h2 className="text-2xl font-bold py-4">Gerenciador de Arquivos</h2>
      {/* search input */}
      <div className="relative">
        <Input
          type="search"
          placeholder="Search a file..."
          onChange={(e) => filterFiles(e.target.value)}
        />
        <SearchIcon className="absolute right-2 top-2 text-gray-300" />
      </div>
      Current Path: {path}
      {/* FOLDERS */}
      <div className="flex flex-col gap-2">
        {folders?.map((folder) => {
          return (
            <Button
              className={cn(
                'justify-start',
                folder?.path === path &&
                  'bg-gray-400 text-white hover:bg-gray-500 hover:text-white',
              )}
              variant={'outline'}
              onClick={() => setPath(folder?.path ?? '/')}
            >
              <FolderIcon />
              {folder?.name}
            </Button>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;

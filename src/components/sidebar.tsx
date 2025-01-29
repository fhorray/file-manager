import { SearchIcon, PanelTopCloseIcon } from 'lucide-react';
import { Input } from './ui/input';

import { Button } from './ui/button';
import FolderTree from './folder-tree';
import { useFileManager } from '../contexts/file-manager';

const Sidebar = () => {
  const { path } = useFileManager();
  const filterFiles = (value: string) => {
    console.log(value);
    // Implement file filtering logic here
  };

  return (
    <aside className="flex flex-col gap-4 bg-gray-100 h-screen w-[350px] p-4 border-r-2 border-gray-300 overflow-y-auto">
      <h2 className="text-2xl font-bold py-4">Gerenciador de Arquivos</h2>
      <div className="relative">
        <Input
          type="search"
          placeholder="Search a file..."
          onChange={(e) => filterFiles(e.target.value)}
        />
        <SearchIcon className="absolute right-2 top-2 text-gray-300" />
      </div>
      {/* OPTIONS */}
      <div>
        <Button size={'icon'} variant={'outline'}>
          <PanelTopCloseIcon />
        </Button>
      </div>

      {/* FOLDER TREE */}
      <span>
        Current path: <strong>{path}</strong>
      </span>
      <FolderTree />
    </aside>
  );
};

export default Sidebar;

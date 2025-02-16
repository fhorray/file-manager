import { LayoutGridIcon, LayoutListIcon } from 'lucide-react';
import { useFileManager } from '../contexts/file-manager';
import { cn } from '../lib/utils';

export const Viewer = () => {
  const { layout } = useFileManager();

  const isActive = 'bg-gray-200';

  return (
    <div className="flex items-center gap-2">
      <button
        className={cn(
          'flex items-center justify-center bg-gray-100 rounded-full p-3 hover:bg-gray-200 transition-all',
          layout.style === 'grid' && isActive,
        )}
        onClick={() => layout.setStyle('grid')}
      >
        <LayoutGridIcon />
      </button>
      <button
        className={cn(
          'flex items-center justify-center bg-gray-100 rounded-full p-3 hover:bg-gray-200 transition-all',
          layout.style === 'list' && isActive,
        )}
        onClick={() => layout.setStyle('list')}
      >
        <LayoutListIcon />
      </button>
    </div>
  );
};

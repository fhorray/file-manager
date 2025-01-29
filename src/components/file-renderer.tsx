import { EllipsisVerticalIcon, ImageIcon } from "lucide-react";
import { SelectFile } from "../@types/files";
import FileManagerPreview from "./file-manager-preview";

import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

const FileRenderer = ({ file }: { file: SelectFile }) => {
  return (
    <div className="w-full h-full border border-gray-300 rounded-xl relative cursor-pointer">
      {/* OPTIONS */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" asChild>
            <Button
              variant={"outline"}
              size={"icon"}
              className="rounded-full absolute right-2 top-2 z-20"
            >
              <EllipsisVerticalIcon />
            </Button>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-4 w-[100px]">TESTE XYZ</PopoverContent>
      </Popover>

      <FileManagerPreview key={file.id} file={file}>
        <div className="w-full h-full max-h-[30%] bg-gradient-to-t from-black/40 to-transparent absolute bottom-0 rounded-xl" />
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

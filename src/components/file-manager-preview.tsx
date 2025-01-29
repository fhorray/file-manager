import { ReactNode } from "react";
import { useFileManager } from "../contexts/file-manager";
import { Button } from "./ui/button";
import { ImageIcon, XIcon } from "lucide-react";
import { SelectFile } from "../@types/files";

const FileManagerPreview = ({
  children,
  file,
}: {
  children: ReactNode;
  file: SelectFile;
}) => {
  const { activePreview, setActivePreview } = useFileManager();

  return (
    <div>
      {/* TRIGGER */}
      <div
        className="w-full h-full"
        onClick={() => {
          setActivePreview(!activePreview);
        }}
      >
        {children}
      </div>

      {activePreview && (
        <div className="w-screen h-screen bg-black/30 fixed top-0 left-0 z-30">
          {/* CONTENT */}
          <div className="w-2/4 h-[70%] bg-white absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 rounded-xl">
            <div className="w-full h-full max-h-[30%] bg-gradient-to-t from-black/40 to-transparent absolute bottom-0 rounded-xl" />

            {/* CLOSE ICON */}
            <Button
              onClick={() => {
                setActivePreview(!activePreview);
              }}
              variant={"outline"}
              size={"icon"}
              className="rounded-full right-4 top-4 absolute"
            >
              <XIcon />
            </Button>

            {/* IMAGE */}
            <ImageIcon className="w-32 h-32 text-gray-200 absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4" />

            {/* FILE INFO */}
            <div className="absolute bottom-0 p-8 text-white">
              {file.name} - {file.size}
            </div>
          </div>
        </div>
      )}

      <div className="w-full h-full relative z-20" />
    </div>
  );
};

export default FileManagerPreview;

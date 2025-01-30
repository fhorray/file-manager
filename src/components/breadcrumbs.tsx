import { useFileManager } from "../contexts/file-manager";
import { ChevronRightIcon, HomeIcon } from "lucide-react";
import { cn } from "../lib/utils";

const Breadcrumbs = () => {
  const { path, setPath } = useFileManager();

  const splitted = path.split("/").filter(Boolean);

  return (
    <div className="flex items-center py-4 px-1">
      <HomeIcon
        className="w-5 h-5 cursor-pointer pb-0.5"
        onClick={() => setPath("/properties")}
      />
      {splitted.map((item, index) => {
        //TODO: fix the onClick bug, its not showing the images correctly
        const isLast = index === splitted.length - 1;
        const newPath = `/${splitted.slice(0, index + 1).join("/")}`;

        return (
          <div key={index} className="flex items-center">
            {index !== 0 && <ChevronRightIcon className="w-4 h-4" />}
            <span
              className={cn(
                "cursor-pointer pb-1 hover:bg-gray-200 px-2 hover:rounded-lg transition-all",
                isLast ? "font-bold text-blue-600" : "text-gray-600"
              )}
              onClick={() => setPath(newPath)}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;

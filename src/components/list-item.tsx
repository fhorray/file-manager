import { LayoutGridIcon, LayoutListIcon } from "lucide-react";
import { cn } from "../lib/utils";
import { useDosya } from "../stores/dosya-store";

export const ListItem = () => {
  const { layout } = useDosya();

  const isActive = "bg-gray-200";

  return (
    <div className="flex items-center gap-2">
      <button
        className={cn(
          "flex items-center justify-center bg-gray-100 rounded-full p-3 hover:bg-gray-200 transition-all",
          layout.mode === "grid" && isActive
        )}
        onClick={() => layout.set("grid")}
      >
        <LayoutGridIcon />
      </button>
      <button
        className={cn(
          "flex items-center justify-center bg-gray-100 rounded-full p-3 hover:bg-gray-200 transition-all",
          layout.mode === "list" && isActive
        )}
        onClick={() => layout.set("list")}
      >
        <LayoutListIcon />
      </button>
    </div>
  );
};

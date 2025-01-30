import { Input } from "./ui/input";
import { SearchIcon } from "lucide-react";

export const Filters = () => {
  const filterFiles = (value: string) => {
    console.log(value);
    // Implement file filtering logic here
  };

  return (
    <div className="flex items-center justify-between">
      <div className="w-full max-w-[20%] relative">
        <Input
          type="search"
          placeholder="Search a file..."
          onChange={(e) => filterFiles(e.target.value)}
          className="w-full"
        />
        <SearchIcon className="absolute right-2 top-2 text-gray-300" />
      </div>
    </div>
  );
};

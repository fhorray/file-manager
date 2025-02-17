import { cn } from "../lib/utils";
import { useDosya } from "../stores/dosya-store";
import { FileRenderer } from "./file-renderer";

export const FileList = () => {
  const { files, path, layout } = useDosya();

  return (
    <main
      className={cn(
        "w-full h-full",
        layout.mode === "grid"
          ? "grid grid-cols-4 gap-4 "
          : "flex flex-col gap-0"
      )}
    >
      {files.list?.map((file) => {
        const fileName = file.path.split("/");
        fileName.pop(); // remove last item which is the file name temrinating in .jpg/.jpg etc...
        fileName.shift();

        if (path.current !== fileName.join("/") + "/") return null; // verify if current path from context is equal to the fileName.join("/") path

        return <FileRenderer key={file.id} file={file} />;
      })}
    </main>
  );
};

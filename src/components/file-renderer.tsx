import { Trash2Icon } from "lucide-react";
import { File } from "../types/files";

import { formatBytes } from "../utils/dosya";
import { cn } from "../lib/utils";
import { useDosya } from "../stores/dosya-store";

export const FileRenderer = ({ file }: { file: File }) => {
  const { selectedFiles, preview, context, layout } = useDosya();

  return (
    <div>
      {layout.mode === "grid" ? (
        <div
          className="w-full h-[300px] border border-gray-300 rounded-xl relative cursor-pointer overflow-hidden bg-black hover:scale-105 transition-all"
          onClick={() => {
            preview.setFile(file);
          }}
        >
          {/* OPTIONS */}
          <div
            className={cn(
              "w-full flex justify-between absolute top-0 p-4 opacity-0 transition-all hover:opacity-100",
              selectedFiles.list.find((f) => f.id === file.id) && "opacity-100"
            )}
          >
            <input
              type="checkbox"
              checked={!!selectedFiles.list.find((f) => f.id === file.id)}
              className="w-4 h-4"
              onChange={(e) => {
                const checked = e.target.checked;

                const found = selectedFiles.list.find((f) => f.id === file.id);
                if (!found && checked)
                  selectedFiles.set([...selectedFiles.list, file]);
                if (!checked) {
                  const filtered = selectedFiles.list.filter(
                    (f) => f.id !== file.id
                  );
                  selectedFiles.set(filtered);
                }
              }}
            />

            <button
              className="hover:bg-gray-200 transition-all rounded-md"
              onClick={() => {}}
            >
              <Trash2Icon className="w-5 text-red-500" />
            </button>
          </div>

          {/* IMAGE INFO */}
          <img
            src={`${context.baseUrl}/${file?.path}`}
            onClick={() => preview.setIsOpen(true)}
            className="w-full h-full object-cover"
          />

          {/* FILE INFO */}
          <div className="w-full flex flex-col gap-2 absolute bottom-0 p-4 min-h-[10%] bg-white backdrop-filter backdrop-blur-md bg-opacity-50 rounded-md">
            <h4>
              <strong>Name:</strong> {file.name.substring(0, 10)}...
            </h4>
            <span>
              <strong>Size:</strong> {formatBytes(file.size as string)}
            </span>
          </div>
        </div>
      ) : (
        <ul className="w-full flex flex-col gap-2">
          <li className="w-full flex items-center p-3 border-b border-gray-300 relative cursor-pointer overflow-hidden hover:bg-gray-100  transition-all">
            <div
              className="w-full flex items-center gap-4"
              onClick={() => {
                preview.setFile(file);
                const found = selectedFiles.list.find((f) => f.id === file.id);
                if (!found) {
                  selectedFiles.set([...selectedFiles.list, file]);
                } else {
                  selectedFiles.set(
                    selectedFiles.list.filter((f) => f.id !== file.id)
                  );
                }
              }}
            >
              {/* CHECKBOX */}
              <input
                type="checkbox"
                checked={!!selectedFiles.list.find((f) => f.id === file.id)}
                className="w-4 h-4"
                onChange={(e) => {
                  const checked = e.target.checked;
                  const found = selectedFiles.list.find(
                    (f) => f.id === file.id
                  );
                  if (!found && checked)
                    selectedFiles.set([...selectedFiles.list, file]);
                  if (!checked) {
                    const filtered = selectedFiles.list.filter(
                      (f) => f.id !== file.id
                    );
                    selectedFiles.set(filtered);
                  }
                }}
              />

              {/* IMAGE PREVIEW */}
              <img
                src={`${context.baseUrl}/${file?.path}`}
                onClick={() => preview.setIsOpen(true)}
                className="w-16 h-16 object-cover rounded-md bg-black"
              />

              {/* FILE INFO */}
              <div className="flex flex-col flex-1">
                <h4>
                  <strong>Name:</strong> {file.name}
                </h4>
                <span>
                  <strong>Size:</strong> {formatBytes(file.size as string)}
                </span>
              </div>
            </div>

            {/* DELETE BUTTON */}
            <button
              className="hover:bg-gray-200 transition-all rounded-md p-2"
              onClick={() => {}}
            >
              <Trash2Icon className="w-5 text-red-500" />
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

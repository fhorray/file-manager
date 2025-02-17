"use client";

import { motion } from "framer-motion";
import { ChevronRightIcon, HomeIcon } from "lucide-react";
import { cn } from "../lib/utils";
import { useDosya } from "../stores/dosya-store";

export const Breadcrumbs = () => {
  const { path } = useDosya();

  const splitted = path.current.split("/").filter(Boolean);

  return (
    <nav className="flex items-center py-4 px-1 overflow-x-auto whitespace-nowrap h-16">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="text-gray-600 hover:text-blue-600 transition-colors"
        onClick={() => path.set("/")}
      >
        <HomeIcon className="w-5 h-5" />
      </motion.button>
      {splitted.map((item, index) => {
        const isLast = index === splitted.length - 1;
        const newPath = `/${splitted.slice(0, index + 1).join("/")}`;

        return (
          <div key={index} className="flex items-center">
            <ChevronRightIcon className="w-4 h-4 mx-2 text-gray-400" />
            <motion.button
              className={cn(
                "text-sm hover:text-blue-600 transition-colors",
                isLast ? "font-semibold text-blue-600" : "text-gray-600"
              )}
              onClick={() => path.set(newPath)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </motion.button>
          </div>
        );
      })}
    </nav>
  );
};

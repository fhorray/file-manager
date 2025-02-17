import { Folder, R2ObjectsList } from "../types/files";

export const getFiles = async (): Promise<{ data: R2ObjectsList }> => {
  try {
    const res = await fetch("https://api.grupometrocasa.com/v1/file/list");
    const data = await res.json();

    return data as { data: R2ObjectsList };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getFolders = async (): Promise<{ data: Folder[] }> => {
  try {
    const res = await fetch(
      "https://api.grupometrocasa.com/v1/file/list/folders",
      {
        method: "POST",
        // sent key folder with body
        body: JSON.stringify({ key: "properties" }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();

    return data as { data: Folder[] };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

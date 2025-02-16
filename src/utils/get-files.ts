import { R2ObjectsList } from '../@types/files';

export const getFiles = async () => {
  try {
    const res = await fetch('https://api.grupometrocasa.com/v1/file/list');

    const data = await res.json();

    return data as { data: R2ObjectsList };
  } catch (error) {
    console.error(error);
  }
};

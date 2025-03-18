import { ELOCALSTORAGE_KEYS } from "@/constants";

export const getItem = <T>(key: string): T | null => {
  try {
    const item = localStorage.getItem(key);

    if (!item) {
      return null;
    }
    return JSON.parse(item) as T;
  } catch {
    return null;
  }
};

export const setItem = <T>(key: ELOCALSTORAGE_KEYS, value: T): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

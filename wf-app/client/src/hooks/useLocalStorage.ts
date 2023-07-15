import { useState } from "react";

export const useLocalStorage = () => {
  const [value, setValue] = useState<string>("");

  const setItem = (key: string, value: string): void => {
    localStorage.setItem(key, value);
    setValue(value);
  };

  const getItem = (key: string): string => {
    const val: string = localStorage.getItem(key) || "";
    if (val !== "") {
      setValue(val);
    }
    return val;
  };

  return { value, setItem, getItem };
};

import { useState, useEffect } from "react";

const prefix = "b-19-";

export default function useLocalStorage(key, initialValue) {
  const prefixedKey = prefix + key;
  const [value, setValue] = useState(() => {
    // pengecekan apakah key yang dimaksud sudah ada di local storage
    const localValue = localStorage.getItem(prefixedKey);
    if (localValue !== null) {
      if (localValue === "undefined") {
        // do nothing
      } else {
        return JSON.parse(localValue);
      }
    }
    if (typeof initialValue === "function") {
      // jika initialValue berupa fungsi, maka jalankan fungsinya
      return initialValue();
    } else {
      // jika initialValue berupa variabel, maka returnkan nilainya
      return initialValue;
    }
  });

  useEffect(() => {
    // jika nilai dari value berubah, maka update localStorage
    localStorage.setItem(prefixedKey, JSON.stringify(value));
  }, [value, prefixedKey]);

  return [value, setValue];
}

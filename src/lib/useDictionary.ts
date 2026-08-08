"use client";

import { useEffect, useState } from "react";
import { DictionaryIndex, loadDictionary } from "./dictionary";

export function useDictionary() {
  const [dict, setDict] = useState<DictionaryIndex | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    loadDictionary()
      .then((d) => !cancelled && setDict(d))
      .catch(
        () =>
          !cancelled &&
          setError(
            "Couldn't load the dictionary. Please refresh and try again.",
          ),
      );
    return () => {
      cancelled = true;
    };
  }, []);

  return { dict, loading: !dict && !error, error };
}

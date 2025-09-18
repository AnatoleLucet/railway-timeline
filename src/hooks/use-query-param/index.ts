import React from "react";

const getQueryParam = (key: string): string | null => {
  if (typeof window === "undefined") return null;

  const params = new URLSearchParams(window.location.search);
  return params.get(key);
};

const setQueryParam = (key: string, value: string) => {
  if (typeof window === "undefined") return;

  const params = new URLSearchParams(window.location.search);
  if (!value) params.delete(key);
  else params.set(key, value);

  let newUrl = window.location.pathname;
  if (!params.toString()) newUrl += window.location.hash;
  else newUrl += `?${params.toString()}${window.location.hash}`;

  window.history.replaceState({}, "", newUrl);
};

/**
 * A hook that manages a query parameter in the URL.
 * Can be used as a replacement for useState when you want to persist
 * state in the URL.
 */
export const useQueryParam = (
  name: string,
  initialValue: string = "",
): [string, React.Dispatch<React.SetStateAction<string>>] => {
  const [value, setValue] = React.useState(() => {
    return getQueryParam(name) ?? initialValue;
  });

  React.useEffect(() => {
    setQueryParam(name, value);
  }, [value]);

  return [value, setValue];
};

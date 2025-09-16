import React, { useCallback } from "react";

/**
 * A hook that combines a local ref with a forwarded ref.
 * Useful for components that need to manage their own ref but also
 * need to expose it to the parent component with React.forwardRef.
 */
export const useForwardedRef = <T>(forwardedRef: React.Ref<T>) => {
  const ref = React.useRef<T>(null);

  const setRef = useCallback(
    (node: T) => {
      ref.current = node;

      if (typeof forwardedRef === "function") {
        forwardedRef(node);
      } else if (forwardedRef) {
        forwardedRef.current = node;
      }
    },
    [forwardedRef],
  );

  return [ref, setRef] as const;
};

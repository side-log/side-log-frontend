import { useEffect, useRef } from "react";

export default function useEffectOnce(
  effect: () => void | (() => void),
  deps: unknown[] = []
) {
  const hasEffected = useRef(false);

  useEffect(() => {
    if (!hasEffected.current) {
      const cleanup = effect();
      hasEffected.current = true;

      return cleanup;
    }
  }, [deps, effect]);
}

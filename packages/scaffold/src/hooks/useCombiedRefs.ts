import { useCallback } from 'react';

export function useCombinedRefs<T>(...refs: Array<React.Ref<T>>): React.Ref<T> {
  return useCallback(
    (element: T) => {
      refs.forEach(ref => {
        if (typeof ref === 'function') {
          ref(element);
        } else if (ref != null) {
          (ref as React.MutableRefObject<T>).current = element;
        }
      });
    },
    [refs]
  );
}

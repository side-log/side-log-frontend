import { useCallback, useEffect, useState, useLayoutEffect } from 'react';

const useBrowserLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : () => {};

type Size = {
  width: number;
  height: number;
};

export const getViewportSize = (): Size => {
  if (window.visualViewport) {
    return { width: window.visualViewport.width, height: window.visualViewport.height } as const;
  }

  return {
    width: window.innerWidth,
    height: window.innerHeight,
  } as const;
};

const useViewportSize = () => {
  const [viewportSize, setViewportSize] = useState<Size | undefined>();

  const updateViewportSize = useCallback(() => {
    const viewportSize = getViewportSize();

    setViewportSize(oldViewportSize => {
      if (
        oldViewportSize &&
        oldViewportSize.width === viewportSize.width &&
        oldViewportSize.height === viewportSize.height
      ) {
        return oldViewportSize;
      }

      return viewportSize;
    });
  }, []);

  useBrowserLayoutEffect(updateViewportSize, [updateViewportSize]);

  useEffect(() => {
    const effectTwice = () => {
      updateViewportSize();
      setTimeout(updateViewportSize, 10);
    };

    window.addEventListener('resize', effectTwice);
    window.addEventListener('orientationchange', effectTwice);
    window.visualViewport?.addEventListener('resize', effectTwice);

    return () => {
      window.removeEventListener('resize', effectTwice);
      window.removeEventListener('orientationchange', effectTwice);
      window.visualViewport?.removeEventListener('resize', effectTwice);
    };
  }, [updateViewportSize]);

  return viewportSize;
};

export default useViewportSize;

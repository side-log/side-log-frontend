import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';

export function useNavigate(url?: string, keepQuery = true) {
  const router = useRouter();

  const queryParams = useMemo(() => {
    if (url && typeof window !== 'undefined') {
      try {
        const urlObj = new URL(url, window.location.origin);
        return Object.fromEntries(urlObj.searchParams.entries());
      } catch (error) {
        console.error('URL parsing error:', error);
        return {};
      }
    }
    return { ...(router.query || {}) };
  }, [router.query, url]);

  const navigate = useCallback(
    (
      pathname: string,
      query?: Record<string, string | string[] | undefined>,
      options?: Parameters<typeof router.push>[2]
    ) => {
      const finalQuery = keepQuery ? { ...queryParams, ...query } : query;
      return router.push({ pathname, query: finalQuery }, undefined, options);
    },
    [router, queryParams, keepQuery]
  );

  const replace = useCallback(
    (
      pathname: string,
      query?: Record<string, string | string[] | undefined>,
      options?: Parameters<typeof router.replace>[2]
    ) => {
      const finalQuery = keepQuery ? { ...queryParams, ...query } : query;
      return router.replace({ pathname, query: finalQuery }, undefined, options);
    },
    [router, queryParams, keepQuery]
  );

  const goBack = useCallback(() => {
    router.back();
  }, [router]);

  return {
    ...router,
    queryParams,
    navigate,
    replace,
    goBack,
  };
}

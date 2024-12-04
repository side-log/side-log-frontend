import { useRouter } from 'next/router';
import { useCallback } from 'react';

export function useNavigate(keepQuery = true) {
  const router = useRouter();

  const getQueryParams = useCallback(() => {
    if (typeof window !== 'undefined') {
      try {
        const urlObj = new URL(window.location.href);
        return Object.fromEntries(urlObj.searchParams.entries());
      } catch (error) {
        console.error('URL parsing error:', error);
        return {};
      }
    }
    return { ...(router.query || {}) };
  }, [router.query]);

  const navigate = (
    pathname: string,
    query?: Record<string, string | string[] | undefined>,
    options?: Parameters<typeof router.push>[2]
  ) => {
    const finalQuery = keepQuery ? { ...getQueryParams(), ...query } : query;
    return router.push({ pathname, query: finalQuery }, undefined, options);
  };

  const replace = (
    pathname: string,
    query?: Record<string, string | string[] | undefined>,
    options?: Parameters<typeof router.replace>[2]
  ) => {
    const finalQuery = keepQuery ? { ...getQueryParams(), ...query } : query;
    return router.replace({ pathname, query: finalQuery }, undefined, options);
  };

  const goBack = () => {
    router.back();
  };

  return {
    navigate,
    replace,
    goBack,
  };
}

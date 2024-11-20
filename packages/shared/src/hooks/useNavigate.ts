import { useRouter } from 'next/router';
import { useMemo } from 'react';

export function useNavigate(url?: string) {
  const router = useRouter();

  const queryParams = useMemo(() => {
    if (url && window != null) {
      const urlObj = new URL(url, window.location.origin);
      return Object.fromEntries(urlObj.searchParams.entries());
    }
    return { ...(router.query || {}) };
  }, [router.query, url]);

  const navigate = (pathname: string, query?: Record<string, string | string[] | undefined>) => {
    router.push({ pathname, query: { ...queryParams, ...query } });
  };

  return {
    ...router,
    queryParams,
    navigate,
  };
}

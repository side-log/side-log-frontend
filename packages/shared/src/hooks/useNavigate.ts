import { useRouter } from 'next/router';
import { useMemo } from 'react';

export default function useNavigate(url?: string) {
  const router = useRouter();

  const queryParams = useMemo(() => {
    if (url) {
      const urlObj = new URL(url, window.location.origin);
      return Object.fromEntries(urlObj.searchParams.entries());
    }
    return { ...router.query };
  }, [router.query, url]);

  return {
    ...router,
    queryParams,
    navigate: (pathname: string, query?: object) => {
      router.push({ pathname, query: { ...queryParams, ...query } });
    },
  };
}

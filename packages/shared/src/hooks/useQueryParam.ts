import { SingletonRouter } from 'next/router';
import { useMemo, useState, useEffect } from 'react';

export default function useQueryParam<T = string>(param: string, options?: { required: boolean }) {
  const [nextRouter, setNextRouter] = useState<SingletonRouter | undefined>();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('next/router')
        .then(routerModule => {
          setNextRouter(routerModule as unknown as SingletonRouter);
        })
        .catch(() => {
          setNextRouter(undefined);
        });
    }
  }, []);

  const queryParam = useMemo(() => {
    let value: T | null = null;

    if (nextRouter != null && nextRouter.router != null) {
      const { router } = nextRouter;
      value = (router.query[param] as T) || null;
    } else if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      value = (urlParams.get(param) as unknown as T) || null;
    }

    if (options?.required && value === null) {
      throw new Error(`Query parameter "${param}" is required but was not found.`);
    }

    return value;
  }, [nextRouter, param, options?.required]);

  return queryParam;
}

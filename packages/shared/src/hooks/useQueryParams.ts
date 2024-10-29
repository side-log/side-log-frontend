import { useMemo, useEffect, useState } from 'react';
import { SingletonRouter } from 'next/router';

export function useQueryParams<T extends { [key: string]: string }>(options: { required: true }): T;
export function useQueryParams<T extends { [key: string]: string }>(
  options: { required: boolean } = { required: false }
): Partial<T> | T {
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

  const queryParams = useMemo(() => {
    const result: Partial<T> = {};

    if (nextRouter != null && nextRouter.router != null) {
      const { router } = nextRouter;
      Object.keys(router.query).forEach(key => {
        result[key as keyof T] = router.query[key] as T[keyof T];
      });
    } else if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      urlParams.forEach((value, key) => {
        result[key as keyof T] = value as T[keyof T];
      });
    }

    if (options.required) {
      for (const key in result) {
        if (result[key] == null) {
          throw new Error(`Query parameter "${key}" is required but was not found.`);
        }
      }
      return result as T;
    }

    return result;
  }, [nextRouter, options.required]);

  return queryParams;
}

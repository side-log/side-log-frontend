import { SingletonRouter } from "next/router";
import { useMemo, useState, useEffect } from "react";

export default function useQueryParam(param: string) {
  const [nextRouter, setNextRouter] = useState<SingletonRouter | undefined>();

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("next/router")
        .then((routerModule) => {
          setNextRouter(routerModule as unknown as SingletonRouter);
        })
        .catch(() => {
          setNextRouter(undefined);
        });
    }
  }, []);

  const queryParam = useMemo(() => {
    if (nextRouter != null && nextRouter.router != null) {
      const { router } = nextRouter;
      return router.query[param] || null;
    } else if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get(param);
    }
    return null;
  }, [nextRouter, param]);

  return queryParam;
}

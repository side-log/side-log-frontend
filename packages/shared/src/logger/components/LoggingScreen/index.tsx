import { PropsWithChildren } from "react";
import useEffectOnce from "../../../hooks/useEffectOnce";
import useLogger from "../../hooks/useLogger";

interface Props {
  id: number;
  params: Record<string, unknown>;
}

const LoggingScreen = ({ id, params, children }: PropsWithChildren<Props>) => {
  const { logger } = useLogger({ id });

  useEffectOnce(() => {
    logger.screen(params);
  }, []);

  return <>{children}</>;
};

export default LoggingScreen;

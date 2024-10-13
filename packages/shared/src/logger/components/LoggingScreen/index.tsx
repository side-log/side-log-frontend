import { PropsWithChildren } from "react";
import useEffectOnce from "../../../hooks/useEffectOnce";
import useLogger from "../../hooks/useLogger";

interface Props {
  id: number;
}

const LoggingScreen = ({ id, children }: PropsWithChildren<Props>) => {
  const { logger } = useLogger({ id });

  useEffectOnce(() => {
    logger.screen();
  }, []);

  return <>{children}</>;
};

export default LoggingScreen;

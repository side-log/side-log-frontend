import { PropsWithChildren, useCallback } from "react";
import useEffectOnce from "../../../hooks/useEffectOnce";
import useLogger, { ScreenParams } from "../../hooks/useLogger";

interface Props {
  id: number;
  params: ScreenParams;
}

const LoggingScreen = ({ id, params, children }: PropsWithChildren<Props>) => {
  const { logger } = useLogger();

  useEffectOnce(() => {
    logger.screen(id, params);
  }, []);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      let target = event.target as HTMLElement;

      if (target && target.getAttribute("data-key") !== "logging-click") {
        target = target.closest("[data-key='logging-click']") as HTMLElement;
      }

      if (target && target.getAttribute("data-key") === "logging-click") {
        const textContent = target.textContent?.trim() || "Text Not Found";

        logger.click(id, { button_text: textContent });

        event.stopPropagation();
      }
    },
    [id, logger]
  );

  return (
    <div data-schema-id={id} onClick={handleClick}>
      {children}
    </div>
  );
};

export default LoggingScreen;

import { PropsWithChildren, useCallback, useEffect } from 'react';
import useEffectOnce from '../../../hooks/useEffectOnce';
import useLogger, { ScreenParams } from '../../hooks/useLogger';

interface Props {
  id: number;
  params: ScreenParams;
  className?: string;
}

const LoggingScreen = ({ id, params, children, className }: PropsWithChildren<Props>) => {
  const { logger } = useLogger();

  useEffectOnce(() => {
    logger.screen(id, { event_name: 'page_enter', ...params });
  }, []);

  useEffect(() => {
    const startTime = new Date();

    return () => {
      const endTime = new Date();
      const duration = (endTime.getTime() - startTime.getTime()) / 1000;

      if (Math.floor(duration) > 0) {
        logger.screen(id, { event_name: 'page_leave', page_duration: duration, ...params });
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      let target = event.target as HTMLElement;

      if (target && target.getAttribute('data-key') !== 'logging-click') {
        target = target.closest("[data-key='logging-click']") as HTMLElement;
      }

      if (target && target.getAttribute('data-key') === 'logging-click') {
        const textContent = target.textContent?.trim() || 'Text Not Found';

        logger.click(id, { button_text: textContent });

        event.stopPropagation();
      }
    },
    [id, logger]
  );

  return (
    <div data-schema-id={id} onClick={handleClick} className={className}>
      {children}
    </div>
  );
};

export default LoggingScreen;

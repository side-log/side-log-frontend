import { useCallback } from 'react';
import { fetchLog, LoggingParams } from '../remotes';
import { useDeviceInfo } from './useDeviceInfo';
import useReferrer from '../../hooks/useReferrer';

export interface ScreenParams extends Record<string, unknown> {
  screen_name: string;
}

export interface ClickParams extends Record<string, unknown> {
  button_text: string;
}

export interface ImpressionParams extends Record<string, unknown> {}

export default function useLogger() {
  const { fetchDeviceInfo } = useDeviceInfo();
  const referrer = useReferrer();

  const log = useCallback(
    async (
      id: number,
      {
        logType,
        params,
      }: {
        logType: LoggingParams['log_type'];
        params?: Record<string, unknown>;
      }
    ) => {
      try {
        const deviceInfo = await fetchDeviceInfo();
        const { deviceId, locale, os, userAgent } = deviceInfo;

        fetchLog(id, {
          device_id: deviceId,
          user_agent: userAgent,
          log_type: logType,
          referrer,
          os,
          locale,
          params,
        });
      } catch (error) {
        console.error('Error logging device information:', error);
      }
    },
    [fetchDeviceInfo, referrer]
  );

  const logger = {
    screen: (id: number, params: ScreenParams) => log(id, { logType: 'screen', params }),
    impression: (id: number, params: Record<string, unknown>) => log(id, { logType: 'impression', params }),
    click: (id: number, params: ClickParams) => log(id, { logType: 'click', params }),
  };

  return { logger };
}

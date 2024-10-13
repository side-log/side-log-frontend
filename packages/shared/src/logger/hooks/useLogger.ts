import { useCallback } from "react";
import { fetchLog, LoggingParams } from "../remotes";
import { useDeviceInformation } from "./useDeviceInformation";
import useReferrer from "../../hooks/useReferrer";

interface Props {
  id: number;
}

export default function useLogger({ id }: Props) {
  const { fetchDeviceInfo } = useDeviceInformation();
  const referrer = useReferrer();

  const log = useCallback(
    async (
      id: number,
      {
        logType,
        params,
      }: {
        logType: LoggingParams["log_type"];
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
        console.error("Error logging device information:", error);
      }
    },
    [fetchDeviceInfo, referrer]
  );

  const logger = {
    screen: (params: Record<string, unknown>) =>
      log(id, {
        logType: "screen",
        params,
      }),
    impression: () =>
      log(id, {
        logType: "impression",
      }),
    click: () =>
      log(id, {
        logType: "click",
      }),
  };

  return { logger };
}

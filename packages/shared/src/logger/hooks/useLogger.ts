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
    async (id: number, logType: LoggingParams["log_type"]) => {
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
        });
      } catch (error) {
        console.error("Error logging device information:", error);
      }
    },
    [fetchDeviceInfo, referrer]
  );

  const logger = {
    screen: () => log(id, "screen"),
    impression: () => log(id, "screen"),
    click: () => log(id, "click"),
  };

  return { logger };
}

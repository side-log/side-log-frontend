import FingerprintJS from "@fingerprintjs/fingerprintjs";
import getLocale from "../../utils/getLocale";
import getOS from "../../utils/getOs";
import getUserAgent from "../../utils/getUserAgent";

export function useDeviceInfo() {
  const fetchDeviceInfo = async () => {
    const fingerPrint = await FingerprintJS.load();
    const deviceId = (await fingerPrint.get()).visitorId;

    return {
      deviceId,
      locale: getLocale(),
      userAgent: getUserAgent(),
      os: getOS(),
    };
  };

  return { fetchDeviceInfo };
}

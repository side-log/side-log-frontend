import getDeivceId from '../../utils/getDeviceId';
import getLocale from '../../utils/getLocale';
import getOS from '../../utils/getOs';
import getUserAgent from '../../utils/getUserAgent';

export function useDeviceInfo() {
  const fetchDeviceInfo = async () => {
    const deviceId = await getDeivceId();

    return {
      deviceId,
      locale: getLocale(),
      userAgent: getUserAgent(),
      os: getOS(),
    };
  };

  return { fetchDeviceInfo };
}

import FingerprintJS from "@fingerprintjs/fingerprintjs";

export function useDeviceInformation() {
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

function getLocale() {
  return navigator.language;
}

function getOS() {
  const userAgent = window.navigator.userAgent;

  // iOS detection
  if (/iPad|iPhone|iPod/.test(userAgent)) {
    return "iOS";
  }

  // Android detection
  if (/android/i.test(userAgent)) {
    return "Android";
  }

  // Windows or Mac OS detection (PC)
  if (/Windows|Macintosh|Linux/.test(userAgent)) {
    return "Desktop";
  }

  return "Unknown";
}

function getUserAgent() {
  return navigator.userAgent;
}

export default function getOS() {
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

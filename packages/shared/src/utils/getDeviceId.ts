import FingerprintJS from '@fingerprintjs/fingerprintjs';

export default async function getDeivceId() {
  const fingerPrint = await FingerprintJS.load();
  const deviceId = (await fingerPrint.get()).visitorId;
  return deviceId;
}

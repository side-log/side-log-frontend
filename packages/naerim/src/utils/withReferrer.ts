interface WithReferrerOptions {
  referrer: string;
}

export function withReferrer(path: string, { referrer }: WithReferrerOptions): string {
  // 상대 경로인 경우 (호스트명이 없는 경우)
  if (!path.startsWith('http://') && !path.startsWith('https://')) {
    // 현재 도메인을 기준으로 URL 생성
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    const urlObj = new URL(path, baseUrl);
    urlObj.searchParams.set('referrer', referrer);
    return urlObj.toString();
  }

  // 절대 경로인 경우
  const urlObj = new URL(path);
  urlObj.searchParams.set('referrer', referrer);
  return urlObj.toString();
}

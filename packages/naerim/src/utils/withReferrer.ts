interface WithReferrerOptions {
  referrer: string;
  baseUrl?: string;
}

export function withReferrer(path: string, { referrer, baseUrl }: WithReferrerOptions): string {
  try {
    // 상대 경로인 경우 (호스트명이 없는 경우)
    if (!path.startsWith('http://') && !path.startsWith('https://')) {
      // baseUrl이 제공되지 않은 경우 path만 사용
      if (!baseUrl && typeof window === 'undefined') {
        const urlPath = path.startsWith('/') ? path : `/${path}`;
        return `${urlPath}?referrer=${encodeURIComponent(referrer)}`;
      }

      // client-side이거나 baseUrl이 제공된 경우
      const origin = baseUrl || (typeof window !== 'undefined' ? window.location.origin : '');
      const urlObj = new URL(path, origin);
      urlObj.searchParams.set('referrer', referrer);
      return urlObj.toString();
    }

    // 절대 경로인 경우
    const urlObj = new URL(path);
    urlObj.searchParams.set('referrer', referrer);
    return urlObj.toString();
  } catch (error) {
    // URL 생성에 실패한 경우 fallback
    const queryParam = `referrer=${encodeURIComponent(referrer)}`;
    return path.includes('?') ? `${path}&${queryParam}` : `${path}?${queryParam}`;
  }
}

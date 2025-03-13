import { useSearchParams } from 'next/navigation';

export default function useReferrer() {
  const searchParams = useSearchParams();
  const referrer = searchParams.get('referrer') ?? 'undefined';
  return referrer;
}

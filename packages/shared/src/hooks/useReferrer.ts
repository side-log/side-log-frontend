import useQueryParam from './useQueryParam';

export default function useReferrer() {
  const referrer = useQueryParam('referrer');
  return referrer as string;
}

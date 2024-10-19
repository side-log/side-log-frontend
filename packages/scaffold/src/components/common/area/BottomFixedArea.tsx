import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import useWindowInnerWidth from '@/hooks/useInnerWidthHook';

interface BottomFixedAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  hasBottomSpace?: boolean;
  children: React.ReactNode;
}

export const BottomFixedArea = (props: BottomFixedAreaProps) => {
  const { hasBottomSpace = true, children } = props;
  const [bottomSpace, setBottomSpace] = useState<string>('env(safe-area-inset-bottom, 0)');

  const windowInnerWidth = useWindowInnerWidth();

  useEffect(() => {
    const handleFocus = () => {
      setBottomSpace('290px'); // 키보드가 올라왔을 때 실행
    };

    const handleBlur = () => {
      setBottomSpace(hasBottomSpace ? 'env(safe-area-inset-bottom, 0)' : '0'); // 키보드가 내려가면 실행
    };

    // 입력 필드가 동적으로 추가될 수 있으므로, DOM 업데이트 시마다 리스너를 재설정
    const inputs = document.querySelectorAll('input, textarea');

    inputs.forEach(element => {
      element.addEventListener('focus', handleFocus);
      element.addEventListener('blur', handleBlur);
    });

    return () => {
      inputs.forEach(element => {
        element.removeEventListener('focus', handleFocus);
        element.removeEventListener('blur', handleBlur);
      });
    };
  }, [hasBottomSpace]);

  return (
    <div
      css={css`
        position: fixed;
        bottom: ${bottomSpace};
        width: ${windowInnerWidth}px;
        left: 50%;
        transform: translateX(-50%);
        transition: bottom 0.3s ease-out;
      `}
      {...props}
    >
      {children}
    </div>
  );
};

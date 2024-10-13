import { css } from "@emotion/react";
import useWindowInnerWidth from "@/hooks/useInnerWidthHook";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface BottomFixedAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  hasBottomSpace?: boolean;
  children: React.ReactNode;
}

export const BottomFixedArea = (props: BottomFixedAreaProps) => {
  const { hasBottomSpace = true, children } = props;

  const [mounted, setMounted] = useState(false);

  const windowInnerWidth = useWindowInnerWidth();
  const bottomSpace = hasBottomSpace ? "env(safe-area-inset-bottom, 0)" : "0";

  useEffect(() => {
    setMounted(true); // 컴포넌트가 클라이언트에 마운트된 후에만 실행
    return () => setMounted(false); // 컴포넌트가 언마운트되면 해제
  }, []);

  return mounted
    ? createPortal(
        <div
          css={css`
            position: fixed;
            bottom: ${bottomSpace};
            width: ${windowInnerWidth}px;
            left: 50%;
            transform: translateX(-50%);
          `}
          {...props}
        >
          {children}
        </div>,
        document.body
      )
    : null;
};

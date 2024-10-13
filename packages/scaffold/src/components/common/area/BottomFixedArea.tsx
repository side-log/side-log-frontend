import { css } from "@emotion/react";
import useWindowInnerWidth from "@/hooks/useInnerWidthHook";
import { useEffect, useState } from "react";

interface BottomFixedAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  hasBottomSpace?: boolean;
  children: React.ReactNode;
}

export const BottomFixedArea = (props: BottomFixedAreaProps) => {
  const { hasBottomSpace = true, children } = props;
  const [bottomSpace, setBottomSpace] = useState<string>(
    "env(safe-area-inset-bottom, 0)"
  );

  const windowInnerWidth = useWindowInnerWidth();

  useEffect(() => {
    const handleFocus = () => {
      if (window.visualViewport) {
        const initialHeight = window.visualViewport.height; // 현재 뷰포트 높이
        const handleResize = () => {
          const newHeight = window.visualViewport?.height ?? 280; // 키보드가 올라온 후 높이
          const heightDiff = initialHeight - newHeight; // 키보드가 차지하는 높이 계산

          if (heightDiff > 0) {
            setBottomSpace(`${heightDiff}px`); // 키보드 높이만큼 bottom 설정
          }
        };

        window.visualViewport.addEventListener("resize", handleResize);
      }
    };

    const handleBlur = () => {
      // 키보드가 내려가면 복구
      setBottomSpace(hasBottomSpace ? "env(safe-area-inset-bottom, 0)" : "0");
    };

    // 모든 input 및 textarea 요소에 대해 focus와 blur 이벤트를 감지
    const inputs = document.querySelectorAll("input, textarea");

    inputs.forEach((element) => {
      element.addEventListener("focus", handleFocus);
      element.addEventListener("blur", handleBlur);
    });

    return () => {
      inputs.forEach((element) => {
        element.removeEventListener("focus", handleFocus);
        element.removeEventListener("blur", handleBlur);
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

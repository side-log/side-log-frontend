import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { use } from "react";
import useWindowInnerWidth from "@/hooks/useInnerWidthHook";

interface BottomFixedAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  hasBottomSpace?: boolean;
  children: React.ReactNode;
}

export const BottomFixedArea = (props: BottomFixedAreaProps) => {
  const { hasBottomSpace = true, children } = props;

  const windowInnerWidth = useWindowInnerWidth();
  const bottomSpace = hasBottomSpace ? "env(safe-area-inset-bottom, 0)" : "0";

  return (
    <div
      css={css`
        display: flex;
        position: fixed;
        bottom: ${bottomSpace};
        width: ${windowInnerWidth}px;
        left: 50%;
        transform: translateX(-50%);
      `}
      {...props}
    >
      {children}
    </div>
  );
};

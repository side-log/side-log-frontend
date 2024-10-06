import styled from "@emotion/styled";
import { css } from "@emotion/react";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

export const Container = (props: ContainerProps) => {
  const { children } = props;
  return (
    <div
      css={css`
        width: 100%;
        height: 100vh;
        max-width: 840px;
        margin: 0 auto;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        background-color: #fafafa;
      `}
    >
      {children}
    </div>
  );
};

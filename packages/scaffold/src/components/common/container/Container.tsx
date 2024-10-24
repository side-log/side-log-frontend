import { css } from '@emotion/react';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
  backgroundColor?: React.CSSProperties['backgroundColor'];
}

export const Container = (props: ContainerProps) => {
  const { children, backgroundColor = '#ffffff' } = props;
  return (
    <div
      css={css`
        position: relative;
        width: 100%;
        height: 100vh;
        max-width: 840px;
        margin: 0 auto;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        background-color: ${backgroundColor};
      `}
    >
      {children}
    </div>
  );
};

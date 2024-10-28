import { css } from '@emotion/react';
import useIsOnScreenKeyboardOpen from '@/hooks/useIsOnScreenKeyboardOpen';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
  backgroundColor?: React.CSSProperties['backgroundColor'];
}

export const Container = (props: ContainerProps) => {
  const { children, backgroundColor = '#ffffff' } = props;

  const isKeypadOpen = useIsOnScreenKeyboardOpen();

  return (
    <div
      css={css`
        position: relative;
        width: 100%;
        height: calc(var(--vh, 1vh) * 100);
        max-width: 840px;
        margin: 0 auto;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        background-color: ${backgroundColor};
        overflow-y: auto;
      `}
    >
      {children}
      {isKeypadOpen && (
        <div
          css={{
            position: 'absolute',
            left: 0,
            width: 1,
            height: 'calc(100% + 1px)',
          }}
        />
      )}
    </div>
  );
};

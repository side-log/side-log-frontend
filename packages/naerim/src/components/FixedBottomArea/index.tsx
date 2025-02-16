import { getOs } from '@yeaaaah/shared';
import React, { useMemo } from 'react';
import useViewport from './hooks/useViewport';
import useIsOnScreenKeyboardOpen from './hooks/useIsOnScreenKeyboardOpen';
import { css } from '../../../styled-system/css';

interface BottomFixedAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  containerStyle?: React.CSSProperties;
}

const detectIOS = getOs() === 'iOS';

export const BottomFixedArea = ({ children, containerStyle, ...rest }: BottomFixedAreaProps) => {
  const viewport = useViewport();
  const isKeypadOpen = useIsOnScreenKeyboardOpen();

  const style = useMemo(() => {
    if (!detectIOS) {
      return undefined;
    }
    return {
      bottom: isKeypadOpen ? `${-viewport.offset}px` : `0px`,
    } as const;
  }, [isKeypadOpen, viewport.offset]);

  return (
    <div {...rest} style={{ ...style, ...containerStyle }} className={fixedAreaContainer}>
      <div className={gradientBackground} />
      <div className={contentContainer}>{children}</div>
    </div>
  );
};

const fixedAreaContainer = css({
  position: 'fixed',
  left: '50%',
  right: 'auto',
  bottom: '0',
  width: '100%',
  maxWidth: '840px',
  zIndex: '1000',
  display: 'flex',
  flexDirection: 'column',
  boxSizing: 'border-box',
  transition: 'transform 0.2s cubic-bezier(0.1, 0.76, 0.55, 0.9)',
  pointerEvents: 'none',
  transform: 'translateX(-50%)',
});

const contentContainer = css({
  pointerEvents: 'auto',
});

const gradientBackground = css({
  position: 'absolute',
  top: '0',
  left: '0',
  right: '0',
  bottom: '0',
  zIndex: '-1',
  pointerEvents: 'none',
  background: 'linear-gradient(to top, #ffffff 0%, #ffffff 50%, rgba(255, 255, 255, 0) 100%)',
});

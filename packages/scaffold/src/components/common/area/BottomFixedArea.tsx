import styled from '@emotion/styled';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import useIsOnScreenKeyboardOpen from '@/hooks/useIsOnScreenKeyboardOpen';
import useViewportSize from '@/hooks/useViewportSize';

interface BottomFixedAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  hasBottomSpace?: boolean;
}

export const BottomFixedArea = ({ children, ...rest }: PropsWithChildren<BottomFixedAreaProps>) => {
  const [offset, setOffset] = useState(0);
  const isKeypadOpen = useIsOnScreenKeyboardOpen();
  const viewport = useViewportSize();

  const isMobile = true;

  useEffect(() => {
    const handleResize = () => {
      if (isMobile && isKeypadOpen) {
        const visibleHeight = window.innerHeight;
        setOffset(visibleHeight - (viewport?.height ?? 0));
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobile, isKeypadOpen, viewport]);

  return (
    <StyledBottomFixedArea
      style={isKeypadOpen ? { transform: `translateY(-${offset}px)` } : { transform: `translateY(0)` }}
      {...rest}
    >
      {children}
    </StyledBottomFixedArea>
  );
};

const StyledBottomFixedArea = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
  z-index: 1000;
  transition: transform 0.3s ease;
  padding-bottom: env(safe-area-inset-bottom);
`;

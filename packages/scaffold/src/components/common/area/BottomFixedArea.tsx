import styled from '@emotion/styled';
import { getOs } from '@yeaaaah/shared';
import React, { useEffect, useState } from 'react';
import useIsOnScreenKeyboardOpen from '@/hooks/useIsOnScreenKeyboardOpen';
import useViewportSize from '@/hooks/useViewportSize';

interface BottomFixedAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  hasBottomSpace?: boolean;
}

export const BottomFixedArea: React.FC<BottomFixedAreaProps> = ({ children, ...rest }) => {
  const [offset, setOffset] = useState(0);
  const isKeypadOpen = useIsOnScreenKeyboardOpen();
  const viewport = useViewportSize();

  const isMobile = getOs() === 'iOS' || getOs() === 'Android';

  useEffect(() => {
    const handleResize = () => {
      if (isKeypadOpen && isMobile) {
        const visibleHeight = window.innerHeight;
        setOffset(visibleHeight - (viewport?.height ?? 0));
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isKeypadOpen, isMobile, viewport]);

  return (
    <StyledBottomFixedArea style={{ transform: `translateY(${isKeypadOpen ? `-${offset}px` : '0'})` }} {...rest}>
      <GradientBackground />
      {children}
    </StyledBottomFixedArea>
  );
};

const GradientBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  pointer-events: none;
  background: linear-gradient(to top, #ffffff 0%, #ffffff 50%, rgba(255, 255, 255, 0) 100%);
`;

const StyledBottomFixedArea = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transition: transform 0.3s ease;
  padding: 32px 20px;
  overflow: hidden;
  padding-bottom: calc(max(env(safe-area-inset-bottom), 16px));
`;

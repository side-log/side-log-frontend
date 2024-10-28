import styled from '@emotion/styled';
import { getOs } from '@yeaaaah/shared';
import React, { useMemo } from 'react';
import useViewport from './hooks/useViewport';
import useIsOnScreenKeyboardOpen from '@/hooks/useIsOnScreenKeyboardOpen';

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
    <FixedAreaContainer {...rest} style={{ ...style, ...containerStyle }}>
      <GradientBackground />
      <ContentContainer>{children}</ContentContainer>
    </FixedAreaContainer>
  );
};
const FixedAreaContainer = styled.div`
  position: fixed;
  left: 50%;
  right: auto;
  bottom: 0;
  width: 100%;
  max-width: 840px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  transition: transform 0.2s cubic-bezier(0.1, 0.76, 0.55, 0.9);
  pointer-events: none;
  transform: translateX(-50%);
`;

const ContentContainer = styled.div`
  pointer-events: auto;
`;

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

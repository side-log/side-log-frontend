import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';
import { Row } from '../flex/Flex';
import Txt from '../text/Txt';
import { TriangleIcon } from '@/assets/icons';

interface ToolTipProps extends React.HTMLAttributes<HTMLDivElement> {
  content: string;
  visibility?: boolean;
}

const ToolTip = (props: ToolTipProps) => {
  const { content, visibility = true, ...rest } = props;
  return (
    <ToolTipContainer visibility={visibility} {...rest}>
      <RounedBox>
        <Row
          gap={6}
          css={css`
            width: max-content;
          `}
        >
          <Txt font="tossface" align="center" size="1.8rem" height={18}>
            🏎
          </Txt>
          <Txt font="Pretendard" size="1.2rem" height={16} align="center" color="#28292C" weight="400">
            {content}
          </Txt>
        </Row>
      </RounedBox>
      <div
        css={css`
          z-index: 1000;
        `}
      >
        <TriangleIcon />
      </div>
    </ToolTipContainer>
  );
};

const ToolTipContainer = styled.div<{
  visibility: boolean;
}>`
  display: ${({ visibility }) => (visibility ? 'flex' : 'none')};
  width: fit-content;
  flex-shrink: 1;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: -35px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
`;

const RounedBox = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  margin-bottom: -4px;
  padding: 8px 14px;
  background-color: #fff;
  box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.2);
  border-radius: 9999px;
  z-index: 900;
`;

export default ToolTip;

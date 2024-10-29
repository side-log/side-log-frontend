import { css } from '@emotion/react';
import { Row } from '../common/flex/Flex';
import Txt from '../common/text/Txt';

interface ResultTextContainerProps {
  leftEmoji?: string;
  rightContent?: string;
}

export const ResultTextContainer = ({ leftEmoji, rightContent }: ResultTextContainerProps) => {
  return (
    <Row gap={12} alignItems="center">
      <div
        css={css`
          display: flex;
          justify-content: center;
          align-items: center;
          width: 40px;
          height: 40px;
          background-color: #f2f2f3;
          border-radius: 999px;
        `}
      >
        <Txt font="tossface" size="2rem" height={20}>
          {leftEmoji}
        </Txt>
      </div>
      <Txt font="Pretendard" size="1.6rem" height={24} weight="500" color="#28292C">
        {rightContent}
      </Txt>
    </Row>
  );
};

import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { Row } from "../common/flex/Flex";
import Txt from "../common/text/Txt";

interface LabelTagProps {
  emoji: string;
  content: string;
  rotate?: string;
  zIndex?: number;
  margin?: string;
}

export const LabelTag = (props: LabelTagProps) => {
  const { emoji, content, rotate } = props;
  return (
    <div
      css={css`
        display: flex;
        width: fit-content;
        flex-shrink: 1;
        transform: rotate(${rotate});
        justify-content: center;
        align-items: center;
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.15);
        padding: 12px 16px;
        z-index: ${props.zIndex || 1};
        margin: ${props.margin || "0"};
      `}
    >
      <Row gap={8}>
        <Txt font="tossface" align="center" size="2rem" height={24}>
          {emoji}
        </Txt>
        <Txt
          font="이서윤체"
          align="center"
          size="2rem"
          height={24}
          color="#202020"
        >
          {content}
        </Txt>
      </Row>
    </div>
  );
};

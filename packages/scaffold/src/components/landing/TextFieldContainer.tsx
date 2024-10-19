import { css } from "@emotion/react";
import { Row } from "../common/flex/Flex";
import Txt from "../common/text/Txt";
import TextField from "../common/textField/TextField";

interface TextFieldContainerProps {
  type?: string;
  id: string;
  options?: any;
  placeholder?: string;
  content?: string;
  leftEmoji?: string;
  rightContent?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const TextFieldContainer = (props: TextFieldContainerProps) => {
  const { id, placeholder, onKeyDown, content, options, type, ...rest } = props;
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
          {props.leftEmoji}
        </Txt>
      </div>
      <Row
        gap={8}
        css={css`
          width: fit-content;
        `}
        alignItems="center"
      >
        <TextField
          id={id}
          placeholder={placeholder}
          onKeyDown={onKeyDown}
          content={content}
          options={options}
          type={type}
          {...rest}
        />
        <Txt
          font="Pretendard"
          size="1.6rem"
          height={24}
          weight="500"
          color="#28292C"
        >
          {props.rightContent}
        </Txt>
      </Row>
    </Row>
  );
};

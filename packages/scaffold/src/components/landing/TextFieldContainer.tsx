import { css } from "@emotion/react";
import { Row } from "../common/flex/Flex";
import TextField from "../common/textField/TextField";
import Txt from "../common/text/Txt";

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

const textFieldWidth = (id: string): { minWidth: string; maxWidth: string } => {
  switch (id) {
    case "storeName":
      return { minWidth: "87px", maxWidth: "237px" };
    case "storeType":
      return { minWidth: "172px", maxWidth: "237px" };
    case "storeLocation":
      return { minWidth: "74px", maxWidth: "128px" };
    case "storeBestMenu":
      return { minWidth: "87px", maxWidth: "116px" };
    case "storePrice":
      return { minWidth: "53px", maxWidth: "109px" };
    case "storeTarget":
      return { minWidth: "119px", maxWidth: "176px" };
    case "storeMood":
      return { minWidth: "87px", maxWidth: "100px" };
    default:
      return { minWidth: "87px", maxWidth: "237px" };
  }
};

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
          {...textFieldWidth(id)}
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

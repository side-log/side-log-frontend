import React from "react"; // React import fo
import styled from "@emotion/styled";
import Txt from "../text/Txt";

interface PrimaryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  onClick?: () => void;
  disabled?: boolean;
}

const PrimaryButton = (props: PrimaryButtonProps) => {
  const { title, onClick, disabled = false, ...rest } = props;
  return (
    <Button onClick={onClick} disabled={disabled} {...rest}>
      <Txt
        font="Pretendard"
        size="1.6rem"
        height={24}
        align="center"
        color="#fff"
        weight="600"
      >
        {title}
      </Txt>
    </Button>
  );
};

const Button = styled.button<{
  disabled: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 12px;
  max-width: 808px;
  color: #fff;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  background-color: ${({ disabled }) => (disabled ? "#FBE5D0" : "#ED801D")};
  border-radius: 8px;
`;

export default PrimaryButton;

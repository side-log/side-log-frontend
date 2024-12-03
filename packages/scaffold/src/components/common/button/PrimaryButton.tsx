import styled from '@emotion/styled';
import React from 'react';
import Txt from '../text/Txt';

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  onClick?: (e: any) => void;
  disabled?: boolean;
}

const PrimaryButton = (props: PrimaryButtonProps) => {
  const { title, onClick, disabled = false, ...rest } = props;
  return (
    <Button onClick={onClick} data-key="logging-click" disabled={disabled} onTouchEnd={onClick} {...rest}>
      <Txt font="Pretendard" size="1.6rem" height={24} align="center" color="#fff" weight="500">
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
  color: #fff;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  background-color: ${({ disabled }) => (disabled ? 'rgba(54, 41, 34, 0.15)' : '#362922')};
  border-radius: 8px;
`;

export default PrimaryButton;

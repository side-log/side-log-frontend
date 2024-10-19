import styled from '@emotion/styled';
import React from 'react';

export type TextFieldAttributes = React.InputHTMLAttributes<HTMLInputElement>;

const TextField: React.FC<TextFieldAttributes> = (props: TextFieldAttributes) => {
  return (
    <StyledInput
      {...props}
      autoComplete="off"
      css={{
        fieldSizing: 'content',
      }}
    />
  );
};

const StyledInput = styled.input`
  color: #28292c;
  font-size: 1.6rem;
  font-weight: 500;
  line-height: 24px;
  font-family: 'Pretendard';
  appearance: none;
  border: 1px solid #cccccc;
  padding: 12px 16px;
  border-radius: 8px;
  background-color: #fff;
  outline: none;

  &:focus {
    border: 1px solid #ed801d;
  }

  &::placeholder {
    font-family: 'Pretendard';
    font-size: 1.6rem;
    font-weight: 500;
    color: #cccccc;
  }
`;

export default TextField;

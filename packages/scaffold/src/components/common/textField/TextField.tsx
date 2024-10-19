import styled from '@emotion/styled';
import React from 'react';
import { RegisterOptions, useFormContext, useWatch } from 'react-hook-form';

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  id: string;
  options?: RegisterOptions;
  placeholder?: string;
  content?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const TextField: React.FC<TextFieldProps> = (props: TextFieldProps) => {
  const { id, placeholder, onKeyDown, options, type = 'text', ...rest } = props;

  const { register, setValue, control } = useFormContext();

  const value = useWatch({
    control: control,
    name: id,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(id, newValue);
  };

  return (
    <InputContainer isFocused={value}>
      <StyledInput
        type={type}
        autoComplete="off"
        placeholder={placeholder}
        {...register(id, options)}
        ref={e => {
          register(id).ref(e);
        }}
        onKeyDown={onKeyDown}
        onChange={handleChange}
        value={value || ''}
        {...rest}
        css={{
          fieldSizing: 'content',
        }}
      />
    </InputContainer>
  );
};

const StyledInput = styled.input`
  padding: 0;
  color: #28292c;
  font-size: 1.6rem;
  font-weight: 500;
  line-height: 24px;
  font-family: 'Pretendard';
  appearance: none;
  background-color: transparent;
  border: none;

  &:focus {
    outline: none;
  }

  &::placeholder {
    font-family: 'Pretendard';
    font-size: 1.6rem;
    font-weight: 500;
    color: #cccccc;
  }
`;

const InputContainer = styled.div<{ isFocused: boolean }>`
  display: inline-block;
  align-items: center;
  justify-content: center;
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid ${({ isFocused }) => (isFocused ? '#ED801D' : '#cccccc')};
  background-color: #fff;
`;

export default TextField;

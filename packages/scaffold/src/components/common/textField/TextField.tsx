import React, { useState } from "react"; // React import fo
import styled from "@emotion/styled";
import { RegisterOptions, useFormContext, useWatch } from "react-hook-form";

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  id: string;
  options?: RegisterOptions;
  placeholder?: string;
  content?: string;
  minWidth: string;
  maxWidth: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const TextField = (props: TextFieldProps) => {
  const {
    id,
    placeholder,
    onKeyDown,
    content,
    options,
    type = "text",
    minWidth,
    maxWidth,
    ...rest
  } = props;

  const { register, watch, setValue, control } = useFormContext();
  const [isFocused, setIsFocused] = useState(false);

  const value = useWatch({
    control: control,
    name: id,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(id, newValue);
  };

  return (
    <InputContainer isFocused={isFocused}>
      <StyledInput
        type={type}
        autoComplete="off"
        placeholder={placeholder}
        {...register(id, options)}
        onKeyDown={onKeyDown}
        onChange={handleChange}
        value={value || ""}
        minWidth={minWidth}
        maxWidth={maxWidth}
      />
    </InputContainer>
  );
};

const StyledInput = styled.input<{ minWidth: string; maxWidth: string }>`
  display: inline-block;
  padding: 0;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  min-width: ${({ minWidth }) => minWidth};
  max-width: ${({ maxWidth }) => maxWidth};
  color: #28292c;
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 24px;
  font-family: "Pretendard";
  appearance: none;
  background-color: transparent;
  border: none;

  &:focus {
    outline: none;
  }

  &::placeholder {
    font-family: "Pretendard";
    font-size: 1.6rem;
    font-weight: 400;
    color: #cccccc;
  }
`;

const InputContainer = styled.div<{ isFocused: Boolean }>`
  width: fit-content;
  display: inline-block;
  align-items: center;
  justify-content: center;
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid ${({ isFocused }) => (isFocused ? "#ed801d" : "#CCCCCC")};
  background-color: #fff;
`;

export default TextField;

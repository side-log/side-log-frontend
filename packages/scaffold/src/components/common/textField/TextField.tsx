import React, { useCallback, useEffect, useRef, useState } from "react";
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

const TextField: React.FC<TextFieldProps> = (props: TextFieldProps) => {
  const {
    id,
    placeholder,
    onKeyDown,
    options,
    type = "text",
    minWidth,
    maxWidth,
    ...rest
  } = props;

  const { register, watch, setValue, control } = useFormContext();
  const [inputWidth, setInputWidth] = useState<string>(minWidth);

  const inputRef = useRef<HTMLInputElement>(null);
  const value = useWatch({
    control: control,
    name: id,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(id, newValue);
  };

  const adjustInputWidth = useCallback(
    (element: HTMLInputElement | null, value: string | undefined) => {
      if (element) {
        const span = document.createElement("span");

        span.style.visibility = "hidden";
        span.style.position = "absolute";
        span.style.whiteSpace = "nowrap";
        span.style.font = window.getComputedStyle(element).font;
        span.textContent = value || placeholder || "";

        document.body.appendChild(span);

        const width = Math.min(
          Math.max(span.offsetWidth + 10, parseInt(minWidth)),
          parseInt(maxWidth)
        );
        setInputWidth(`${width}px`);

        document.body.removeChild(span);
      }
    },
    [maxWidth, minWidth, placeholder]
  );

  useEffect(() => {
    adjustInputWidth(inputRef.current, value);
  }, [value, placeholder, minWidth, maxWidth, adjustInputWidth]);

  return (
    <InputContainer>
      <StyledInput
        type={type}
        autoComplete="off"
        placeholder={placeholder}
        {...register(id, options)}
        ref={(e) => {
          register(id).ref(e);
          adjustInputWidth(e, value);
        }}
        onKeyDown={onKeyDown}
        onChange={handleChange}
        value={value || ""}
        style={{ width: inputWidth }}
        {...rest}
      />
    </InputContainer>
  );
};

const StyledInput = styled.input`
  padding: 0;
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

const InputContainer = styled.div`
  display: inline-block;
  align-items: center;
  justify-content: center;
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid #cccccc;
  background-color: #fff;
`;

export default TextField;

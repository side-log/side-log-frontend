import styled from '@emotion/styled';
import React, { forwardRef, useEffect, useRef, useState } from 'react';

export type TextFieldAttributes = React.InputHTMLAttributes<HTMLInputElement>;

const TextField = forwardRef<HTMLInputElement, TextFieldAttributes>(
  ({ placeholder, onFocusCapture, ...props }, ref) => {
    const [textValue, setTextValue] = useState(props.defaultValue);
    const inputRef = useRef<HTMLInputElement>(null);
    const hiddenInputRef = useRef<HTMLInputElement>(null);
    const [isFocusHandled, setIsFocusHandled] = useState(false);
    const initialParentWidth = useRef<number | null>(null);

    const combinedRef = useCombinedRefs(ref, inputRef);

    useEffect(() => {
      if (inputRef.current && placeholder && inputRef.current.parentElement) {
        if (initialParentWidth.current === null) {
          initialParentWidth.current = inputRef.current.parentElement.offsetWidth;
        }

        const parentWidth = initialParentWidth.current;
        const value = textValue !== '' && textValue != null ? textValue.toString() : placeholder;
        const textWidth = getTextWidth(value, window.getComputedStyle(inputRef.current).font);
        const adjustedWidth = Math.min(textWidth + 40, parentWidth - 20);
        inputRef.current.style.width = `${adjustedWidth}px`;
      }
    }, [placeholder, textValue]);

    const handleFocusCapture = (event: React.FocusEvent<HTMLInputElement>) => {
      if (isFocusHandled || !hiddenInputRef.current || !inputRef.current) {
        return;
      }

      hiddenInputRef.current.focus();

      setTimeout(() => {
        if (!isFocusHandled) {
          inputRef.current?.focus();
          setIsFocusHandled(true);
        }
      }, 0);

      onFocusCapture?.(event);
    };

    const handleBlur = () => {
      setIsFocusHandled(false);
    };

    return (
      <>
        <input ref={hiddenInputRef} css={{ position: 'absolute', width: 0, height: 0, opacity: 0 }} />

        <StyledInput
          {...props}
          value={textValue}
          onChange={e => {
            setTextValue(e.target.value);
            props.onChange?.(e);
          }}
          ref={combinedRef}
          placeholder={placeholder}
          onFocusCapture={handleFocusCapture}
          onBlur={handleBlur}
          autoComplete="off"
        />
      </>
    );
  }
);

function getTextWidth(text: string, font: string) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (context) {
    context.font = font;
    return context.measureText(text).width;
  }
  return 0;
}

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
  white-space: nowrap;
  overflow-x: auto;
  text-overflow: ellipsis;

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

function useCombinedRefs<T>(...refs: Array<React.Ref<T>>): React.Ref<T> {
  return React.useCallback(
    (element: T) => {
      refs.forEach(ref => {
        if (typeof ref === 'function') {
          ref(element);
        } else if (ref != null) {
          (ref as React.MutableRefObject<T>).current = element;
        }
      });
    },
    [refs]
  );
}

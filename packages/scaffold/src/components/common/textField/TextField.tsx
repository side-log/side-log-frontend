import styled from '@emotion/styled';
import React, { forwardRef, useEffect, useRef, useState } from 'react';

export type TextFieldAttributes = React.InputHTMLAttributes<HTMLInputElement>;

const TextField = forwardRef<HTMLInputElement, TextFieldAttributes>(
  ({ placeholder, onFocusCapture, ...props }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const hiddenInputRef = useRef<HTMLInputElement>(null);
    const [isFocusHandled, setIsFocusHandled] = useState(false);

    const combinedRef = useCombinedRefs(ref, inputRef);

    useEffect(() => {
      if (inputRef.current && placeholder) {
        const placeholderWidth = getTextWidth(placeholder, window.getComputedStyle(inputRef.current).font);
        inputRef.current.style.width = `${placeholderWidth + 40}px`;
      }
    }, [placeholder]);

    const handleFocusCapture = (event: React.FocusEvent<HTMLInputElement>) => {
      console.log(event, placeholder);
      if (isFocusHandled) {
        return;
      }

      hiddenInputRef.current?.focus();

      setTimeout(() => {
        inputRef.current?.focus();
        setIsFocusHandled(true);
      }, 0);

      if (onFocusCapture) {
        onFocusCapture(event);
      }
    };

    const handleBlur = () => {
      setIsFocusHandled(false);
    };

    return (
      <>
        <input ref={hiddenInputRef} css={{ position: 'absolute', width: 0, height: 0, opacity: 0 }} />

        <StyledInput
          {...props}
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

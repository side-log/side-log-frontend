import styled from '@emotion/styled';
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { useCombinedRefs } from '@/hooks/useCombiedRefs';
import { getTextWidth } from '@/utils/getTextWidth';

export type TextFieldAttributes<V extends string | number> = React.InputHTMLAttributes<HTMLInputElement> & {
  fullSize?: boolean;
  width?: number;
  format?: (v: V) => V;
};

const TextField = forwardRef<HTMLInputElement, TextFieldAttributes<string | number>>(
  ({ placeholder, onFocusCapture, fullSize = false, value, width, format, ...props }, forwardedRef) => {
    const [textValue, setTextValue] = useState(value ?? props.defaultValue);
    const [isFocusHandled, setIsFocusHandled] = useState(false);
    const [displayedValue, setDisplayedValue] = useState(value);

    const inputRef = useRef<HTMLInputElement>(null);
    const hiddenInputRef = useRef<HTMLInputElement>(null);

    const initialParentWidth = useRef<number | null>(null);
    const initialWidth = useRef<number | null>(null);

    const combinedRef = useCombinedRefs(forwardedRef, inputRef);

    useEffect(() => {
      setTextValue(value);
      setDisplayedValue(format ? format(value as any) : value); // 초기 format 적용
    }, [value, format]);

    /**
     * @description TextInput 렌더링 이후 placeholder의 길이만큼 TextInput의 width를 초기화합니다
     */
    useEffect(
      function initializeInputWidth() {
        if (!inputRef.current || !inputRef.current.parentElement) {
          return;
        }

        const parentWidth = inputRef.current.parentElement.offsetWidth;

        if (fullSize) {
          inputRef.current.style.width = '100%';
          initialWidth.current = parentWidth;
          return;
        }

        if (width) {
          inputRef.current.style.width = `${width}px`;
          initialWidth.current = width;
          return;
        }

        if (placeholder) {
          if (initialParentWidth.current == null) {
            initialParentWidth.current = parentWidth;
          }

          const displayValue = placeholder;
          const font = window.getComputedStyle(inputRef.current).font;
          const textWidth = getTextWidth({
            text: displayValue,
            options: { font },
          });
          const adjustedWidth = Math.min(textWidth + 40, parentWidth - 20);

          inputRef.current.style.width = `${adjustedWidth}px`;
          initialWidth.current = adjustedWidth;
        }
      },
      [placeholder, fullSize, width]
    );

    /**
     * @description 유저 입력값이 placeholder의 길이를 넘어가면 그만큼 TextInput의 width가 늘어나도록 합니다
     */
    useEffect(
      function adjustWidthOnTextChange() {
        if (initialWidth.current && inputRef.current) {
          const displayValue = textValue !== '' && textValue != null ? textValue.toString() : (placeholder ?? '');
          const font = window.getComputedStyle(inputRef.current).font;
          const textWidth = getTextWidth({
            text: displayValue,
            options: { font },
          });

          if (textWidth + 40 > initialWidth.current) {
            inputRef.current.style.width = `${textWidth + 40}px`;
          } else {
            inputRef.current.style.width = `${initialWidth.current}px`;
          }
        }
      },
      [placeholder, textValue]
    );

    /***
     * @description focus 이벤트 발생 시 hiddenInputRef에 focus를 주었다가 다시 원래의 input으로 focus
     */
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setTextValue(newValue); // 원본 값을 그대로 저장

      // displayValue는 format을 적용해 표시, 실제 textValue는 변하지 않음
      setDisplayedValue(format ? format(newValue as any) : newValue);
      props.onChange?.(e);
    };

    return (
      <>
        {/* iOS Safari 환경에서 입력 버퍼를 비우기 위해 focus를 임시로 옮기는 목적으로 추가 */}
        <input ref={hiddenInputRef} css={{ position: 'absolute', width: 0, height: 0, opacity: 0 }} />

        <StyledInput
          {...props}
          value={displayedValue}
          onChange={handleChange}
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
  max-width: 100%;

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

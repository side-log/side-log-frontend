import styled from '@emotion/styled';
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { useCombinedRefs } from '@/hooks/useCombiedRefs';
import { getTextWidth } from '@/utils/getTextWidth';

export type TextFieldAttributes = React.InputHTMLAttributes<HTMLInputElement> & {
  fullSize?: boolean;
};

const TextField = forwardRef<HTMLInputElement, TextFieldAttributes>(
  ({ placeholder, onFocusCapture, fullSize = false, value, ...props }, forwardedRef) => {
    const [textValue, setTextValue] = useState(value ?? props.defaultValue);
    const [isFocusHandled, setIsFocusHandled] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);
    const hiddenInputRef = useRef<HTMLInputElement>(null);

    const initialParentWidth = useRef<number | null>(null);
    const initialWidth = useRef<number | null>(null);

    const combinedRef = useCombinedRefs(forwardedRef, inputRef);

    useEffect(() => {
      setTextValue(value);
    }, [value]);

    /**
     * @description TextInput 렌더링 이후 placeholder의 길이만큼 TextInput의 width를 초기화합니다
     */
    useEffect(
      function initializeInputWidth() {
        if (!fullSize && inputRef.current && placeholder && inputRef.current.parentElement) {
          if (initialParentWidth.current == null) {
            initialParentWidth.current = inputRef.current.parentElement.offsetWidth;
          }

          const parentWidth = initialParentWidth.current;
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
      [placeholder, fullSize]
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

    return (
      <>
        {/* iOS Safari 환경에서 입력 버퍼를 비우기 위해 focus를 임시로 옮기는 목적으로 추가 */}
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
          fullSize={fullSize}
        />
      </>
    );
  }
);

const StyledInput = styled.input<{
  fullSize: boolean;
}>`
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

  width: ${({ fullSize }) => (fullSize ? '100%' : 'auto')};
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

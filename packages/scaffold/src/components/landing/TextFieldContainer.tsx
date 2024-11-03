import { css } from '@emotion/react';
import { useEffect, useRef, useState } from 'react';
import { RegisterOptions } from 'react-hook-form';
import { Row } from '../common/flex/Flex';
import Txt from '../common/text/Txt';
import TextField, { TextFieldAttributes } from '../common/textField/TextField';
import { LandingFormFieldPath, LandingFormValue, useLandingFormContext } from './LandingFormProvider';

interface TextFieldContainerProps extends TextFieldAttributes<string | number> {
  name: LandingFormFieldPath;
  leftEmoji?: string;
  rightContent?: string;
  rules?: RegisterOptions<LandingFormValue, LandingFormFieldPath>;
}

export const TextFieldContainer = ({
  name,
  rules,
  leftEmoji,
  rightContent,
  ...textFieldAttributes
}: TextFieldContainerProps) => {
  const { register } = useLandingFormContext();

  const containerRef = useRef<HTMLDivElement>(null);
  const emojiRef = useRef<HTMLDivElement>(null);
  const rightContentRef = useRef<HTMLDivElement>(null);
  const [maxWidth, setMaxWidth] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (containerRef.current && emojiRef.current && rightContentRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const emojiWidth = emojiRef.current.offsetWidth;
      const rightContentWidth = rightContentRef.current.offsetWidth;

      const calculatedMaxWidth = containerWidth - emojiWidth - rightContentWidth - 20;
      setMaxWidth(calculatedMaxWidth);
    }
  }, []);

  return (
    <Row gap={12} alignItems="center" ref={containerRef}>
      <div
        ref={emojiRef}
        css={css`
          display: flex;
          justify-content: center;
          align-items: center;
          width: 40px;
          height: 40px;
          background-color: #f2f2f3;
          border-radius: 999px;
        `}
      >
        <Txt font="tossface" size="2rem" height={20}>
          {leftEmoji}
        </Txt>
      </div>
      <Row
        gap={8}
        css={css`
          width: fit-content;
          align-items: center;
        `}
      >
        <TextField
          css={css`
            max-width: ${maxWidth ? `${maxWidth}px` : '100%'};
            white-space: nowrap;
          `}
          {...textFieldAttributes}
          {...register(name, rules)}
        />
        <div
          ref={rightContentRef}
          css={css`
            white-space: nowrap;
          `}
        >
          <Txt font="Pretendard" size="1.6rem" height={24} weight="500" color="#28292C">
            {rightContent}
          </Txt>
        </div>
      </Row>
    </Row>
  );
};

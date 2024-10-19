import { css } from '@emotion/react';
import { RegisterOptions } from 'react-hook-form';
import { Row } from '../common/flex/Flex';
import Txt from '../common/text/Txt';
import TextField, { TextFieldAttributes } from '../common/textField/TextField';
import { LandingFormFieldPath, LandingFormValue, useLandingFormContext } from './LandingFormProvider';

interface TextFieldContainerProps extends TextFieldAttributes {
  name: LandingFormFieldPath;
  leftEmoji?: string;
  rightContent?: string;
  rules?: Omit<
    RegisterOptions<LandingFormValue, LandingFormFieldPath>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
}

export const TextFieldContainer = ({ name, placeholder, rules, leftEmoji, rightContent }: TextFieldContainerProps) => {
  const { register } = useLandingFormContext();

  return (
    <Row gap={12} alignItems="center">
      <div
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
        `}
        alignItems="center"
      >
        <TextField placeholder={placeholder} {...register(name, rules)} />
        <Txt font="Pretendard" size="1.6rem" height={24} weight="500" color="#28292C">
          {rightContent}
        </Txt>
      </Row>
    </Row>
  );
};

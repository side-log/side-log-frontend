import { css } from '@emotion/react';
import { Row } from '../common/flex/Flex';
import Txt from '../common/text/Txt';
import { SonbalIcon } from '@/assets/icons';

interface FormProgressProps {
  currentStep: number;
  totalStep: number;
}

export const FormProgress = (props: FormProgressProps) => {
  const { currentStep, totalStep } = props;
  return (
    <div
      css={css`
        display: flex;
        width: 100%;
        flex-shrink: 1;
        justify-content: center;
        align-items: center;
        background-color: #fff;
        border: 1px solid #e4e5e7;
        border-radius: 9999px;
        box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.05);
        padding: 15px 20px;
      `}
    >
      <Row justifyContent={'space-between'}>
        <Row gap={8}>
          <SonbalIcon />
          <Txt font="pretendard" align="center" size="1.4rem" height={22} color="#43454b">
            손님에게 전달할 가게 정보를 알려주세요
          </Txt>
        </Row>
        <Txt font="pretendard" align="center" size="1.4rem" height={22} color="#362922">
          {currentStep}/{totalStep}
        </Txt>
      </Row>
    </div>
  );
};

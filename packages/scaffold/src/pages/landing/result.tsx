import { css } from '@emotion/react';
import { LoggingScreen, useQueryParams } from '@yeaaaah/shared';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { StampIcon } from '@/assets/icons';
import { BottomFixedArea } from '@/components/common/area/BottomFixedArea';
import PrimaryButton from '@/components/common/button/PrimaryButton';
import { Container } from '@/components/common/container/Container';
import { Col, Row } from '@/components/common/flex/Flex';
import Header from '@/components/common/header/Header';
import Txt from '@/components/common/text/Txt';
import { ResultTextContainer } from '@/components/result/ResultTextContainer';
import { commaizeNumber } from '@toss/utils';

export default function LandingFormResult() {
  const router = useRouter();
  const { name, type, location, bestMenu, price, target, mood } = useQueryParams({ required: true });

  const handleConfirmClick = () => {
    router.push({
      pathname: '/landing/submit',
      query: router.query,
    });
  };

  return (
    <LoggingScreen
      id={100003}
      params={{
        screen_name: 'landing_form_result',
      }}
    >
      <Container>
        <Header />
        <div
          css={css`
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 16px;
            margin: 8px 16px;
            padding: 8px;
            border: 1px solid #e4e5e7;
            background: #fff;
            box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.15);
          `}
        >
          <Col
            css={css`
              border-radius: 12px;
              border: 1px solid #ed801d;
            `}
            padding={'20px'}
            alignItems="center"
            gap={20}
          >
            <Txt font="이서윤체" size="2.8rem" height={36.4}>
              우리가게정보
            </Txt>
            <ResultTextContainer leftEmoji="🏠" rightContent={`${name}(은)는,`} />
            <ResultTextContainer leftEmoji="🍴" rightContent={`${type}입니다.`} />
            <ResultTextContainer leftEmoji="📍" rightContent={`${location}에 위치하고 있어요.`} />
            <ResultTextContainer leftEmoji="🥞" rightContent={`${bestMenu}(이)가 정말 맛있어요.`} />
            <ResultTextContainer leftEmoji="💴" rightContent={`${commaizeNumber(price)}원 정도의 가격대에요.`} />
            <ResultTextContainer leftEmoji="👭" rightContent={`${target}(과)와 함께,`} />
            <ResultTextContainer leftEmoji="🍻" rightContent={`${mood}한 분위기를 즐겨보세요.`} />
            <Row justifyContent="flex-end" alignItems="center" gap={15.5}>
              <Txt font="이서윤체" size="2rem" color="#28292c">{`${name} 사장님`}</Txt>
              <div
                css={css`
                  position: relative;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  height: 48px;
                `}
              >
                <Txt font="이서윤체" size="2rem" color="#28292c">
                  (인)
                </Txt>
                <div
                  css={css`
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                  `}
                >
                  <StampIcon />
                </div>
              </div>
            </Row>
          </Col>
        </div>
        <BottomFixedArea
          containerStyle={{
            padding: '16px',
          }}
        >
          <PrimaryButton title="확인" onClick={handleConfirmClick} />
        </BottomFixedArea>
      </Container>
    </LoggingScreen>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { name, type, location, bestMenu, price, target, mood } = query;

  if ([name, type, location, bestMenu, price, target, mood].some(v => v == null)) {
    return {
      redirect: {
        destination: '/landing',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

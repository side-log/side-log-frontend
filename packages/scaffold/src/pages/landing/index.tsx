import { css } from '@emotion/react';
import { LoggingScreen } from '@yeaaaah/shared';
import { useRouter } from 'next/router';
import { BottomFixedArea } from '@/components/common/area/BottomFixedArea';
import PrimaryButton from '@/components/common/button/PrimaryButton';
import { Container } from '@/components/common/container/Container';
import { Col, Row } from '@/components/common/flex/Flex';
import Txt from '@/components/common/text/Txt';
import { LabelTag } from '@/components/landing/LabelTag';

const Landing = () => {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push('/landing/form');
  };

  return (
    <LoggingScreen
      id={100001}
      params={{
        screen_name: 'landing_intro',
      }}
    >
      <Container backgroundColor={'#fafafa'}>
        <Col gap={24}>
          <Col padding={'72px 13px 24px'} gap={8}>
            <Txt font="이서윤체" align="center" size="2.8rem" height={36.4} color="#28292C">
              예비 사장님! 우리 가게의
            </Txt>
            <Row justifyContent="center" alignItems="center" gap={8}>
              <div
                css={css`
                  background-color: #fff;
                  padding: 2px 15px;
                  border-radius: 8px;
                  border: 1px solid #ed801d;
                `}
              >
                <Txt font="이서윤체" align="center" size="2.8rem" height={36.4} color="#ed801d">
                  빈칸
                </Txt>
              </div>
              <Txt font="이서윤체" align="center" size="2.8rem" height={36.4} color="#28292C">
                을 채워주세요.
              </Txt>
            </Row>
          </Col>
          <Col alignItems="center" padding={'8px 42px 17px 17px'}>
            <LabelTag emoji="☕️" content="커피 좋아하는 예리님" rotate="16.655deg" zIndex={100} margin="0 0 0 80px" />
            <LabelTag emoji="🍲" content="마라탕쳐돌이 채영님" rotate="-7.999deg" zIndex={200} margin="0 85px 0 0" />
            <LabelTag
              emoji="🥗"
              content="점심으로 포케만 먹는 진호님"
              rotate="4.597deg"
              zIndex={300}
              margin="5px 0 0 35px"
            />
            <LabelTag
              emoji="🌮"
              content="하루 두번 타코먹는 경종님"
              rotate="-7.264deg"
              zIndex={500}
              margin="8px 12px 0 0"
            />
            <LabelTag emoji="🍔" content="햄버거 매니아 정우님" rotate="9.446deg" zIndex={400} margin="6px 0 0 0" />
          </Col>
          <Txt font="이서윤체" align="center" size="2.8rem" height={36.4} color="#28292C">
            예비 고객님들의 의견을 <br />
            전달해 드릴게요.
          </Txt>
        </Col>
        <BottomFixedArea css={{ padding: '8px 16px' }}>
          <PrimaryButton title="빈칸채우고 의견 듣기" onClick={handleButtonClick} />
        </BottomFixedArea>
      </Container>
    </LoggingScreen>
  );
};

export default Landing;

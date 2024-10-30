import { LoggingScreen } from '@yeaaaah/shared';
import { ClockIcon } from '@/assets/icons';
import { BottomFixedArea } from '@/components/common/area/BottomFixedArea';
import PrimaryButton from '@/components/common/button/PrimaryButton';
import { Container } from '@/components/common/container/Container';
import { Col } from '@/components/common/flex/Flex';
import Txt from '@/components/common/text/Txt';

export default function LandingSharePage() {
  return (
    <LoggingScreen
      id={100005}
      params={{
        screen_name: 'landing_share',
      }}
    >
      <Container>
        <Col padding={'129px 0 0'} gap={32} alignItems="center">
          <ClockIcon />
          <Txt font="이서윤체" size="2.8rem" height={36.4} color="#28292C" align="center">
            잠시만 기다려주세요,
            <br /> 예비 고객님들의 의견이
            <br />
            모이는대로 전달해 드릴게요.
          </Txt>
        </Col>
        <BottomFixedArea
          containerStyle={{
            padding: '16px',
          }}
        >
          <PrimaryButton title="다른 사장님들에게 공유하기" onClick={() => {}} />
        </BottomFixedArea>
      </Container>
    </LoggingScreen>
  );
}

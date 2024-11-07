import { css } from '@emotion/react';
import { LoggingScreen, useQueryParams } from '@yeaaaah/shared';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useMemo, useRef, useState } from 'react';
import Spacing from '@/components/common/Spacing/Spacing';
import { BottomFixedArea } from '@/components/common/area/BottomFixedArea';
import PrimaryButton from '@/components/common/button/PrimaryButton';
import { Container } from '@/components/common/container/Container';
import { Col, Row } from '@/components/common/flex/Flex';
import Header from '@/components/common/header/Header';
import Txt from '@/components/common/text/Txt';
import TextField from '@/components/common/textField/TextField';
import { submitForm } from '@/remotes/landing/submitForm';
import { isEmail } from '@/utils/isEmail';

const 마케팅수신동의_URL = 'https://nonstop-asparagus-df0.notion.site/1333cf7403e280af8d2efb67191a99a5';

export default function LandingFormSubmit() {
  const router = useRouter();
  const { name, type, location, bestMenu, price, target, mood } = useQueryParams({ required: true });

  const [email, setEmail] = useState('');
  const emailFieldRef = useRef<HTMLInputElement>(null);

  const showEmailSuggestion = email.length > 1 && !isEmail(email);

  const handleCtaClick = async () => {
    try {
      await submitForm({
        store: { name, type, location, bestMenu, price: parseInt(price.replace(/\D/g,'')), target, mood },
        user: { email },
      });
      router.push({
        pathname: '/landing/share',
        query: {
          submit: 'COMPLETE',
        },
      });
    } catch (e) {
      alert('잠시 후 다시 시도해주세요.');
    }
  };

  return (
    <LoggingScreen
      id={100004}
      params={{
        screen_name: 'landing_submit',
      }}
    >
      <Container>
        <Header />
        <Col padding={'16px 0 24px'} gap={8}>
          <Txt font="이서윤체" align="center" size="2.8rem" height={36.4} color="#28292C">
            우리 가게의
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
              을 모두 채우셨어요!
            </Txt>
          </Row>
        </Col>
        <Col justifyContent="center" alignItems="center">
          <Txt align="center" size="1.6rem" height={24} color="#28292C">
            이메일을 남겨주시면 <Txt color="#ed801d">{name}</Txt>에 대한
          </Txt>
          <Txt align="center" size="1.6rem" height={24} color="#28292C">
            예비 고객님들의 의견을 모아 전달해드릴게요.
          </Txt>
        </Col>
        <Spacing size={40} />
        <div css={{ padding: '0 24px' }}>
          <TextField
            ref={emailFieldRef}
            fullSize={true}
            placeholder="의견을 받을 이메일을 입력해주세요."
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          {showEmailSuggestion && <EmailSuggestion email={email} onClick={setEmail} />}
        </div>
        <Spacing size={12} />
        <Row justifyContent={'center'}>
          <Txt color={'#575961'} size="12px" weight="400">
            의견 전달을 위해{' '}
            <a
              href={마케팅수신동의_URL}
              target="_blank"
              style={{ textDecorationLine: 'underline', cursor: 'pointer' }}
              rel="noreferrer"
            >
              마케팅 정보 수신동의 약관
            </a>
            에 동의하시게 돼요
          </Txt>
        </Row>
        <BottomFixedArea
          containerStyle={{
            padding: '16px',
          }}
        >
          <PrimaryButton title={'우리가게 의견 듣기'} onClick={handleCtaClick} disabled={!isEmail(email)} />
        </BottomFixedArea>
      </Container>
    </LoggingScreen>
  );
}

const EmailSuggestion = ({ email, onClick }: { email: string; onClick: (v: string) => void }) => {
  const suggestions = useMemo(() => ['naver.com', 'gmail.com', 'hanmail.net'], []);
  const [local, domain] = email.split('@');

  const suggestedDomains = suggestions.filter(v => v.includes(domain) || domain == null);

  if (suggestedDomains.length === 0) {
    return <></>;
  }

  return (
    <Col
      css={{
        padding: '8px',
        backgroundColor: '#FFFFFF',
        borderRadius: '8px',
        boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.15)',
        position: 'relative',
        top: 8,
        left: 0,
        zIndex: 1200,
      }}
    >
      {suggestedDomains.map(v => {
        const autoCompletedEmail = `${local}@${v}`;
        return (
          <div key={email + v} css={{ padding: '12px' }} onClick={() => onClick(autoCompletedEmail)}>
            <Txt size="1.6rem" height={24} color="#575961">
              {autoCompletedEmail}
            </Txt>
          </div>
        );
      })}
    </Col>
  );
};

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

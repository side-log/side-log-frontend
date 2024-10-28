import { LoggingImpression, LoggingScreen } from '@yeaaaah/shared';
import { Container } from '@/components/common/container/Container';
import { Col } from '@/components/common/flex/Flex';

export default function ImpressionAreaTestPage() {
  return (
    <LoggingScreen
      id={123456}
      params={{
        screen_name: 'test_page',
      }}
    >
      <Container>
        <Col gap={12}>
          {Array.from({ length: 20 }, (_, index) => (
            <LoggingImpression
              key={index}
              params={{
                content: `index : ${index}`,
              }}
            >
              <Dummy id={index + 1} />
            </LoggingImpression>
          ))}
        </Col>
      </Container>
    </LoggingScreen>
  );
}

function Dummy({ id }: { id: number }) {
  return <div css={{ padding: 24, backgroundColor: 'violet' }}>I'm Dummy No.{id}</div>;
}

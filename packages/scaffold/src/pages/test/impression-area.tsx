import { Container } from '@/components/common/container/Container';
import { Col } from '@/components/common/flex/Flex';

export default function ImpressionAreaTestPage() {
  return (
    <Container>
      <Col gap={12}>
        {Array.from({ length: 20 }, (_, index) => (
          <Dummy key={index} id={index + 1} />
        ))}
      </Col>
    </Container>
  );
}

function Dummy({ id }: { id: number }) {
  return <div css={{ padding: 24, backgroundColor: 'violet' }}>I'm Dummy No.{id}</div>;
}

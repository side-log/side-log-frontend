import { BottomFixedArea } from '@/components/common/area/BottomFixedArea';
import { Container } from '@/components/common/container/Container';

function TestPage() {
  return (
    <Container backgroundColor="yellow">
      <input />
      <BottomFixedArea>
        <div css={{ padding: 32, backgroundColor: 'red' }}>FixedBottomArea</div>
      </BottomFixedArea>
    </Container>
  );
}

export default TestPage;

import { useState } from 'react';
import { BottomFixedArea } from '@/components/common/area/BottomFixedArea';
import PrimaryButton from '@/components/common/button/PrimaryButton';
import { Container } from '@/components/common/container/Container';
import { Col } from '@/components/common/flex/Flex';
import { LandingFormProvider, useLandingFormContext } from '@/components/landing/LandingFormProvider';
import { TextFieldContainer } from '@/components/landing/TextFieldContainer';
import { useFormFieldVisibility } from '@/hooks/useFormFieldVisibility';

const LandingFormContainer = () => {
  const { setFocus, getValues } = useLandingFormContext();
  const { showNextField, isFieldVisible, getNextField } = useFormFieldVisibility([
    'store.name',
    'store.type',
    'store.location',
    'store.bestMenu',
    'store.price',
    'store.target',
    'store.mood',
  ]);
  const [isKeyDown, setIsKeyDown] = useState(false); // 플래그 변수 추가

  const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !isKeyDown) {
      setIsKeyDown(true); // Enter 키가 눌린 상태로 설정
      event.preventDefault(); // 기본 Enter 동작 방지

      console.log('Enter key down');

      showNextField(); // 다음 필드 표시

      const nextField = getNextField(); // 다음 필드 가져오기
      if (nextField) {
        // 비동기적으로 setFocus 실행
        await new Promise(resolve => setTimeout(resolve, 0)); // 비동기 처리 대기
        setFocus(nextField); // 다음 필드에 포커스 설정
      }

      // Enter 처리 완료 후 다시 키 입력 가능하게 설정
      setIsKeyDown(false);
    }
  };

  return (
    <Container>
      <Col gap={20} padding={'57px 16px'}>
        {isFieldVisible('store.mood') && (
          <TextFieldContainer
            name={'store.mood'}
            placeholder="가게의 분위기"
            rightContent="한 분위기를 즐겨보세요."
            leftEmoji="🍻"
            onSubmit={handleKeyDown}
            rules={{
              required: true,
            }}
          />
        )}
        {isFieldVisible('store.target') && (
          <TextFieldContainer
            name={'store.target'}
            placeholder="함께 방문할 사람들"
            rightContent="(과)와 함께,"
            leftEmoji="👭"
            onSubmit={handleKeyDown}
            rules={{
              required: true,
            }}
          />
        )}
        {isFieldVisible('store.price') && (
          <TextFieldContainer
            name={'store.price'}
            placeholder="가격"
            rightContent="원 정도의 가격대에요."
            leftEmoji="💴"
            onSubmit={handleKeyDown}
            rules={{
              required: true,
            }}
          />
        )}

        {isFieldVisible('store.bestMenu') && (
          <TextFieldContainer
            name={'store.bestMenu'}
            placeholder="대표메뉴명"
            rightContent="(이)가 정말 맛있어요."
            leftEmoji="🥞"
            onSubmit={handleKeyDown}
            rules={{
              required: true,
            }}
          />
        )}
        {isFieldVisible('store.location') && (
          <TextFieldContainer
            name={'store.location'}
            placeholder="가게의 위치"
            rightContent="에 위치하고 있어요."
            leftEmoji="📍"
            onSubmit={handleKeyDown}
            rules={{
              required: true,
            }}
          />
        )}

        {isFieldVisible('store.type') && (
          <TextFieldContainer
            name={'store.type'}
            placeholder="카페, 일식집 등 가게의 업종"
            rightContent="입니다."
            leftEmoji="🍴"
            onSubmit={handleKeyDown}
            rules={{
              required: true,
            }}
          />
        )}
        <TextFieldContainer
          name={'store.name'}
          placeholder="우리가게 이름"
          rightContent="(은)는,"
          leftEmoji="🏠"
          onSubmit={handleKeyDown}
          rules={{
            required: true,
          }}
        />
      </Col>
      <BottomFixedArea css={{ padding: '8px 16px' }}>
        <PrimaryButton
          title="다음"
          onClick={() => {
            const formValue = getValues();
            console.log(formValue);
          }}
        />
      </BottomFixedArea>
    </Container>
  );
};

const LandingFormPage = () => {
  return (
    <LandingFormProvider>
      <LandingFormContainer />
    </LandingFormProvider>
  );
};

export default LandingFormPage;

import { commaizeNumber } from '@toss/utils';
import { LoggingImpression, LoggingScreen } from '@yeaaaah/shared';
import { useRouter } from 'next/router';
import { BottomFixedArea } from '@/components/common/area/BottomFixedArea';
import PrimaryButton from '@/components/common/button/PrimaryButton';
import { Container } from '@/components/common/container/Container';
import { Col } from '@/components/common/flex/Flex';
import { LandingFormProvider, useLandingFormContext } from '@/components/landing/LandingFormProvider';
import { TextFieldContainer } from '@/components/landing/TextFieldContainer';
import { useFormFieldVisibility } from '@/hooks/useFormFieldVisibility';

const LandingFormContainer = () => {
  const {
    setFocus,
    trigger,
    getValues,
    formState: { errors, isValid },
  } = useLandingFormContext();
  const { showField, isFieldVisible, getNextField, isAllFieldsVisible, visibleFields } = useFormFieldVisibility([
    'store.type',
    'store.location',
    'store.bestMenu',
    'store.price',
    'store.target',
    'store.mood',
  ]);

  const router = useRouter();

  const hasError = errors.store != null;

  const handleNextField = async () => {
    if (isAllFieldsVisible) {
      return;
    }

    const nextField = getNextField();
    if (nextField == null) {
      return;
    }

    showField(nextField);
    await new Promise(resolve => setTimeout(resolve, 0));
    setFocus(nextField);
  };

  const handleSubmitField = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.nativeEvent.isComposing) {
      await handleNextField();
    }
  };

  const handleCtaClick = async () => {
    const isValid = await trigger('store');
    if (!isValid) {
      return;
    }

    if (isAllFieldsVisible) {
      const { store } = getValues();
      router.push({
        pathname: '/landing/result',
        query: store,
      });
    } else {
      await handleNextField();
    }
  };

  return (
    <LoggingScreen
      id={100002}
      params={{
        screen_name: 'landing_form',
        fields: visibleFields,
      }}
    >
      <Container>
        <Col gap={20} padding={'57px 16px'}>
          {isFieldVisible('store.mood') && (
            <LoggingImpression
              params={{
                impression_area: 'store.mood',
              }}
            >
              <TextFieldContainer
                name={'store.mood'}
                placeholder="가게의 분위기"
                rightContent="한 분위기를 즐겨보세요."
                leftEmoji="🍻"
                onKeyPress={handleSubmitField}
                autoFocus={true}
                rules={{
                  required: true,
                }}
              />
            </LoggingImpression>
          )}
          {isFieldVisible('store.target') && (
            <LoggingImpression
              params={{
                impression_area: 'sstore.target',
              }}
            >
              <TextFieldContainer
                name={'store.target'}
                placeholder="함께 방문할 사람들"
                rightContent="(과)와 함께,"
                leftEmoji="👭"
                onKeyPress={handleSubmitField}
                autoFocus={true}
                rules={{
                  required: true,
                }}
              />
            </LoggingImpression>
          )}
          {isFieldVisible('store.price') && (
            <LoggingImpression
              params={{
                impression_area: 'store.price',
              }}
            >
              <TextFieldContainer
                name={'store.price'}
                inputMode={'numeric'}
                placeholder="가격"
                format={v => commaizeNumber(String(v).replace(/[^\d]/g, ''))}
                rightContent="원 정도의 가격대에요."
                leftEmoji="💴"
                onKeyPress={handleSubmitField}
                autoFocus={true}
                rules={{
                  required: true,
                }}
              />
            </LoggingImpression>
          )}

          {isFieldVisible('store.bestMenu') && (
            <LoggingImpression
              params={{
                impression_area: 'store.bestMenu',
              }}
            >
              <TextFieldContainer
                name={'store.bestMenu'}
                placeholder="대표메뉴명"
                rightContent="(이)가 정말 맛있어요."
                leftEmoji="🥞"
                onKeyPress={handleSubmitField}
                autoFocus={true}
                rules={{
                  required: true,
                }}
              />
            </LoggingImpression>
          )}
          {isFieldVisible('store.location') && (
            <LoggingImpression
              params={{
                impression_area: 'store.name',
              }}
            >
              <TextFieldContainer
                name={'store.location'}
                placeholder="가게의 위치"
                rightContent="에 위치하고 있어요."
                leftEmoji="📍"
                onKeyPress={handleSubmitField}
                autoFocus={true}
                rules={{
                  required: true,
                }}
              />
            </LoggingImpression>
          )}

          {isFieldVisible('store.type') && (
            <LoggingImpression
              params={{
                impression_area: 'store.type',
              }}
            >
              <TextFieldContainer
                name={'store.type'}
                placeholder="카페, 일식집 등 가게의 업종"
                rightContent="입니다."
                leftEmoji="🍴"
                onKeyPress={handleSubmitField}
                autoFocus={true}
                rules={{
                  required: true,
                }}
              />
            </LoggingImpression>
          )}
          <LoggingImpression
            params={{
              impression_area: 'store.name',
            }}
          >
            <TextFieldContainer
              name={'store.name'}
              placeholder="우리가게 이름"
              rightContent="(은)는,"
              leftEmoji="🏠"
              onKeyPress={handleSubmitField}
              autoFocus={true}
              rules={{
                required: true,
              }}
            />
          </LoggingImpression>
        </Col>
        <BottomFixedArea
          containerStyle={{
            padding: '16px',
          }}
        >
          <PrimaryButton title="다음" disabled={hasError || !isValid} onClick={handleCtaClick} />
        </BottomFixedArea>
      </Container>
    </LoggingScreen>
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

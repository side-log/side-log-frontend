import { BottomFixedArea } from "@/components/common/area/BottomFixedArea";
import PrimaryButton from "@/components/common/button/PrimaryButton";
import { Container } from "@/components/common/container/Container";
import { Col } from "@/components/common/flex/Flex";
import { TextFieldContainer } from "@/components/landing/TextFieldContainer";
import { useFormFieldVisibility } from "@/hooks/useFormFieldVisibility";
import { get } from "http";
import { useEffect } from "react";
import { FormProvider, RegisterOptions, useForm } from "react-hook-form";

export const StoreFieldType = {
  STORENAME: "storeName",
  STORETYPE: "storeType",
  STORELOCATION: "storeLocation",
  STOREBESTMENU: "storeBestMenu",
  STOREPRICE: "storePrice",
  STORETARGET: "storeTarget",
  STOREMOOD: "storeMood",
} as const;

interface StoreDTO {
  storeName: string;
  storeType: string;
  storeLocation: string;
  storeBestMenu: string;
  storePrice: number;
  storeTarget: string;
  storeMood: string;
}

const StoreConfigOption: RegisterOptions = {
  required: "필수 입력 항목입니다.",
};

const LandingFormPage = () => {
  const methods = useForm<StoreDTO>({ mode: "onChange" });

  const fields = [
    StoreFieldType.STORENAME,
    StoreFieldType.STORETYPE,
    StoreFieldType.STORELOCATION,
    StoreFieldType.STOREBESTMENU,
    StoreFieldType.STOREPRICE,
    StoreFieldType.STORETARGET,
    StoreFieldType.STOREMOOD,
  ];

  const { showNextField, isFieldVisible, showField, getNextField } =
    useFormFieldVisibility(fields);

  let isKeyDown = false; // 플래그 변수 추가

  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter" && !isKeyDown) {
      isKeyDown = true; // Enter 키가 눌린 상태로 설정
      event.preventDefault(); // 기본 Enter 동작 방지

      console.log("Enter key down");

      showNextField(); // 다음 필드 표시

      const nextField = getNextField(); // 다음 필드 가져오기
      if (nextField) {
        // 비동기적으로 setFocus 실행
        await new Promise((resolve) => setTimeout(resolve, 0)); // 비동기 처리 대기
        methods.setFocus(nextField as keyof StoreDTO); // 다음 필드에 포커스 설정
      }

      // Enter 처리 완료 후 다시 키 입력 가능하게 설정
      isKeyDown = false;
    }
  };

  // 폼 필드 미리 등록
  useEffect(() => {
    showField(StoreFieldType.STORENAME);
  }, []);

  return (
    <FormProvider {...methods}>
      <Container>
        <Col gap={20} padding={"57px 16px"}>
          {isFieldVisible(StoreFieldType.STOREMOOD) && (
            <TextFieldContainer
              id={StoreFieldType.STOREMOOD}
              placeholder="가게의 분위기"
              rightContent="한 분위기를 즐겨보세요."
              leftImoji="🍻"
              options={StoreConfigOption}
              onKeyDown={handleKeyDown}
            />
          )}
          {isFieldVisible(StoreFieldType.STORETARGET) && (
            <TextFieldContainer
              id={StoreFieldType.STORETARGET}
              placeholder="함께 방문할 사람들"
              rightContent="(과)와 함께,"
              leftImoji="👭"
              options={StoreConfigOption}
              onKeyDown={handleKeyDown}
            />
          )}
          {isFieldVisible(StoreFieldType.STOREPRICE) && (
            <TextFieldContainer
              id={StoreFieldType.STOREPRICE}
              placeholder="가격"
              rightContent="원 정도의 가격대에요."
              leftImoji="💴"
              options={StoreConfigOption}
              onKeyDown={handleKeyDown}
            />
          )}

          {isFieldVisible(StoreFieldType.STOREBESTMENU) && (
            <TextFieldContainer
              id={StoreFieldType.STOREBESTMENU}
              placeholder="대표메뉴명"
              rightContent="(이)가 정말 맛있어요."
              leftImoji="🥞"
              options={StoreConfigOption}
              onKeyDown={handleKeyDown}
            />
          )}
          {isFieldVisible(StoreFieldType.STORELOCATION) && (
            <TextFieldContainer
              id={StoreFieldType.STORELOCATION}
              placeholder="가게의 위치"
              rightContent="에 위치하고 있어요."
              leftImoji="📍"
              options={StoreConfigOption}
              onKeyDown={handleKeyDown}
            />
          )}

          {isFieldVisible(StoreFieldType.STORETYPE) && (
            <TextFieldContainer
              id={StoreFieldType.STORETYPE}
              placeholder="카페, 일식집 등 가게의 업종"
              rightContent="입니다."
              leftImoji="🍴"
              options={StoreConfigOption}
              onKeyDown={handleKeyDown}
            />
          )}
          {isFieldVisible(StoreFieldType.STORENAME) && (
            <TextFieldContainer
              id={StoreFieldType.STORENAME}
              placeholder="우리가게 이름"
              rightContent="(은)는,"
              leftImoji="🏠"
              options={StoreConfigOption}
              onKeyDown={handleKeyDown}
            />
          )}
        </Col>
        <BottomFixedArea css={{ padding: "8px 16px" }}>
          <PrimaryButton title="다음" />
        </BottomFixedArea>
      </Container>
    </FormProvider>
  );
};

export default LandingFormPage;

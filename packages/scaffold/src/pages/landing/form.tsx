import { BottomFixedArea } from "@/components/common/area/BottomFixedArea";
import PrimaryButton from "@/components/common/button/PrimaryButton";
import { Container } from "@/components/common/container/Container";
import { Col } from "@/components/common/flex/Flex";
import { TextFieldContainer } from "@/components/landing/TextFieldContainer";
import { FormProvider, RegisterOptions, useForm } from "react-hook-form";

export const StoreFieldType = {
  STORENAME: "storeName",
  STORETYPE: "storeType",
  STOREBESTMENU: "storeBestMenu",
  STORELOCATION: "storeLocation",
  STOREPRICE: "storePrice",
  STORETARGET: "storeTarget",
  STOREMOOD: "storeMood",
};

interface StoreDTO {
  storeName: string;
  storeType: string;
  storeLocation: string;
  storePrice: number;
  storeTarget: string;
  storeMood: string;
}

const StoreConfigOption: RegisterOptions = {
  required: "필수 입력 항목입니다.",
};

const LandingFormPage = () => {
  const methods = useForm<StoreDTO>({ mode: "onChange" });
  return (
    <FormProvider {...methods}>
      <Container>
        <Col gap={20}>
          <TextFieldContainer
            id={StoreFieldType.STORENAME}
            placeholder="우리가게 이름"
            rightContent="(은)는,"
            options={StoreConfigOption}
          />
        </Col>
        <BottomFixedArea css={{ padding: "8px 16px" }}>
          <PrimaryButton title="다음" />
        </BottomFixedArea>
      </Container>
    </FormProvider>
  );
};

export default LandingFormPage;

import { FieldPath, FormProvider, useForm, useFormContext } from 'react-hook-form';

export interface LandingFormValue {
  storeName: string;
  storeType: string;
  storeLocation: string;
  storeBestMenu: string;
  storePrice: number;
  storeTarget: string;
  storeMood: string;
}

export function LandingFormProvider({ children }: { children: React.ReactNode }) {
  const methods = useForm<LandingFormValue>({ mode: 'onChange' });

  return <FormProvider {...methods}>{children}</FormProvider>;
}

export function useLandingFormContext() {
  return useFormContext<LandingFormValue>();
}

export type LandingFormFieldPath = FieldPath<LandingFormValue>;

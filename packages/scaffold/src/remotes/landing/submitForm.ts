import getDeivceId from '@yeaaaah/shared/src/utils/getDeviceId';
import { LandingFormValue } from '@/components/landing/LandingFormProvider';

interface SubmitFormRequest {
  store: LandingFormValue['store'];
  user: {
    email: string;
  };
}

export async function submitForm(data: SubmitFormRequest) {
  const deviceId = await getDeivceId();

  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/store`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...data,
      user: {
        ...data.user,
        deviceId,
      },
    }),
  });
}

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

  return fetch(`http://ec2-52-78-237-184.ap-northeast-2.compute.amazonaws.com:9000/api/store`, {
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

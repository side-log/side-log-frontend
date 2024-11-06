import getDeivceId from '@yeaaaah/shared/src/utils/getDeviceId';

interface SubmitFormRequest {
  store: {
    name: string;
    type: string;
    location: string;
    bestMenu: string;
    price: number;
    target: string;
    mood: string;
  }
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

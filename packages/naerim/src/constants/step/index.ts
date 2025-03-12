import { Step } from '@/app/checklist/models/step';

export const steps: Step[] = [
  {
    id: '1',
    title: '드립커피란 뭘까요?',
    description: '커피를 내리기 전에\n드립커피에 대해 먼저 알아봐요',
    image: '/images/step_1.png',
  },
  {
    id: '2',
    title: '드립커피의 맛 알아가기',
    description: '드립커피의 다채로운 맛을\n즐기는 법을 알아봐요',
    image: '/images/step_2.png',
  },
  {
    id: '3',
    title: '첫 잔 준비하기',
    description: '첫 잔을 위해 필요한 장비와\n원두 구입 가이드를 살펴봐요',
    image: '/images/step_3.png',
  },
  {
    id: '4',
    title: '첫 잔 내려보기',
    description: '이제 마지막 단계만 남았어요.\n함께 드립커피를 내려볼까요?',
    image: '/images/step_4.png',
  },
];

interface Equipment {
  id: string;
  name: string;
  price: number;
  category: string;
  link: string;
  features: string[];
  expertComments: string[];
  image: string;
}

export const equipments: Equipment[] = [
  {
    id: '1',
    name: '하리오 V60 (02 투명)',
    price: 7500,
    category: '드리퍼',
    link: 'https://www.hariokorea.co.kr/shop/item.php?it_id=1470991398',
    features: [
      '큰 추출구와 나선형 리브로 커피 추출 속도가 빨라요',
      '산미가 뚜렷하고, 복잡한 풍미를 잘 표현할 수 있어요',
      '밝고 깨끗한 맛을 원하시는 분들에게 적합해요',
    ],
    expertComments: [
      '물을 너무 빨리 부으면 커피 성분이 제대로 추출되지 않을 수 있다는 단점이 있는 드리퍼지만, 속도만 잘 조절하면 정교한 기술 없이도 원하는 맛을 보다 쉽게 낼 수 있어요. 처음 드립을 연습하기에 좋은 드리퍼예요.',
      '하리오 V60는 많은 카페에서 사용하고 있는 기본 드리퍼예요. 단맛을 끌어올리기에 좋고, 다양한 레시피를 잘 구현해 주는 드리퍼입니다. 특히 트라이탄 소재는 예열이 필요 없고 관리가 쉬워 사용하기에 어렵지 않으실 거에요.',
      '다양한 단맛을 잘 뽑아내 줄 수 있는 드리퍼예요. 커피의 단맛을 사랑하는 분들이라면 하리오 V60는 필수 드리퍼 중 하나에요.',
    ],
    image: 'https://www.hariokorea.co.kr/data/item/1470991398/thumb-VD02_320x320.jpg',
  },
];

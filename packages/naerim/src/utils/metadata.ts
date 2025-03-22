import { Metadata } from 'next';

interface GenerateMetadataParams {
  title: string;
  description?: string;
  image?: string;
}

export function metadataGenerator({
  title,
  description = '내림과 함께 드립커피 쉽게 입문해요',
  image = '/images/og-image.png',
}: GenerateMetadataParams): Metadata {
  return {
    title: title,
    description,
    openGraph: {
      title: title,
      description,
      images: [
        {
          url: image,
          width: 506,
          height: 265,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description,
      images: [image],
    },
  };
}

'use client';

import { ExtendedRecordMap } from 'notion-types';
import { NotionRenderer } from 'react-notion-x';
import dynamic from 'next/dynamic';
import { css } from '../../../../../styled-system/css';

const Code = dynamic(() => import('react-notion-x/build/third-party/code').then(m => m.Code));
const Collection = dynamic(() => import('react-notion-x/build/third-party/collection').then(m => m.Collection));
const Equation = dynamic(() => import('react-notion-x/build/third-party/equation').then(m => m.Equation));
const Pdf = dynamic(() => import('react-notion-x/build/third-party/pdf').then(m => m.Pdf), {
  ssr: true,
});
const Modal = dynamic(() => import('react-notion-x/build/third-party/modal').then(m => m.Modal), {
  ssr: true,
});

export default function NotionComponent({ data }: { data: ExtendedRecordMap }) {
  return (
    <NotionRenderer
      recordMap={data}
      darkMode={true}
      components={{
        Code,
        Collection,
        Equation,
        Pdf,
        Modal,
      }}
      className={css({
        '& .notion-collection-page-properties': {
          display: 'none !important',
        },
      })}
    />
  );
}

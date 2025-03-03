import Text from '../Text';
import { css } from '../../../styled-system/css';

import { NotionRenderer as ReactNotionRenderer, BlockMapType, MapImageUrl, BlockValueType } from 'react-notion';
import { getIcon } from '../Icon';

interface NotionRendererProps {
  blockMap: BlockMapType;
  level?: number;
}

export function NotionRenderer({ blockMap, level = 0 }: NotionRendererProps) {
  return (
    <div
      className={css({
        '& main.notion': {
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          paddingBottom: '120px',
        },
      })}
    >
      <ReactNotionRenderer
        blockMap={blockMap}
        level={level}
        customBlockComponents={{
          header: ({ blockValue }) => {
            return (
              <Text color={'base.white'} typography={'t1'} className={css({ marginBottom: '16px' })}>
                {blockValue.properties?.title?.join()}
              </Text>
            );
          },
          sub_sub_header: ({ blockValue }) => {
            const text = blockValue?.properties?.title?.[0]?.[0];

            if (text == null || text === '') {
              return null;
            }

            return (
              <Text color={'base.white'} typography={'t3'} className={css({ marginBottom: '16px' })}>
                {text}
              </Text>
            );
          },
          code: ({ blockValue }) => {
            const caption = blockValue?.properties?.caption?.[0]?.[0];
            const text = blockValue?.properties?.title?.[0]?.[0];
            console.log('🚀 ~ NotionRenderer ~ caption:', caption);

            const Icon = getIcon(caption);

            return (
              <div
                className={css({
                  display: 'flex',
                  // alignContent: 'center',
                  gap: '10px',
                  padding: '14px 16px',
                  borderRadius: '12px',
                  backgroundColor: 'background.normal',
                })}
              >
                <div>
                  <Icon />
                </div>
                <Text color={'content.normal'} typography={'b5'} className={css({ whiteSpace: 'pre-wrap' })}>
                  {text}
                </Text>
              </div>
            );
          },
          text: ({ blockValue, level }) => {
            const text = blockValue?.properties?.title?.[0]?.[0];
            const isBold = blockValue?.properties?.title?.[0]?.[1]?.[0]?.[0] === 'b';

            if (text == null || text === '') {
              return null;
            }

            return (
              <Text
                color={isBold ? 'base.white' : 'content.normal'}
                typography={isBold ? 'b1' : 'b3'}
                className={css({
                  whiteSpace: 'pre-wrap',
                  marginBottom: level === 1 ? '16px' : undefined,
                })}
              >
                {text}
              </Text>
            );
          },
          image: ({ blockValue }) => {
            const src = defaultMapImageUrl(blockValue?.properties?.source?.[0]?.[0], {
              role: 'block',
              value: blockValue as BlockValueType,
            });

            return (
              <div
                style={{
                  position: 'relative',
                  width: '68px',
                  height: '68px',
                }}
              >
                <img alt={'notion image'} src={src} />
              </div>
            );
          },
          column: ({ blockValue, blockMap }) => {
            return (
              <div className={css({})}>
                {blockValue?.content?.map(id => {
                  if (!blockMap[id]) return null;
                  return (
                    <NotionRenderer
                      key={id}
                      level={level + 1}
                      blockMap={{
                        [id]: blockMap[id],
                        ...blockMap,
                      }}
                    />
                  );
                })}
              </div>
            );
          },
          column_list: ({ blockValue, blockMap }) => {
            return (
              <div
                className={css({
                  padding: '16px',
                  borderRadius: '12px',
                  backgroundColor: 'background.normal',
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  marginBottom: '12px',
                  gap: '16px',
                })}
              >
                {blockValue?.content?.map(id => {
                  if (!blockMap[id]) return null;
                  return (
                    <NotionRenderer
                      key={id}
                      level={level + 1}
                      blockMap={{
                        [id]: blockMap[id],
                        ...blockMap,
                      }}
                    />
                  );
                })}
              </div>
            );
          },
        }}
      />
    </div>
  );
}

export const defaultMapImageUrl: MapImageUrl = (image = '', block) => {
  const url = new URL(
    `https://www.notion.so${image.startsWith('/image') ? image : `/image/${encodeURIComponent(image)}`}`
  );

  if (block && !image.includes('/images/page-cover/')) {
    const table = block.value.parent_table === 'space' ? 'block' : block.value.parent_table;
    url.searchParams.set('table', table);
    url.searchParams.set('id', block.value.id);
    url.searchParams.set('cache', 'v2');
  }

  return url.toString();
};

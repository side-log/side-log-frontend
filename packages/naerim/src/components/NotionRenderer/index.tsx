import Text from '../Text';
import { css } from '../../../styled-system/css';

import {
  NotionRenderer as ReactNotionRenderer,
  BlockMapType,
  MapImageUrl,
  BlockValueType,
  BlockType,
} from 'react-notion';
import { getIcon } from '../Icon';
import Spacing from '../Spacing';

function getNextBlock(blockMap: BlockMapType, blockId: string) {
  const blockIds = Object.keys(blockMap);
  const currentIndex = blockIds.indexOf(blockId);
  const nextBlock =
    currentIndex >= 0 && currentIndex < blockIds.length - 1 ? blockMap[blockIds[currentIndex + 1]] : null;
  return nextBlock;
}

function isBottomGapBlock(block: BlockType | null) {
  if (block == null) return false;

  const blockValue = block.value;
  return (
    blockValue.type === 'code' &&
    blockValue?.properties?.language?.[0]?.[0] === 'HTML' &&
    blockValue?.properties?.title?.[0]?.[0] == null
  );
}

interface WithBottomGapProps {
  blockMap: BlockMapType;
  blockId: string;
  children: (props: { hasBottomGap: boolean }) => React.ReactNode;
}

function withBottomGap({ blockMap, blockId, children }: WithBottomGapProps) {
  const nextBlock = getNextBlock(blockMap, blockId);
  const hasBottomGap = isBottomGapBlock(nextBlock);
  return children({ hasBottomGap });
}

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
          paddingBottom: '120px',
        },
      })}
    >
      <ReactNotionRenderer
        blockMap={blockMap}
        level={level}
        customBlockComponents={{
          header: ({ blockValue }) => {
            return withBottomGap({
              blockMap,
              blockId: blockValue.id,
              children: ({ hasBottomGap }) => (
                <Text
                  color={'base.white'}
                  typography={'t1'}
                  className={css({ marginBottom: hasBottomGap ? undefined : '16px' })}
                >
                  {blockValue.properties?.title?.join()}
                </Text>
              ),
            });
          },
          sub_sub_header: ({ blockValue }) => {
            const text = blockValue?.properties?.title?.[0]?.[0];

            if (text == null || text === '') {
              return null;
            }

            return withBottomGap({
              blockMap,
              blockId: blockValue.id,
              children: ({ hasBottomGap }) => (
                <Text
                  color={'base.white'}
                  typography={'t3'}
                  className={css({ marginBottom: hasBottomGap ? undefined : '16px' })}
                >
                  {text}
                </Text>
              ),
            });
          },
          code: ({ blockValue }) => {
            const caption = blockValue?.properties?.caption?.[0]?.[0];
            const text = blockValue?.properties?.title?.[0]?.[0];
            const language = blockValue?.properties?.language?.[0]?.[0];

            const Icon = getIcon(caption);

            if (language === 'HTML' && text == null && caption == null) {
              return <Spacing size={32} />;
            }

            return withBottomGap({
              blockMap,
              blockId: blockValue.id,
              children: ({ hasBottomGap }) => (
                <div
                  className={css({
                    display: 'flex',
                    gap: '10px',
                    padding: '14px 16px',
                    borderRadius: '12px',
                    backgroundColor: 'background.normal',
                    marginBottom: hasBottomGap ? undefined : '16px',
                  })}
                >
                  <div>{Icon != null && <Icon />}</div>
                  <Text color={'content.normal'} typography={'b5'} className={css({ whiteSpace: 'pre-wrap' })}>
                    {text}
                  </Text>
                </div>
              ),
            });
          },
          text: ({ blockValue, level }) => {
            const text = blockValue?.properties?.title?.[0]?.[0];
            const isBold = blockValue?.properties?.title?.[0]?.[1]?.[0]?.[0] === 'b';

            if (text == null || text === '') {
              return null;
            }

            return withBottomGap({
              blockMap,
              blockId: blockValue.id,
              children: ({ hasBottomGap }) => (
                <Text
                  color={isBold ? 'base.white' : 'content.normal'}
                  typography={isBold ? 'b1' : 'b3'}
                  className={css({
                    whiteSpace: 'pre-wrap',
                    marginBottom: level === 1 ? (hasBottomGap ? undefined : '16px') : undefined,
                  })}
                >
                  {text}
                </Text>
              ),
            });
          },
          image: ({ blockValue }) => {
            const src = defaultMapImageUrl(blockValue?.properties?.source?.[0]?.[0], {
              role: 'block',
              value: blockValue as BlockValueType,
            });

            return withBottomGap({
              blockMap,
              blockId: blockValue.id,
              children: ({ hasBottomGap }) => (
                <div
                  style={{
                    position: 'relative',
                    width: '68px',
                    height: '68px',
                    marginBottom: hasBottomGap ? undefined : '16px',
                  }}
                >
                  <img alt={'notion image'} src={src} />
                </div>
              ),
            });
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
            return withBottomGap({
              blockMap,
              blockId: blockValue.id,
              children: ({ hasBottomGap }) => (
                <div
                  className={css({
                    padding: '16px',
                    borderRadius: '12px',
                    backgroundColor: 'background.normal',
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    marginBottom: hasBottomGap ? undefined : '12px',
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
              ),
            });
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

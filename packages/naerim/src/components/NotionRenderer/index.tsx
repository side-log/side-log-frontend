import Text, { Typography } from '../Text';
import { css } from '../../../styled-system/css';

import {
  NotionRenderer as ReactNotionRenderer,
  BlockMapType,
  MapImageUrl,
  BlockValueType,
  BlockType,
  DecorationType,
} from 'react-notion';
import { getIcon } from '../Icon';
import Spacing from '../Spacing';
import { Fragment } from 'react';
import Link from 'next/link';
import { SystemStyleObject } from '../../../styled-system/types';

function getNextBlock(blockMap: BlockMapType, blockId: string) {
  const blockIds = Object.keys(blockMap);
  const currentIndex = blockIds.indexOf(blockId);
  return currentIndex >= 0 && currentIndex < blockIds.length - 1 ? blockMap[blockIds[currentIndex + 1]] : null;
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

function TextRenderer({
  text,
  typography,
  color,
}: {
  text: DecorationType[];
  typography: Typography;
  color: SystemStyleObject['color'];
}) {
  return (
    <>
      {text.map((item, index) => {
        const [text, types] = item;

        const isLink = types?.find(type => type[0] === 'a') != null;
        const link = types?.find(type => type[0] === 'a')?.[1] ?? '';

        // const isBold = types?.find(type => type[0] === 'b') != null;

        if (isLink) {
          return (
            <Text key={index} color={color} typography={typography}>
              <Link href={link} key={index} className={css({ textDecoration: 'underline' })}>
                {text}
              </Link>
            </Text>
          );
        }

        return (
          <Text key={index} color={color} typography={typography}>
            <Fragment>{text}</Fragment>
          </Text>
        );
      })}
    </>
  );
}

export function NotionRenderer({ blockMap, level = 0 }: NotionRendererProps) {
  return (
    <div
      className={css({
        '& main.notion': {
          display: 'flex',
          flexDirection: 'column',
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
                <h1 className={css({ marginBottom: hasBottomGap ? undefined : '16px' })}>
                  <TextRenderer text={blockValue?.properties?.title} typography={'t1'} color={'base.white'} />
                </h1>
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
          text: ({ blockValue }) => {
            const isCode = blockValue?.properties?.title?.some?.((item: string[][][]) =>
              item[1]?.some?.((type: string[]) => type[0] === 'c')
            );

            return withBottomGap({
              blockMap,
              blockId: blockValue.id,
              children: ({ hasBottomGap }) => (
                <p
                  className={css(
                    isCode
                      ? {
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: 0,
                          columnGap: '3px',
                          rowGap: '6px',
                          margin: '16px 0px',
                        }
                      : {
                          marginBottom: hasBottomGap ? undefined : '12px',
                        }
                  )}
                >
                  {blockValue?.properties?.title?.map((item: [string, string[][]], index: number) => {
                    const key = blockValue.id + '-' + index;
                    const [text, types] = item;

                    const isBold = types?.find(type => type[0] === 'b');
                    const isCode = types?.find(type => type[0] === 'c');

                    if (text == null || text === '') {
                      return null;
                    }

                    if (isCode) {
                      return (
                        <span
                          key={key}
                          className={css({
                            padding: '6px 12px',
                            borderRadius: 'full',
                            backgroundColor: 'background.normal',
                            border: '1px solid #FFFFFF1A',
                            display: 'inline-flex',
                            alignItems: 'center',
                            height: 'fit-content',
                          })}
                        >
                          <Text color={'base.white'} typography={'l1'}>
                            {text}
                          </Text>
                        </span>
                      );
                    }

                    return (
                      <Fragment key={key}>
                        <Text
                          color={isBold ? 'base.white' : 'content.normal'}
                          typography={isBold ? 'b1' : 'b3'}
                          className={css({
                            whiteSpace: 'pre-wrap',
                          })}
                        >
                          {text}
                        </Text>
                      </Fragment>
                    );
                  })}
                </p>
              ),
            });
          },
          image: ({ blockValue, level }) => {
            const src = defaultMapImageUrl(blockValue?.properties?.source?.[0]?.[0], {
              role: 'block',
              value: blockValue as BlockValueType,
            });

            return withBottomGap({
              blockMap,
              blockId: blockValue.id,
              children: ({}) => (
                <div>
                  <img
                    alt={'notion image'}
                    src={src}
                    style={
                      level === 1
                        ? {
                            borderRadius: '8px',
                          }
                        : {
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            aspectRatio: '1/1',
                            borderRadius: '8px',
                          }
                    }
                  />
                </div>
              ),
            });
          },
          column: ({ blockValue, blockMap }) => {
            return (
              <div className={css({})}>
                {blockValue?.content?.map(id => {
                  if (blockMap[id] == null) {
                    return null;
                  }

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
          column_list: ({ blockValue, blockMap, level }) => {
            const columnLength = blockValue?.content?.length ?? 0;

            if (columnLength === 2) {
              return withBottomGap({
                blockMap,
                blockId: blockValue.id,
                children: ({ hasBottomGap }) => (
                  <div
                    className={css({
                      padding: '16px',
                      borderRadius: '12px',
                      backgroundColor: 'background.normal',
                      marginBottom: hasBottomGap ? undefined : '12px',
                      display: 'grid',
                      gridTemplateColumns: '1fr 3.33fr',
                      gap: '12px',
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
            }

            if (columnLength === 3) {
              return withBottomGap({
                blockMap,
                blockId: blockValue.id,
                children: ({}) => (
                  <div
                    className={css({
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr 1fr',
                      gap: '12px',
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
            }

            return null;
          },
          bulleted_list: ({ blockValue }) => {
            return withBottomGap({
              blockMap,
              blockId: blockValue.id,
              children: ({}) => (
                <li
                  className={css({
                    '&::marker': {
                      color: 'base.white',
                    },
                    marginBottom: '8px',
                  })}
                >
                  <TextRenderer text={blockValue?.properties?.title} typography={'b3'} color={'content.normal'} />
                </li>
              ),
            });
          },
          callout: ({ blockValue }) => {
            return withBottomGap({
              blockMap,
              blockId: blockValue.id,
              children: ({}) => (
                <div
                  className={css({
                    padding: '16px 16px 4px 16px',
                    borderRadius: '8px',
                    backgroundColor: 'background.normal',
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
          divider: ({ blockValue }) => {
            return withBottomGap({
              blockMap,
              blockId: blockValue.id,
              children: ({}) => (
                <div
                  className={css({
                    width: '100%',
                    height: '1px',
                    backgroundColor: '#FFFFFF33',
                  })}
                ></div>
              ),
            });
          },
          video: ({ renderComponent }) => {
            return (
              <div
                className={css({
                  '& figure': {
                    width: '100% !important',
                  },
                  '& div': {
                    paddingBottom: '0 !important',
                  },
                  '& iframe': {
                    width: '100% !important',
                    height: '50vw !important',
                    borderRadius: '12px',
                  },
                })}
              >
                {renderComponent()}
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

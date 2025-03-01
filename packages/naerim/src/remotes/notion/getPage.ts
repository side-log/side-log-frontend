import { ExtendedRecordMap } from 'notion-types';
import notion, { checklistPageId } from '.';

export default function getNotionPage(pageId: string) {
  return notion.getPage(pageId);
}

const STEP_KEY = 'MDAA';
const ORDER_KEY = 'A?ig';

export const getChecklistPage = async () => {
  return getNotionPage(checklistPageId);
};

export const getChecklistArticle = async (step: string, order: string) => {
  const _data = await getChecklistPage();
  const pages = Object.entries(_data.block).map(([key, value]) => ({ key, value }));

  const article = pages
    .filter(page => page.value.value?.type === 'page')
    .find(page => {
      return (
        page.value.value.properties?.[STEP_KEY]?.[0]?.[0] === step.toString() &&
        page.value.value.properties?.[ORDER_KEY]?.[0]?.[0] === order.toString()
      );
    });

  const contents = article?.value.value.content?.map(content => pages.find(page => page.key === content));

  if (article == null || contents == null) {
    throw new Error('Article not found');
  }

  const data: ExtendedRecordMap = {
    ..._data,
    block: {
      [article.key]: article.value,
      ...Object.fromEntries(contents?.map(content => [content?.key, content?.value])),
    },
  };

  return { article, data };
};

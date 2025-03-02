import { BlockMapType } from 'react-notion';

export const fetchPage = async (pageId: string): Promise<BlockMapType> => {
  const response = await fetch(`https://notion-api.splitbee.io/v1/page/${pageId}`, {
    headers: {
      Authorization: `Bearer ${process.env.NOTION_TOKEN_V2}`,
    },
  });

  return response.json();
};

export const fetchTable = async (tableId: string) => {
  const response = await fetch(`https://notion-api.splitbee.io/v1/table/${tableId}`, {
    headers: {
      Authorization: `Bearer ${process.env.NOTION_TOKEN_V2}`,
    },
  });

  return response.json();
};

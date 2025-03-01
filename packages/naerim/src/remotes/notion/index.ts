import { NotionAPI } from 'notion-client';

const notion = new NotionAPI({
  // activeUser: process.env.NOTION_ACTIVE_USER,
  authToken: process.env.NOTION_TOKEN_V2,
});

export default notion;
export const checklistPageId = '1983cf7403e280b29e17c8812ab24431';

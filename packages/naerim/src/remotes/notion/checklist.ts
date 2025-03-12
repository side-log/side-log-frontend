import { fetchTable } from '.';

const CHECKLIST_TABLE_ID = '1983cf7403e280b29e17c8812ab24431';

interface ChecklistTable {
  id: string;
  order?: number;
  step?: string;
  Name?: string;
  equipment?: string;
  status: string;
  Title: string;
}

export const getChecklistTable = async (): Promise<ChecklistTable[]> => {
  return fetchTable(CHECKLIST_TABLE_ID);
};

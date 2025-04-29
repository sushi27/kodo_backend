import { SortDirection, SortField } from './Sort';

export interface QueryParams {
  query: string;
  sortBy: SortField;
  sortOrder: SortDirection;
  page: number;
  pageSize: number;
}
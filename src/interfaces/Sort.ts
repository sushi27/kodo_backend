import { Post } from './Post';

export type SortDirection = 'asc' | 'desc';
export type SortField = 'name' | 'dateLastEdited';

export interface SortService {
  sort(data: Post[], field: SortField, direction: SortDirection): Post[];
}
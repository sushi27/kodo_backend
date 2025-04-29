import { Post } from './Post';

export interface SearchService {
  search(query: string, data: Post[]): Post[];
}

export interface SearchResult {
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
  results: Post[];
}
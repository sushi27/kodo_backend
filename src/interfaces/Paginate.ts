import { Post } from '../interfaces';

export interface PaginationResult {
  items: Post[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

export interface PaginationService {
  paginate(data: Post[], page: number, pageSize: number): PaginationResult;
}
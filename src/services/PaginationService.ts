import { Post, PaginationService, PaginationResult } from '../interfaces';

export class SimplePaginationService implements PaginationService {
  paginate(data: Post[], page: number, pageSize: number): PaginationResult {
    const totalCount = data.length;
    const totalPages = Math.ceil(totalCount / pageSize);
    
    const validPage = Math.max(1, Math.min(page, totalPages || 1));
    
    const startIndex = (validPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, totalCount);
    
    const items = data.slice(startIndex, endIndex);
    
    return {
      items,
      page: validPage,
      pageSize,
      totalCount,
      totalPages
    };
  }
}
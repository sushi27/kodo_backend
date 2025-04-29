import { expect } from 'chai';
import { SimplePaginationService } from './PaginationService';
import { Post } from '../interfaces';
import MockPostData from '../mocks/Posts'

describe('PaginationService', () => {
  const paginationService = new SimplePaginationService();
  
  const testPosts: Post[] = Array.from({ length: 6 }, () => MockPostData).flat()
  
  it('should paginate results correctly for the first page', () => {
    const result = paginationService.paginate(testPosts, 1, 10);
    expect(result.items).to.have.lengthOf(10);
    expect(result.page).to.equal(1);
    expect(result.pageSize).to.equal(10);
    expect(result.totalCount).to.equal(24);
    expect(result.totalPages).to.equal(3);
  });
  
  it('should paginate results correctly for the second page', () => {
    const result = paginationService.paginate(testPosts, 2, 10);
    expect(result.items).to.have.lengthOf(10);
    expect(result.page).to.equal(2);
  });
  
  it('should paginate results correctly for the last page', () => {
    const result = paginationService.paginate(testPosts, 3, 10);
    expect(result.items).to.have.lengthOf(4);
    expect(result.page).to.equal(3);
  });
  
  it('should handle page number greater than total pages', () => {
    const result = paginationService.paginate(testPosts, 10, 10);
    expect(result.items).to.have.lengthOf(4);
    expect(result.page).to.equal(3);
  });
  
  it('should handle page number less than 1', () => {
    const result = paginationService.paginate(testPosts, -1, 10);
    expect(result.items).to.have.lengthOf(10);
    expect(result.page).to.equal(1);
  });
  
  it('should handle custom page sizes', () => {
    const result = paginationService.paginate(testPosts, 1, 5);
    expect(result.items).to.have.lengthOf(5);
    expect(result.totalPages).to.equal(5);
  });
  
  it('should handle empty arrays', () => {
    const result = paginationService.paginate([], 1, 10);
    expect(result.items).to.be.an('array').that.is.empty;
    expect(result.totalCount).to.equal(0);
    expect(result.totalPages).to.equal(0);
    expect(result.page).to.equal(1);
  });
});
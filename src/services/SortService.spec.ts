import { expect } from 'chai';
import { SimpleSortService } from './SortService';
import { Post } from '../interfaces';
import MockPostData from '../mocks/Posts'

describe('SortService', () => {
  const sortService = new SimpleSortService();
  
  const testPosts: Post[] = MockPostData
  
  it('should sort by name in ascending order', () => {
    const result = sortService.sort(testPosts, 'name', 'asc');
    expect(result[0].name).to.equal('Harry Potter');
  });
  
  it('should sort by name in descending order', () => {
    const result = sortService.sort(testPosts, 'name', 'desc');
    expect(result[0].name).to.equal('The Lord of the Rings: The Return of the King');
  });
  
  it('should sort by dateLastEdited in ascending order', () => {
    const result = sortService.sort(testPosts, 'dateLastEdited', 'asc');
    expect(result[0].name).to.equal('The Lion King');
  });
  
  it('should sort by dateLastEdited in descending order', () => {
    const result = sortService.sort(testPosts, 'dateLastEdited', 'desc');
    expect(result[0].name).to.equal('Star Wars');
  });
  
  it('should not modify the original array', () => {
    const originalOrder = [...testPosts];
    sortService.sort(testPosts, 'name', 'asc');
    expect(testPosts).to.deep.equal(originalOrder);
  });
  
  it('should handle empty arrays', () => {
    const result = sortService.sort([], 'name', 'asc');
    expect(result).to.be.an('array').that.is.empty;
  });
});
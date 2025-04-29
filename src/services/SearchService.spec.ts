import { expect } from 'chai';
import { Post } from '../interfaces';
import { SimpleSearchService } from './SearchService';
import MockPostData from '../mocks/Posts'

describe('Search Service', () => {
  const testData: Post[] = MockPostData
  
  const searchService = new SimpleSearchService();
  
  it('should return all posts when no query is provided', () => {
    const results = searchService.search('', testData);
    expect(results).to.have.lengthOf(testData.length);
    expect(results).to.deep.equal(testData);
  });
  
  it('should find posts that match the query in the name or description field', () => {
    const results = searchService.search('the king', testData);
    expect(results).to.have.lengthOf(2);
  });
  
  it('should find posts that exacts match the query in the name or description field', () => {
    const results = searchService.search('"the king"', testData);
    expect(results).to.have.lengthOf(1);
  });
  
  it('should perform case-insensitive search', () => {
    const results = searchService.search('KING', testData);
    expect(results).to.have.lengthOf(2);
  });
  
  it('should not find posts with non-matching terms', () => {
    const results = searchService.search('submarine', testData);
    expect(results).to.have.lengthOf(0);
  });
});
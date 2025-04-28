import { expect } from 'chai';
import { Post } from '../interfaces';
import { SimpleSearchService } from './SearchService';

describe('Search Service', () => {
  const testData: Post[] = [
    { name: 'The Lord of the Rings: The Return of the King', description: 'Epic fantasy movie', image: "https://picsum.photos/640/480", dateLastEdited: "2018-05-19T12:33:25.545Z"},
    { name: 'The Lion King', description: 'Animated Disney classic', image: "https://picsum.photos/640/480", dateLastEdited: "2018-05-19T12:33:25.545Z"},
    { name: 'Harry Potter', description: 'Wizard boy goes to magic school and fights evil', image: "https://picsum.photos/640/480", dateLastEdited: "2018-05-19T12:33:25.545Z"},
    { name: 'Star Wars', description: 'Space fantasy with lightsabers and the Force', image: "https://picsum.photos/640/480", dateLastEdited: "2018-05-19T12:33:25.545Z"}
  ];
  
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
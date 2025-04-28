import { SearchService } from '../interfaces/SearchService';
import { SimpleSearchService } from '../services/SearchService';

class SearchServiceFactory {

  static getSearchService(caseType: string): SearchService {
    switch (caseType) {
      case 'simple':
        return new SimpleSearchService();
      default:
        return new SimpleSearchService();
    }
  }
}

export default SearchServiceFactory
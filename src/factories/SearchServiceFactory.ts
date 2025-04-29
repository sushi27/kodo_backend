import { SearchService, SearchServiceType } from '../interfaces';
import { SimpleSearchService } from '../services/SearchService';

export default class SearchServiceFactory {
  static createSearchService(type: SearchServiceType = SearchServiceType.SIMPLE): SearchService {
    switch (type) {
      case SearchServiceType.SIMPLE:
      default:
        return new SimpleSearchService();
    }
  }
}
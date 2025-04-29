import { SimpleSortService } from '../services/SortService';
import { SortServiceType, SortService } from '../interfaces';

export default class SortServiceFactory {
  static createSortService(type: SortServiceType = SortServiceType.SIMPLE): SortService {
    switch (type) {
      case SortServiceType.SIMPLE:
      default:
        return new SimpleSortService();
    }
  }
}
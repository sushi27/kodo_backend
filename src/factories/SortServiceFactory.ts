import { SimpleSortService } from '../services/SortSerivce';
import { SortServiceType, SortService } from '../interfaces';

export class SortServiceFactory {
  static createSortService(type: SortServiceType = SortServiceType.SIMPLE): SortService {
    switch (type) {
      case SortServiceType.SIMPLE:
      default:
        return new SimpleSortService();
    }
  }
}
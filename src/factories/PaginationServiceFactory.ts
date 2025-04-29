import { SimplePaginationService } from '../services/PaginationService';
import { PaginationServiceType, PaginationService } from '../interfaces';

export default class PaginationServiceFactory {
  static createPaginationService(type: PaginationServiceType = PaginationServiceType.SIMPLE): PaginationService {
    switch (type) {
      case PaginationServiceType.SIMPLE:
      default:
        return new SimplePaginationService();
    }
  }
}
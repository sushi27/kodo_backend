import { Post, SortField, SortDirection, SortService } from '../interfaces';

export class SimpleSortService implements SortService {
  sort(data: Post[], field: SortField, direction: SortDirection): Post[] {
    return [...data].sort((a, b) => {
      let valueA: any;
      let valueB: any;

      if (field === 'dateLastEdited') {
        valueA = a.dateLastEdited ? new Date(a.dateLastEdited).getTime() : 0;
        valueB = b.dateLastEdited ? new Date(b.dateLastEdited).getTime() : 0;
      } else {
        valueA = a.name || '';
        valueB = b.name || '';
      }

      if (direction === 'desc') {
        return valueA > valueB ? -1 : valueA < valueB ? 1 : 0;
      } else {
        return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
      }
    });
  }
}
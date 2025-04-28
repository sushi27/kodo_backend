import { Post } from '../interfaces/Post';

export interface SearchService {
  search(query: string, data: Post[]): Post[];
}
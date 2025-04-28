import { Post } from '../interface/Post';

interface SearchService {
  search(query: string, data: Post[]): Post[];
}

export {
  SearchService
}
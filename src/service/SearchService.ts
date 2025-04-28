import { SearchService } from '../interface/SearchService';
import { Post } from '../interface/Post';

class SimpleSearchService implements SearchService {
  search(query: string, data: Post[]): Post[] {
    if (!query || query.trim() === '') {
      return [...data];
    }

    const trimmedQuery = query.trim();
    
    if (trimmedQuery.startsWith('"') && trimmedQuery.endsWith('"')) {
      const exactPhrase = trimmedQuery.slice(1, -1).toLowerCase();
      return this.exactPhraseSearch(exactPhrase, data);
    }
    
    return this.keywordSearch(trimmedQuery.toLowerCase(), data);
  }

  private exactPhraseSearch(phrase: string, data: Post[]): Post[] {
    return data.filter(post => {
      const nameMatch = post.name.toLowerCase().includes(phrase);
      const descriptionMatch = post.description.toLowerCase().includes(phrase);
      return nameMatch || descriptionMatch;
    });
  }

  private keywordSearch(query: string, data: Post[]): Post[] {
    return data.filter(post => {
      const keywords = query.split(/\s+/).map(keyword => keyword.toLowerCase());
      const nameMatch = keywords.every(keyword => post.name.toLowerCase().includes(keyword));
      const descriptionMatch = keywords.every(keyword => post.description.toLowerCase().includes(keyword));
      return nameMatch || descriptionMatch;
    });
  }
}

export {
  SimpleSearchService
}
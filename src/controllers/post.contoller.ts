import { Post, SearchService } from '../interfaces';
import SearchServiceFactory from '../factories/SearchServiceFactory';
import LoadPostsData from '../utils/LoadPostsData';
import express from 'express';

const app = express();

(async () => {
  const loadPostsData: LoadPostsData = LoadPostsData.getInstance();
  await loadPostsData.loadData();
  const posts: Post[] = loadPostsData.getPosts();

  const searchService: SearchService = SearchServiceFactory.createSearchService();

  app.get('/search', (req, res) => {
    const query = req.query.q as string || '';
    const results = searchService.search(query, posts);
    res.json({
      query,
      count: results.length,
      results
    });
  });

  app.get('', (_, res) => {
    res.json(posts);
  });
})();

export default app;
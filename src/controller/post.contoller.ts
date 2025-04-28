import { Post } from '../interface/Post';
import { SearchService } from '../interface/SearchService';
import { SimpleSearchService } from '../service/SearchService';
import { LoadPostsData } from '../service/LoadPostsData';
import express from 'express';

const app = express();

(async () => {
  const loadPostsData: LoadPostsData = LoadPostsData.getInstance();
  await loadPostsData.loadData();
  const posts: Post[] = loadPostsData.getPosts();

  const searchService: SearchService = new SimpleSearchService();

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
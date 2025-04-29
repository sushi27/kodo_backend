import { Post, SearchService } from '../interfaces';
import SearchServiceFactory from '../factories/SearchServiceFactory';
import LoadPostsData from '../utils/LoadPostsData';
import express from 'express';

const router = express.Router();
const loadPostsData: LoadPostsData = LoadPostsData.getInstance();
const searchService: SearchService = SearchServiceFactory.createSearchService();

router.get('/search', (req, res) => {
  try {
    const posts = loadPostsData.getPosts();
    const query = req.query.q as string || '';
    const results = searchService.search(query, posts);
    res.json({
      query,
      count: results.length,
      results
    });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({
      error: 'An error occurred while processing the search request'
    });
  }
});

router.get('', (_, res) => {
  try {
    const posts = loadPostsData.getPosts();
    res.json(posts);
  } catch (error) {
    console.error('Error retrieving posts:', error);
    res.status(500).json({
      error: 'An error occurred while retrieving posts'
    });
  }
});

export default router;
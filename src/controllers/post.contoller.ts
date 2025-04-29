import express from 'express';
import PaginationServiceFactory from '../factories/PaginationServiceFactory';
import SearchServiceFactory from '../factories/SearchServiceFactory';
import SortServiceFactory from '../factories/SortServiceFactory';
import LoadPostsData from '../utils/LoadPostsData';
import { validatePaginationParams, validateSortParams } from '../middlewares/validator';
import { PaginationService, Post, QueryParams, SearchService, SortDirection, SortField, SortService } from '../interfaces';


const router = express.Router();
const loadPostsData: LoadPostsData = LoadPostsData.getInstance();

router.get('/search', [validateSortParams, validatePaginationParams], (req: express.Request, res: express.Response) => {
  try {
    const searchService: SearchService = SearchServiceFactory.createSearchService();
    const paginationService: PaginationService = PaginationServiceFactory.createPaginationService();
    const sortService: SortService = SortServiceFactory.createSortService();

    const queryParams: QueryParams = {
      query: req.query.q as string || '',
      sortBy: (req.query.sortBy as SortField) ?? 'name',
      sortOrder: (req.query.sortOrder as SortDirection) || 'asc',
      page: req.query.page ? parseInt(req.query.page as string, 10) : 1,
      pageSize: req.query.pageSize ? parseInt(req.query.pageSize as string, 10) : 10
    };

    const posts = loadPostsData.getPosts();

    const searchResults = searchService.search(queryParams.query, posts);
    const sortedResults = sortService.sort(searchResults, queryParams.sortBy, queryParams.sortOrder);
    const paginationResult = paginationService.paginate(sortedResults, queryParams.page, queryParams.pageSize);
    
    res.json(paginationResult);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({
      error: 'An error occurred while processing the search request'
    });
  }
});

router.get('', [validateSortParams, validatePaginationParams], (req: express.Request, res: express.Response) => {
  try {
    const paginationService: PaginationService = PaginationServiceFactory.createPaginationService();
    const sortService: SortService = SortServiceFactory.createSortService();

    const queryParams: QueryParams = {
      query: req.query.q as string || '',
      sortBy: (req.query.sortBy as SortField) ?? 'name',
      sortOrder: (req.query.sortOrder as SortDirection) || 'asc',
      page: req.query.page ? parseInt(req.query.page as string, 10) : 1,
      pageSize: req.query.pageSize ? parseInt(req.query.pageSize as string, 10) : 10
    };

    const posts = loadPostsData.getPosts();

    const sortedResults = sortService.sort(posts, queryParams.sortBy, queryParams.sortOrder);
    const paginationResult = paginationService.paginate(sortedResults, queryParams.page, queryParams.pageSize);
    
    res.json(paginationResult);
  } catch (error) {
    console.error('Error retrieving posts:', error);
    res.status(500).json({
      error: 'An error occurred while retrieving posts'
    });
  }
});

export default router;
import express from 'express';
import { SimpleSearchService } from './service/SearchService';
import { Post } from './interface/Post';
import fs from 'fs/promises';
import path from 'path';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const searchService = new SimpleSearchService();

let posts: Post[] = [];

const loadData = async () => {
  try {
    const dataPath = path.join(__dirname, 'mock_data.json');
    const data = await fs.readFile(dataPath, 'utf8');
    posts = JSON.parse(data);
    console.log(`Loaded ${posts.length} posts from mock_data.json`);
  } catch (error) {
    console.error('Error loading data:', error);
    posts = [];
  }
};

app.get('/api/search', (req, res) => {
  const query = req.query.q as string || '';
  const results = searchService.search(query, posts);
  res.json({
    query,
    count: results.length,
    results
  });
});

app.get('/api/posts', (_, res) => {
  res.json(posts);
});

(async () => {
  await loadData();
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
})();
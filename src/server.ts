import express from 'express';
import cors from 'cors';
import PostController from './controllers/post.contoller';
import LoadPostsData from './utils/LoadPostsData';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/api/posts', PostController);

const startServer = async () => {
  const postsDataLoader = LoadPostsData.getInstance();
  await postsDataLoader.loadData();
  
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

if (require.main === module) {
  startServer().catch((error) => {
    console.error('Failed to start server:', error);
    process.exit(1);
  });
}
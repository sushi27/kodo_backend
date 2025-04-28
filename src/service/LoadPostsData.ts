import { Post } from '../interface/Post';
import fs from 'fs/promises';
import path from 'path';

let posts: Post[] = [];

class LoadPostsData {
  private static instance: LoadPostsData;

  private constructor() {}

  public static getInstance(): LoadPostsData {
    if (!LoadPostsData.instance) {
      LoadPostsData.instance = new LoadPostsData();
    }
    return LoadPostsData.instance;
  }

  public async loadData() {
    try {
      const dataPath = path.join(__dirname, '..', '..','mock_data.json');
      const data = await fs.readFile(dataPath, 'utf8');
      posts = JSON.parse(data);
      console.log(`Loaded ${posts.length} posts from mock_data.json`);
    } catch (error) {
      console.error('Error loading data:', error);
      posts = [];
    }
  }

  public getPosts() {
    return posts;
  }
}

export {
  LoadPostsData
}
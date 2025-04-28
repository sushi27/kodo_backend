import { expect } from 'chai';
import sinon from 'sinon';
import fs from 'fs/promises';
import path from 'path';
import { LoadPostsData } from './LoadPostsData';
import { Post } from '../interface/Post';

describe('LoadPostsData', () => {
  let sandbox: sinon.SinonSandbox;
  let fsReadFileStub: sinon.SinonStub;
  let consoleLogSpy: sinon.SinonSpy;
  let consoleErrorSpy: sinon.SinonSpy;

  const mockPosts: Post[] = [
    {
      name: 'Test Post 1',
      image: 'https://picsum.photos/640/480',
      description: 'This is a test post',
      dateLastEdited: '2023-01-01T12:00:00.000Z'
    },
    {
      name: 'Test Post 2',
      image: 'https://picsum.photos/640/480',
      description: 'This is another test post',
      dateLastEdited: '2023-01-02T12:00:00.000Z'
    }
  ];

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    fsReadFileStub = sandbox.stub(fs, 'readFile');
    consoleLogSpy = sandbox.spy(console, 'log');
    consoleErrorSpy = sandbox.spy(console, 'error');
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should be a singleton', () => {
    const instance1 = LoadPostsData.getInstance();
    const instance2 = LoadPostsData.getInstance();
    
    expect(instance1).to.equal(instance2);
  });

  it('should load data successfully', async () => {
    fsReadFileStub.resolves(JSON.stringify(mockPosts));
    
    const instance = LoadPostsData.getInstance();
    await instance.loadData();
    
    expect(fsReadFileStub.calledOnce).to.be.true;
    
    const pathArg = fsReadFileStub.firstCall.args[0] as string;
    expect(pathArg.includes('mock_data.json')).to.be.true;
    
    expect(fsReadFileStub.firstCall.args[1]).to.equal('utf8');
    
    const posts = instance.getPosts();
    expect(posts).to.deep.equal(mockPosts);
    
    expect(consoleLogSpy.calledWith(`Loaded ${mockPosts.length} posts from mock_data.json`)).to.be.true;
  });

  it('should handle errors when loading data', async () => {
    const testError = new Error('File not found');
    fsReadFileStub.rejects(testError);
    
    const instance = LoadPostsData.getInstance();
    await instance.loadData();
    
    expect(fsReadFileStub.calledOnce).to.be.true;
    expect(consoleErrorSpy.calledWith('Error loading data:', testError)).to.be.true;
    
    const posts = instance.getPosts();
    expect(posts).to.be.an('array').that.is.empty;
  });

  it('should return the loaded posts', async () => {
    fsReadFileStub.resolves(JSON.stringify(mockPosts));
    
    const instance = LoadPostsData.getInstance();
    await instance.loadData();
    const returnedPosts = instance.getPosts();
    
    expect(returnedPosts).to.deep.equal(mockPosts);
    expect(returnedPosts).to.have.lengthOf(mockPosts.length);
  });
});
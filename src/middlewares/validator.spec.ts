import { expect } from 'chai';
import * as sinon from 'sinon';
import { Request, Response, NextFunction } from 'express';
import { validateSortParams, validatePaginationParams } from './validator';

describe('Validator Middleware', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: sinon.SinonSpy;
  
  beforeEach(() => {
    req = {
      query: {}
    };
    
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returnsThis()
    };
    
    next = sinon.spy();
  });
  
  afterEach(() => {
    sinon.restore();
  });
  
  describe('validateSortParams', () => {
    it('should call next() when no sort params are provided', () => {
      validateSortParams(req as Request, res as Response, next as NextFunction);
      
      expect(next.calledOnce).to.be.true;
      expect((res.status as sinon.SinonStub).called).to.be.false;
    });
    
    it('should call next() when valid sortBy and sortOrder are provided', () => {
      req.query = { sortBy: 'name', sortOrder: 'asc' };
      
      validateSortParams(req as Request, res as Response, next as NextFunction);
      
      expect(next.calledOnce).to.be.true;
      expect((res.status as sinon.SinonStub).called).to.be.false;
    });
    
    it('should handle valid sortBy=dateLastEdited parameter', () => {
      req.query = { sortBy: 'dateLastEdited' };
      
      validateSortParams(req as Request, res as Response, next as NextFunction);
      
      expect(next.calledOnce).to.be.true;
      expect((res.status as sinon.SinonStub).called).to.be.false;
    });
    
    it('should return 400 error when invalid sortBy parameter is provided', () => {
      req.query = { sortBy: 'invalidParam' };
      
      validateSortParams(req as Request, res as Response, next as NextFunction);
      
      expect(next.called).to.be.false;
      expect((res.status as sinon.SinonStub).calledWith(400)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith({
        error: 'Invalid sortBy parameter. Must be "name" or "dateLastEdited".'
      })).to.be.true;
    });
    
    it('should return 400 error when invalid sortOrder parameter is provided', () => {
      req.query = { sortOrder: 'invalidOrder' };
      
      validateSortParams(req as Request, res as Response, next as NextFunction);
      
      expect(next.called).to.be.false;
      expect((res.status as sinon.SinonStub).calledWith(400)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith({
        error: 'Invalid sortOrder parameter. Must be "asc" or "desc".'
      })).to.be.true;
    });
    
    it('should validate both sortBy and sortOrder when both are invalid', () => {
      req.query = { sortBy: 'invalid', sortOrder: 'wrong' };
      
      validateSortParams(req as Request, res as Response, next as NextFunction);
      
      expect(next.called).to.be.false;
      expect((res.status as sinon.SinonStub).calledWith(400)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith({
        error: 'Invalid sortBy parameter. Must be "name" or "dateLastEdited".'
      })).to.be.true;
    });
  });
  
  describe('validatePaginationParams', () => {
    it('should call next() when no pagination params are provided', () => {
      validatePaginationParams(req as Request, res as Response, next as NextFunction);
      
      expect(next.calledOnce).to.be.true;
      expect((res.status as sinon.SinonStub).called).to.be.false;
    });
    
    it('should call next() when valid page and pageSize are provided', () => {
      req.query = { page: '1', pageSize: '10' };
      
      validatePaginationParams(req as Request, res as Response, next as NextFunction);
      
      expect(next.calledOnce).to.be.true;
      expect((res.status as sinon.SinonStub).called).to.be.false;
    });
    
    it('should handle edge case valid values (pageSize=1, pageSize=100)', () => {
      req.query = { page: '1', pageSize: '100' };
      
      validatePaginationParams(req as Request, res as Response, next as NextFunction);
      
      expect(next.calledOnce).to.be.true;
      expect((res.status as sinon.SinonStub).called).to.be.false;
    });
    
    it('should return 400 error when negative page parameter is provided', () => {
      req.query = { page: '-1' };
      
      validatePaginationParams(req as Request, res as Response, next as NextFunction);
      
      expect(next.called).to.be.false;
      expect((res.status as sinon.SinonStub).calledWith(400)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith({
        error: 'Invalid page parameter. Must be a positive integer.'
      })).to.be.true;
    });
    
    it('should return 400 error when page parameter is zero', () => {
      req.query = { page: '0' };
      
      validatePaginationParams(req as Request, res as Response, next as NextFunction);
      
      expect(next.called).to.be.false;
      expect((res.status as sinon.SinonStub).calledWith(400)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith({
        error: 'Invalid page parameter. Must be a positive integer.'
      })).to.be.true;
    });
    
    it('should return 400 error when page parameter is not a number', () => {
      req.query = { page: 'abc' };
      
      validatePaginationParams(req as Request, res as Response, next as NextFunction);
      
      expect(next.called).to.be.false;
      expect((res.status as sinon.SinonStub).calledWith(400)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith({
        error: 'Invalid page parameter. Must be a positive integer.'
      })).to.be.true;
    });
    
    it('should return 400 error when pageSize parameter is too small', () => {
      req.query = { pageSize: '0' };
      
      validatePaginationParams(req as Request, res as Response, next as NextFunction);
      
      expect(next.called).to.be.false;
      expect((res.status as sinon.SinonStub).calledWith(400)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith({
        error: 'Invalid pageSize parameter. Must be an integer between 1 and 100.'
      })).to.be.true;
    });
    
    it('should return 400 error when pageSize parameter is too large', () => {
      req.query = { pageSize: '101' };
      
      validatePaginationParams(req as Request, res as Response, next as NextFunction);
      
      expect(next.called).to.be.false;
      expect((res.status as sinon.SinonStub).calledWith(400)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith({
        error: 'Invalid pageSize parameter. Must be an integer between 1 and 100.'
      })).to.be.true;
    });
    
    it('should return 400 error when pageSize parameter is not a number', () => {
      req.query = { pageSize: 'large' };
      
      validatePaginationParams(req as Request, res as Response, next as NextFunction);
      
      expect(next.called).to.be.false;
      expect((res.status as sinon.SinonStub).calledWith(400)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith({
        error: 'Invalid pageSize parameter. Must be an integer between 1 and 100.'
      })).to.be.true;
    });
    
    it('should validate both page and pageSize when both are invalid', () => {
      req.query = { page: '-5', pageSize: '500' };
      
      validatePaginationParams(req as Request, res as Response, next as NextFunction);
      
      expect(next.called).to.be.false;
      expect((res.status as sinon.SinonStub).calledWith(400)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith({
        error: 'Invalid page parameter. Must be a positive integer.'
      })).to.be.true;
    });
  });
});
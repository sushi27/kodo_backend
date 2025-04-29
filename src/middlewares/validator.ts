import { Request, Response, NextFunction } from 'express';

const validateSortParams = (req: Request, res: Response, next: NextFunction) => {
  const sortBy = req.query.sortBy as string;
  const sortOrder = req.query.sortOrder as string;
  
  if (sortBy && sortBy !== 'name' && sortBy !== 'dateLastEdited') {
    return res.status(400).json({
      error: 'Invalid sortBy parameter. Must be "name" or "dateLastEdited".'
    });
  }
  
  if (sortOrder && sortOrder !== 'asc' && sortOrder !== 'desc') {
    return res.status(400).json({
      error: 'Invalid sortOrder parameter. Must be "asc" or "desc".'
    });
  }
  
  next();
};

const validatePaginationParams = (req: Request, res: Response, next: NextFunction) => {
  const page = parseInt(req.query.page as string, 10);
  const pageSize = parseInt(req.query.pageSize as string, 10);
  
  if (req.query.page && (isNaN(page) || page < 1)) {
    return res.status(400).json({
      error: 'Invalid page parameter. Must be a positive integer.'
    });
  }
  
  if (req.query.pageSize && (isNaN(pageSize) || pageSize < 1 || pageSize > 100)) {
    return res.status(400).json({
      error: 'Invalid pageSize parameter. Must be an integer between 1 and 100.'
    });
  }
  
  next();
};

export {
  validateSortParams,
  validatePaginationParams
}
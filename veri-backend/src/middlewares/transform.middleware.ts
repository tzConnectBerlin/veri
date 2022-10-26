import { HttpException } from '@/exceptions/HttpException';

const transformMiddleware = (
  value: string | 'body' | 'query' | 'params' = 'body',
  field: string
) => {
  return (req, res, next) => {
    try {
      const gen_array =
        req[value][field] && req[value][field].split(',').map(String);
      req[value][field] = gen_array;
      next();
    } catch {
      next(new HttpException(400, `${field} must be correctly uploaded`));
    }
  };
};

export default transformMiddleware;

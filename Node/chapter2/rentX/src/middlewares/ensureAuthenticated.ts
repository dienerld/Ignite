import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { AppError } from '../errors/AppError';
import { UsersRepository } from '../modules/accounts/repositories/implementations/UsersRepository';

interface IPayload {
  sub: string;
}

async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token missing', 401);
  }

  const [, token] = authHeader.split(' ');
  try {
    const { sub: user_id } = verify(token, 'privatekey')as IPayload;
    const repo = new UsersRepository();

    const user = await repo.findById(user_id);

    if (!user) {
      throw new AppError('User does not exist', 401);
    }
    request.user = {
      id: user_id,
    };

    return next();
  } catch (error) {
    throw new AppError('Invalid Token', 401);
  }
}

export { ensureAuthenticated };

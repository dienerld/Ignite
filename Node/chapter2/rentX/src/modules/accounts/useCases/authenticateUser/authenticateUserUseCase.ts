import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../errors/AppError';
import { IUsersRepository } from '../../repositories/IUsersRepository';

interface IRequest{
  email: string;
  password: string;
}

interface IResponse {
  user: {name: string, email: string},
  token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private readonly usersRepository: IUsersRepository
  ) {}
  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Email or password Incorrect');
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError('Email or password Incorrect');
    }

    const token = sign({}, 'privatekey', {
      subject: user.id,
      expiresIn: '1d'
    });

    return { token, user: { name: user.name, email: user.email } };
  }
}

export { AuthenticateUserUseCase };
import { getRepository, Repository } from 'typeorm';

import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

class UsersRepository implements IUsersRepository {
  private repo: Repository<User>;
  constructor() {
    this.repo = getRepository(User);
  }

  async findById(id: string): Promise<User> {
    const user = await this.repo.findOneOrFail({ id });

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repo.findOneOrFail({ email });

    return user;
  }

  async create(data: ICreateUserDTO): Promise<void> {
    const user = this.repo.create(data);

    await this.repo.save(user);
  }
}

export { UsersRepository };

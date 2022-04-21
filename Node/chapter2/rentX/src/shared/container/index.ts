import { container } from 'tsyringe';

// accounts/user
import { UsersRepository } from '../../modules/accounts/repositories/implementations/UsersRepository';
import { IUsersRepository } from '../../modules/accounts/repositories/IUsersRepository';

// cars/categories
import { ICategoriesRepository } from '../../modules/cars/repositories/ICategoriesRepository';
import { CategoriesRepository } from '../../modules/cars/repositories/implementations/CategoriesRepository';

// cars/specifications
import { SpecificationsRepository } from '../../modules/cars/repositories/implementations/SpecificationsRepository';
import { ISpecificationsRepository } from '../../modules/cars/repositories/ISpecificationsRepository';

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository', CategoriesRepository
);

container.registerSingleton<ISpecificationsRepository>(
  'SpecificationsRepository', SpecificationsRepository
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository', UsersRepository
);

export { container };

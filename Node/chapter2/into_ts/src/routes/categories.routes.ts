import { Request, Response, Router } from 'express';
import { CategoryRepository } from '../repositories/CategoriesRepository';
import { CreateCategoryService } from '../service/CreateCategoryService';

const categoriesRoutes = Router();
const categoriesRepository = new CategoryRepository();

categoriesRoutes.post('/', (request: Request, response: Response) => {
  const { name, description } = request.body;
  const createCategoryService = new CreateCategoryService(categoriesRepository);

  createCategoryService.execute({ name, description });

  return response.status(201).send();
});

categoriesRoutes.get('/', (request: Request, response: Response) => {
  const list = categoriesRepository.list();

  return response.json(list);
});
export { categoriesRoutes };

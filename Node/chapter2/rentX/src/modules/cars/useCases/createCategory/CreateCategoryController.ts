import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

class CreateCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    const createCategoryService = container.resolve(CreateCategoryUseCase);
    await createCategoryService.execute({ name, description });

    return response.status(201).send();
  }
}

export { CreateCategoryController };

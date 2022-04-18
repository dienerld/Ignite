import { Request, Response } from 'express';
import { CreateSpecificationUseCase } from './CreateSpecificationUseCase';

class CreateSpecificationController {
  constructor(private readonly createSpecificationUsCase: CreateSpecificationUseCase) {}

  handle(request: Request, response: Response): Response {
    const { name, description } = request.body;
    this.createSpecificationUsCase.execute({ name, description });

    return response.status(201).send();
  }
}

export { CreateSpecificationController };

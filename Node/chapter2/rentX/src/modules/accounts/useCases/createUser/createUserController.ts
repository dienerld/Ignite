import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { createUserUSeCase } from './createUserUSeCase';

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      name, driver_license, email, password
    }: ICreateUserDTO = request.body;
    const createUserUseCase = container.resolve(createUserUSeCase);

    await createUserUseCase.execute({
      name, driver_license, email, password
    });

    return response.status(201).send();
  }
}

export { CreateUserController };

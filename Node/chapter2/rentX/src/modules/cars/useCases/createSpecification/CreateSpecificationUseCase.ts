import { ISpecificationRepository } from '../../repositories/ISpecificationRepository';

interface IRequest {
  name: string;
  description: string;
}

class CreateSpecificationUseCase {
  constructor(private readonly specificationRepository: ISpecificationRepository) {}

  execute({ description, name }: IRequest): void {
    const specAlreadyExists = this.specificationRepository.findByName(name);

    if (specAlreadyExists) {
      throw new Error(`Specification ${name} already exists`);
    }
    this.specificationRepository.create({ name, description });
  }
}

export { CreateSpecificationUseCase };

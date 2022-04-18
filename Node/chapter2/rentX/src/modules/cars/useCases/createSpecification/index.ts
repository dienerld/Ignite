import { SpecificationRepository } from '../../repositories/implementations/SpecificationRepository';
import { CreateSpecificationController } from './CreateSpecificationController';
import { CreateSpecificationUseCase } from './CreateSpecificationUseCase';

const specificationRepository = new SpecificationRepository();
const createSpecificationUsCase = new CreateSpecificationUseCase(specificationRepository);

const createSpecificationController = new CreateSpecificationController(createSpecificationUsCase);

export { createSpecificationController };

import { Specification } from '../entities/Specification';

interface ICreateSpecificationDTO {
  name: string;
  description: string;
}
interface ISpecificationRepository {
  create(data: ICreateSpecificationDTO): void;
  findByName(name: string): Specification;

}

export { ICreateSpecificationDTO, ISpecificationRepository };

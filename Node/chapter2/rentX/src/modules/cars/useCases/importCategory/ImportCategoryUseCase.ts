import fs from 'fs';
import { parse } from 'csv-parse';

import { container } from 'tsyringe';
import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository';

interface IImportCategory {
  name: string;
  description: string;
}

class ImportCategoryUseCase {
  private loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise<IImportCategory[]>((resolve, reject) => {
      const categories: IImportCategory[] = [];

      const stream = fs.createReadStream(file.path);
      const parseFile = parse();
      stream.pipe(parseFile);

      parseFile.on('data', async (line) => {
        const [name, description] = line;
        categories.push({ name, description });
      })
        .on('end', () => {
          fs.promises.unlink(file.path);

          return resolve(categories);
        })
        .on('error', (err) => reject(err));
    });
  }
  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);

    categories.map(async (category) => {
      const { name, description } = category;

      const categoriesRepository = container.resolve(CategoriesRepository);
      const existsCategory = await categoriesRepository.findByName(name);

      if (!existsCategory) {
        await categoriesRepository.create({ name, description });
      }
    });
  }
}

export { ImportCategoryUseCase };

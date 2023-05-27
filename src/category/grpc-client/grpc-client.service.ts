import { Inject, Injectable } from '@nestjs/common';
import { EntityNotFoundError, Repository } from 'typeorm';
import { CategoryDto } from '../dto/category.dto';
import { Category } from '../entities/category.entity';

@Injectable()
export class GrpcClientService {
  constructor(
    @Inject('CategoryRepository')
    private categoryRepository: Repository<Category>,
  ) {}

  async createCategory(data: {
    name: string;
    description: string;
  }): Promise<Category> {
    return this.categoryRepository.save(data);
  }

  async getCategory(id: number): Promise<Category> {
    return this.categoryRepository.findOne({ where: { id } });
  }

  async listCategories(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async update(id: number, updateCategoryDto: CategoryDto): Promise<Category> {
    const updateResult = await this.categoryRepository.update(
      id,
      updateCategoryDto,
    );
    if (!updateResult.affected) {
      throw new EntityNotFoundError(Category, id);
    }
    return this.categoryRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    const deleteResult = await this.categoryRepository.delete(id);
    if (!deleteResult.affected) {
      throw new EntityNotFoundError(Category, id);
    }
  }
}

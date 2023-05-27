import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CategoryDto, CategoryList } from '../dto/category.dto';
import { Category } from '../entities/category.entity';
import { GrpcClientService } from '../grpc-client/grpc-client.service';

@Controller('grpc-server')
export class GrpcServerController {
  constructor(private categoryService: GrpcClientService) {}

  @GrpcMethod('CategoryService', 'CreateCategory')
  async createCategory(data: CategoryDto): Promise<Category> {
    return this.categoryService.createCategory(data);
  }

  @GrpcMethod('CategoryService', 'GetCategory')
  async getCategory(data: { id: number }): Promise<Category> {
    return this.categoryService.getCategory(data.id);
  }

  @GrpcMethod('CategoryService', 'ListCategories')
  async listCategories(): Promise<CategoryList> {
    const res = await this.categoryService.listCategories();
    return { data: res };
  }

  @GrpcMethod('CategoryService', 'Update')
  async updateCategory(data: {
    id: number;
    name: string;
    description: string;
  }): Promise<Category> {
    const { id, description, name } = data;
    return this.categoryService.update(id, {
      description,
      name,
    });
  }

  @GrpcMethod('CategoryService', 'Delete')
  async remove(data: { id: number }): Promise<void> {
    return await this.categoryService.delete(data.id);
  }
}

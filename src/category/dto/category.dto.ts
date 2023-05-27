import { IsNotEmpty, IsString } from 'class-validator';
import { Category } from '../entities/category.entity';

export class CategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}

export class CategoryList {
  data: Category[];
}

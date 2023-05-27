import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { DataSource } from 'typeorm';
import { Category } from './entities/category.entity';
import { GrpcServerController } from './grpc-server/grpc-server.controller';
import { GrpcClientService } from './grpc-client/grpc-client.service';

const categoryProviders = [
  {
    provide: 'CategoryRepository',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Category),
    inject: ['DATA_SOURCE'],
  },
];

@Module({
  imports: [DatabaseModule],
  controllers: [GrpcServerController],
  providers: [GrpcClientService, ...categoryProviders],
})
export class CategoryModule {}

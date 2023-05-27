import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { join } from 'path';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { GrpcClientService } from '../src/category/grpc-client/grpc-client.service';

describe('gRPC server', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.connectMicroservice<MicroserviceOptions>({
      transport: Transport.GRPC,
      options: {
        url: '0.0.0.0:6000',
        package: 'category_course',
        protoPath: join(__dirname, '../src/proto/course_category.proto'),
      },
    });

    await app.init();
    await app.startAllMicroservices();
  });

  it('Call createCategory', async () => {
    const categoryService = app.get<GrpcClientService>(GrpcClientService);

    try {
      const result = await categoryService.createCategory({
        description: 'Category',
        name: 'Category',
      });
      console.log('---', result);
    } catch (err) {
      console.log('erro', err);
    }
  });
});

import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.GRPC,
    options: {
      url: '0.0.0.0:6000',
      package: 'category_course',
      protoPath: join(__dirname, 'proto', 'course_category.proto'),
    },
  });

  await app.listen();
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './shared/filters/global-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT;

  app.useGlobalFilters(new GlobalExceptionFilter());

  await app.listen(port, () => console.log(`Application is listening on port ${port}.`));
}
bootstrap();

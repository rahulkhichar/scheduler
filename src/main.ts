import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  // app.useGlobalInterceptors(new ThrottlingInterceptor());
  // app.useGlobalPipes(new ValidationPipe({ transform: true }));
  const port = process.env.PORT || 3001;
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
  await app.listen(port ?? 3000);
}
bootstrap();

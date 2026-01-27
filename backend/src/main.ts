import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // CORS habilitado
  const port = process.env.PORT ?? 3001;
  await app.listen(port);
  console.log(`Aplicación NestJS ejecutándose en el puerto ${port}`);
}
bootstrap();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Enable CORS to allow requests from frontend (e.g., React on port 3000)
  app.enableCors({
    origin: 'http://localhost:3000', // your frontend URL
    credentials: true, // optional: only needed if you're using cookies or auth headers
  });

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();

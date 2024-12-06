import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configDotenv } from 'dotenv';
configDotenv();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.LOCAL_APP_PORT);
}
bootstrap();

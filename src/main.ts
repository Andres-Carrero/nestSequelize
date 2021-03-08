import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

export const port = 3030
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors();
  await app.listen(port);
  
  
  console.log('ejecutando en el puerto: '+ port);
  
}
bootstrap();

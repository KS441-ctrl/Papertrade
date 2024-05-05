import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()

  // Serve static files from the Angular dist directory
  app.use(express.static(join(__dirname, '../angular/dist/angular')));

  // Configure fallback route to serve index.html
  app.use('*', (req, res) => {
    res.sendFile(join(__dirname, '../angular/dist/angular/index.html'));
  });

  await app.listen(3000);
}
bootstrap();

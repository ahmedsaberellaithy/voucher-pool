import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import rateLimit from 'express-rate-limit';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ResponseFormat } from './infrastructure/interceptors/response.interceptor';

async function bootstrap() {
  const env = process.env.NODE_ENV;

  const app = await NestFactory.create(AppModule);

  /**
   * Basic use for rate Limiter, could be covered in a proper configuration file
   * More Info: https://www.npmjs.com/package/express-rate-limit
   */
  app.use(
    rateLimit({
      windowMs: 1000 * 5 * 60,
      max: 1000, // 1000 requests por windowMs
      message:
        'Too many request created from this IP, please try again after 5 minutes',
    }),
  );

  // pipes
  app.useGlobalPipes(new ValidationPipe());

  // base routing
  app.setGlobalPrefix('api_v1');

  // swagger config - Preferred to be moved into a separate config file and only be called here.
  if (env !== 'production') {
    const config = new DocumentBuilder()
      .addBearerAuth()
      .setTitle('Voucher Pool, hiring task for HOLO.')
      .setDescription('Versioned API to create and modify vouchers')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config, {
      extraModels: [ResponseFormat],
      deepScanRoutes: true,
    });
    SwaggerModule.setup('api', app, document);
  }
  await app.listen(3000);
}
bootstrap();

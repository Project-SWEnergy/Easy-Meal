import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes';
import * as cookieParser from 'cookie-parser';
import { HttpExceptionFilter } from 'filters/http-exception.filter';
import { SwaggerModule, DocumentBuilder, SwaggerDocumentOptions } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Easy Meal')
    .setDescription('Easy Meal API description')
    .setVersion('1.0.0')
    .build();
  const options: SwaggerDocumentOptions = {
    operationIdFactory: (_: string, methodKey: string) => methodKey,
  };

  const dotenv = require('dotenv');

  dotenv.config();

  app.useGlobalPipes(new ValidationPipe(
    {
      whitelist: true
    }
  ));

  app.use(cookieParser());
  const allowedOrigins = [
    'http://127.0.0.1',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:4200',
    'http://localhost',
    'http://localhost:3000',
    'http://localhost:4200',
  ];

  const cors = require('cors');
  app.use(cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  }));
  app.useGlobalFilters(new HttpExceptionFilter());

  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT, "0.0.0.0");
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
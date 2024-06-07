import './env';

import { Logger, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';
import * as nocache from 'nocache';
import { AppModule } from '~/app.module';
import { serverConfig } from '~/config';
import { SwaggerSetup } from '~/swagger.setup';

const swaggerSetup = new SwaggerSetup();

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api', {
    exclude: ['health', 'admin/(.*)']
  });

  app.enableVersioning({
    type: VersioningType.URI
  });

  swaggerSetup.install(app);

  app.disable('x-powered-by', 'X-Powered-By');
  app.use(helmet());
  app.use(nocache.default());
  app.enableCors();

  await app.listen(serverConfig.port);
  Logger.log(`Application is running on: ${serverConfig.port}`);
}
bootstrap();

import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod
} from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';

import { RequestContextMiddleWare } from '~common/middlewares/requestContext';
import { GlobalValidationPipe } from '~common/pipe/global-validation.pipe';
import { CrawlModule } from '~core/crawl/crawl.module';
import { SharedModule } from '~shared/shared.module';

const modules = [SharedModule, CrawlModule];

@Module({
  imports: modules,
  providers: [
    {
      provide: APP_PIPE,
      useClass: GlobalValidationPipe
    }
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(RequestContextMiddleWare)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}

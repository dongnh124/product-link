import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { KeywordRepository } from '~core/crawl/repository/keyword.repository';
import { KeywordEntity } from '~core/crawl/repository/keyword.entity';
import { KeywordService } from '~core/crawl/domain/keyword.service';
import { CrawlController } from '~core/crawl/controller/crawl.controller';

@Module({
  imports: [TypeOrmModule.forFeature([KeywordEntity])],
  controllers: [CrawlController],
  providers: [KeywordService, KeywordRepository],
  exports: [KeywordService]
})
export class CrawlModule {}

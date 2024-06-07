import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { KeywordService } from '~core/crawl/domain/keyword.service';
import { ApiResponseSchema } from '~common/decorator/api-response.decorator';
import { StartCrawlRequestDto } from '~core/crawl/domain/dto/request/start-crawl.request.dto';
import { ApiResponse } from '~common/utils/base.response';
import { StartCrawlResponseDto } from '~core/crawl/controller/dto/response/start-crawl.response.dto';

@ApiTags('crawl')
@Controller('crawl')
export class CrawlController {
  constructor(protected readonly keywordService: KeywordService) {}

  @Post()
  @ApiResponseSchema()
  async startCrawl(
    @Body() dto: StartCrawlRequestDto
  ): Promise<ApiResponse<StartCrawlResponseDto>> {
    const result = await this.keywordService.start(dto);
    return ApiResponse.success(StartCrawlResponseDto.from(result));
  }

  @Get()
  @ApiResponseSchema()
  async getAll(): Promise<ApiResponse<StartCrawlResponseDto[]>> {
    const result = await this.keywordService.getAll();
    return ApiResponse.success(
      result.map((r) => StartCrawlResponseDto.from(r))
    );
  }
}

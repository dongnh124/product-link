import { BadRequestException } from '@nestjs/common';

export class FailToCrawlError extends BadRequestException {
  constructor() {
    super('FAIL_TO_CRAWL_ERROR');
  }
}

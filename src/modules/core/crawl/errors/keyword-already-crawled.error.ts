import { BadRequestException } from '@nestjs/common';

export class KeywordAlreadyCrawledError extends BadRequestException {
  constructor() {
    super('KEYWORD_ALREADY_CRAWLED_ERROR');
  }
}

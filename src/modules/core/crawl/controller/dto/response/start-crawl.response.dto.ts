import { IsNotEmpty } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { Keyword } from '~core/crawl/domain/keyword.domain';

export class StartCrawlResponseDto {
  @ApiProperty({
    type: 'string',
    required: true,
    description: 'Keyword use to search',
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
  })
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    type: 'string',
    required: true,
    description: 'Keyword use to search',
    example: 'IPhone 15 promax'
  })
  @IsNotEmpty()
  keyword: string;

  @ApiProperty({
    type: Array<string>,
    required: true,
    description: 'Responses of keyword',
    example: [
      'https://www.thegioididong.com/dtdd/iphone-15-pro-max',
      'https://hoanghamobile.com/dien-thoai-di-dong/apple-iphone-15-pro-max-256gb-chinh-hang-vn-a'
    ]
  })
  @IsNotEmpty()
  links: string[];

  static from(dto: Keyword): StartCrawlResponseDto {
    const res = new StartCrawlResponseDto();
    res.id = dto.id.value;
    res.keyword = dto.keyword;
    res.links = dto.links;
    return res;
  }
}

import { IsNotEmpty } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class StartCrawlRequestDto {
  @ApiProperty({
    type: 'string',
    required: true,
    description: 'Keyword use to search',
    example: 'IPhone 15 promax'
  })
  @IsNotEmpty()
  keyword: string;
}

import { ApiProperty } from '@nestjs/swagger';

export class ApiResponse<T = unknown> {
  @ApiProperty({
    type: 'string',
    format: 'uuid'
  })
  success: boolean;

  @ApiProperty({
    type: 'string',
    format: 'uuid'
  })
  correlationId?: string;

  @ApiProperty()
  result?: T;

  @ApiProperty()
  message?: string | string[];

  static success<T>(result?: T): ApiResponse<T> {
    return {
      success: true,
      result
    };
  }
}

import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform
} from '@nestjs/common';

@Injectable()
export class OnlyOneOfPipe implements PipeTransform {
  constructor(
    private readonly field1: string,
    private readonly field2: string
  ) {}

  transform(value: Record<string, any>, metadata: ArgumentMetadata) {
    if (value[this.field1] && value[this.field2]) {
      throw new BadRequestException(
        `Either ${this.field1} or ${this.field2} should be populated. Not both. Please adjust the payload`
      );
    }
    return value;
  }
}

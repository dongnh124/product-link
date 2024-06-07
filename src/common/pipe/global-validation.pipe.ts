/* eslint-disable @typescript-eslint/ban-types */
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators';
import { GlobalValidationError } from '~common/pipe/errors/global-validation.error';

@Injectable()
export class GlobalValidationPipe implements PipeTransform<unknown> {
  async transform(
    value: unknown,
    { metatype }: ArgumentMetadata
  ): Promise<unknown> {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToInstance(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new GlobalValidationError(errors);
    }
    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}

import { BadRequestException } from '@nestjs/common';

export class InvalidUuidError extends BadRequestException {
  constructor() {
    super('INVALID_UUID_ERR');
  }
}

export class InvalidNumberError extends BadRequestException {
  constructor() {
    super('INVALID_NUMBER_ERR');
  }
}

export class DataNotAllowedError extends BadRequestException {
  constructor(field?: string) {
    super(field ? `DATA_NOT_ALLOWED_ERR: ${field}` : 'DATA_NOT_ALLOWED_ERR');
  }
}

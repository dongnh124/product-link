import { ValidationError } from 'class-validator';

import { BadRequestException } from '@nestjs/common';

export class GlobalValidationError extends BadRequestException {
  errors: ValidationError[];

  constructor(errors: ValidationError[]) {
    const errorMsg = {};
    let isPasswordFieldExist = false;

    errors.forEach((error) => {
      // Custome error message for invalid password case
      if (
        (error.property === 'password' || error.property === 'newPassword') &&
        error.constraints.StrongPassword !== undefined
      )
        isPasswordFieldExist = true;
      if (error.children && error.children.length) {
        error.children.forEach((childErr) => {
          errorMsg[childErr.property] = Object.values(childErr.constraints);
        });
      }
      if (error.constraints) {
        errorMsg[error.property] = Object.values(error.constraints);
        if (
          isPasswordFieldExist &&
          (error.property === 'password' || error.property === 'newPassword')
        )
          errorMsg[error.property] = error.constraints?.StrongPassword;
      }
    });
    super({
      message: 'Some fields did not validate, please check.',
      result: {
        details: errorMsg
      }
    });
    this.errors = errors;
  }
}

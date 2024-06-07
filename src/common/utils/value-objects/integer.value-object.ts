import { InvalidNumberError } from '~common/errors/common.error';
import { DomainPrimitive, ValueObject } from '~common/utils/base.value-object';

export class Integer extends ValueObject<number> {
  constructor(value: number) {
    super({ value });
  }

  public get value(): number {
    return this.props.value;
  }

  protected validate({ value }: DomainPrimitive<number>): void {
    if (value && Number.isNaN(value)) {
      throw new InvalidNumberError();
    }

    if (value && !Number.isInteger(value)) {
      throw new InvalidNumberError();
    }
  }
}

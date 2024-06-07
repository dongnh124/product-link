import { validate } from 'uuid';
import { DomainPrimitive } from '~common/utils/base.value-object';
import { InvalidUuidError } from '~common/errors/common.error';
import { Uuid } from '~common/utils/value-objects/uuid.value-object';

export class KeywordId extends Uuid {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(value: string) {
    super(value);
  }

  static generate(): KeywordId {
    return new KeywordId(Uuid.generate().value);
  }

  protected validate({ value }: DomainPrimitive<string>): void {
    if (!validate(value)) {
      throw new InvalidUuidError();
    }
  }
}

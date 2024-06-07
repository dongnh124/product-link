import { v4 as uuidV4, validate } from 'uuid';

import { DomainPrimitive } from '~common/utils/base.value-object';
import { Id } from '~common/utils//value-objects/id.value-object';
import { InvalidUuidError } from '~common/errors/common.error';

export class Uuid extends Id {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(value: string) {
    super(value);
  }

  /**
   * Returns new ID instance with randomly generated ID value
   * @static
   * @return {*}  {ID}
   * @memberof ID
   */
  static generate(): Uuid {
    return new Uuid(uuidV4());
  }

  protected validate({ value }: DomainPrimitive<string>): void {
    if (!validate(value)) {
      throw new InvalidUuidError();
    }
  }
}

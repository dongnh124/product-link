import { DateTime } from 'luxon';

import { DomainShield } from '~common/utils/domain.shield';
import { convertPropsToObject } from '~common/utils/convert-props-to-object.util';

export type Primitives = string | number | boolean;

export type LibrarySpecifics = DateTime; // Put your library specific type that you consider as "primitive" types in our project here

export type AllowedValueObjectProps = Primitives | Date | LibrarySpecifics;

export interface DomainPrimitive<T extends AllowedValueObjectProps> {
  value: T;
}

type ValueObjectProps<T> = T extends AllowedValueObjectProps
  ? DomainPrimitive<T>
  : T;

export abstract class ValueObject<T> {
  protected readonly props: ValueObjectProps<T>;

  constructor(props: ValueObjectProps<T>) {
    this.checkIfEmpty(props);

    this.validate(props);

    this.props = props;
  }

  protected abstract validate(props: ValueObjectProps<T>): void;

  static isValueObject(obj: unknown): obj is ValueObject<unknown> {
    return obj instanceof ValueObject;
  }

  /**
   *  Check if two Value Objects are equal. Checks structural equality.
   * @param vo ValueObject
   */
  public equals(vo?: ValueObject<T>): boolean {
    if (vo === null || vo === undefined) {
      return false;
    }

    return JSON.stringify(this) === JSON.stringify(vo);
  }

  /**
   * Unpack a value object to get its raw properties
   */
  public unpack(): T {
    if (this.isDomainPrimitive(this.props)) {
      return this.props.value;
    }

    const propsCopy = convertPropsToObject(this.props);

    return Object.freeze(propsCopy);
  }

  private checkIfEmpty(props: ValueObjectProps<T>): void {
    if (
      DomainShield.isEmpty(props) ||
      (this.isDomainPrimitive(props) && DomainShield.isEmpty(props.value))
    ) {
      // TODO: Throw error
    }
  }

  private isDomainPrimitive(
    obj: unknown
  ): obj is DomainPrimitive<T & (Primitives | Date)> {
    if (Object.prototype.hasOwnProperty.call(obj, 'value')) {
      return true;
    }

    return false;
  }
}

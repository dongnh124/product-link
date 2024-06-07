/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-restricted-syntax */
import { BaseDomain } from '~common/utils/base.domain';
import { ValueObject } from '~common/utils/base.value-object';

function isEntity(obj: unknown): obj is BaseDomain<unknown, any> {
  /**
   * 'instanceof Entity' causes error here for some reason.
   * Probably creates some circular dependency. This is a workaround
   * until I find a solution :)
   */
  return (
    Object.prototype.hasOwnProperty.call(obj, 'toObject') &&
    Object.prototype.hasOwnProperty.call(obj, 'id') &&
    ValueObject.isValueObject((obj as BaseDomain<unknown, any>).id)
  );
}

function convertToPlainObject(item: any): any {
  if (ValueObject.isValueObject(item)) {
    return item.unpack();
  }
  if (isEntity(item)) {
    return item.toObject();
  }
  return item;
}

/**
 * Converts Entity/Value Objects props to a plain object.
 * Useful for testing and debugging.
 * @param props
 */
export function convertPropsToObject(props: any): any {
  const propsCopy = { ...props };

  // eslint-disable-next-line guard-for-in
  for (const prop in propsCopy) {
    if (Array.isArray(propsCopy[prop])) {
      propsCopy[prop] = (propsCopy[prop] as Array<unknown>).map((item) =>
        convertToPlainObject(item)
      );
    }
    propsCopy[prop] = convertToPlainObject(propsCopy[prop]);
  }

  return propsCopy;
}

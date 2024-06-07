/* eslint-disable no-underscore-dangle */
import { DateTime } from 'luxon';

import { DomainShield } from '~common/utils/domain.shield';
import { Id } from '~common/utils/value-objects/id.value-object';
import { convertPropsToObject } from '~common/utils/convert-props-to-object.util';
import { DataNotAllowedError } from '~common/errors/common.error';

export interface IDomainProps {
  createdAt?: DateTime;
  createdBy?: string;

  modifiedAt?: DateTime;
  modifiedBy?: string;

  deletedAt?: DateTime;
}

export interface BaseDomainProps<IdProp extends Id> {
  id: IdProp;

  createdAt: DateTime;

  modifiedAt: DateTime;

  deletedAt?: DateTime;

  createdBy?: string;
}

export interface CreateDomainProps<T, IdProp extends Id> {
  id: IdProp;

  props: T;

  createdAt?: DateTime;
  modifiedBy?: string;
  modifiedAt?: DateTime;
  deletedAt?: DateTime;
  createdBy?: string;
}

export abstract class BaseDomain<DomainProps, IdProp extends Id> {
  protected constructor({
    id,
    props,
    createdAt,
    modifiedAt,
    deletedAt,
    createdBy
  }: CreateDomainProps<DomainProps, IdProp>) {
    this._id = id;
    this._createdAt = createdAt;
    this._modifiedAt = modifiedAt;
    this._deletedAt = deletedAt;
    this._createdBy = createdBy;

    this.validateProps(props);

    this.props = props;

    this.validate();
  }

  protected readonly props: DomainProps;

  // ID is set in the entity to support different ID types
  protected readonly _id: IdProp;

  private readonly _createdAt: DateTime;

  private _modifiedBy: string;

  private readonly _modifiedAt: DateTime;

  private readonly _deletedAt: DateTime;

  private _createdBy: string;

  get id(): IdProp {
    return this._id;
  }

  get createdAt(): DateTime {
    return this._createdAt;
  }

  get modifiedAt(): DateTime {
    return this._modifiedAt;
  }

  set modifiedBy(val: string) {
    this._modifiedBy = val;
  }

  get deletedAt(): DateTime {
    return this._deletedAt;
  }

  get createdBy(): string {
    return this._createdBy;
  }

  set createdBy(val: string) {
    this._createdBy = val;
  }

  static isEntity(entity: unknown): entity is BaseDomain<unknown, Id> {
    return entity instanceof BaseDomain;
  }

  /**
   * Returns current **copy** of entity's props.
   * Modifying entity's state won't change previously created
   * copy returned by this method since it doesn't return a reference.
   * If a reference to a specific property is needed create a getter in parent class.
   *
   * @return {*}  {Props & EntityProps}
   * @memberof Entity
   */
  public getPropsCopy(): DomainProps & BaseDomainProps<IdProp> {
    const propsCopy = {
      id: this._id,
      createdAt: this._createdAt,
      modifiedAt: this._modifiedAt,
      createdBy: this._createdBy,
      ...this.props
    };

    return Object.freeze(propsCopy);
  }

  /**
   * Convert an Entity and all sub-entities/Value Objects it
   * contains to a plain object with primitive types. Can be
   * useful when logging an entity during testing/debugging
   */
  public toObject(): unknown {
    const plainProps = convertPropsToObject(this.props);

    const result = {
      id: this._id.value,
      createdAt: this._createdAt,
      createdBy: this._createdBy,
      updatedAt: this._modifiedAt,
      modifiedBy: this._modifiedBy,
      ...plainProps
    };

    return Object.freeze(result);
  }

  /**
   * Validate invariant (policies and conditions)
   */
  public abstract validate(): void;

  private validateProps(props: DomainProps): void {
    const maxProps = 200;

    if (DomainShield.isEmpty(props)) {
      throw new DataNotAllowedError();
    }

    if (typeof props !== 'object') {
      throw new DataNotAllowedError();
    }

    if (Object.keys(props).length > maxProps) {
      throw new DataNotAllowedError();
    }
  }
}

import { Column, Entity } from 'typeorm';

import { BaseEntity } from '~common/utils/base.entity';

@Entity()
export class KeywordEntity extends BaseEntity {
  constructor(props?: KeywordEntity) {
    super();

    // if (props && !props.createdAt) delete props.createdAt;

    Object.assign(this, props);
  }

  @Column({
    length: 255,
    nullable: false,
    unique: true,
    name: 'keyword'
  })
  keyword?: string;

  @Column({
    nullable: true,
    name: 'links'
  })
  links?: string;
}

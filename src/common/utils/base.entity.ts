import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

export class BaseEntity {
  constructor(props?: unknown) {
    if (props) {
      Object.assign(this, props);
    }
  }

  @ApiProperty({
    type: 'string',
    format: 'uuid',
    required: true
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    select: true
  })
  createdAt?: Date;

  @Column({
    nullable: true,
    select: true
  })
  createdBy?: string;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    select: true
  })
  modifiedAt?: Date;

  @DeleteDateColumn({
    type: 'timestamptz',
    select: false,
    nullable: true,
    default: null
  })
  deletedAt?: Date;

  @Column({
    nullable: true,
    select: false
  })
  modifiedBy?: string;
}

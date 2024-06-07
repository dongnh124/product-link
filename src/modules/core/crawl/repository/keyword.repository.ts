import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { KeywordEntity } from '~core/crawl/repository/keyword.entity';
import { Keyword } from '~core/crawl/domain/keyword.domain';
import { KeywordId } from '~core/crawl/domain/keyword-id.value-object';

@Injectable()
export class KeywordRepository extends Repository<KeywordEntity> {
  constructor(private dataSource: DataSource) {
    super(KeywordEntity, dataSource.createEntityManager());
  }

  async saveKeyword(domain: Keyword): Promise<Keyword> {
    const persistence = domain.toEntity();

    const keyword = await this.save(persistence);

    return this.findOneByKeywordId(new KeywordId(keyword.id));
  }

  async findOneByKeywordId(id: KeywordId): Promise<Keyword> {
    const resultPersistence = await this.findOne({
      where: {
        id: id.value
      }
    });

    return resultPersistence ? Keyword.from(resultPersistence) : null;
  }

  async findOneByKeyword(keyword: string): Promise<Keyword> {
    const resultPersistence = await this.findOne({
      where: {
        keyword
      }
    });

    return resultPersistence ? Keyword.from(resultPersistence) : null;
  }

  async findMany(): Promise<Keyword[]> {
    const resultPersistence = await this.find();

    return resultPersistence
      ? resultPersistence.map((r) => Keyword.from(r))
      : [];
  }
}

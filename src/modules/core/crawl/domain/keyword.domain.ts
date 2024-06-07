import { BaseDomain, IDomainProps } from '~common/utils/base.domain';

import { KeywordEntity } from '~core/crawl/repository/keyword.entity';
import { KeywordId } from '~core/crawl/domain/keyword-id.value-object';

export interface KeywordProps extends IDomainProps {
  keyword: string;

  links?: string[];
}

export class Keyword extends BaseDomain<KeywordProps, KeywordId> {
  constructor(props: KeywordProps, id?: KeywordId) {
    const idTemp = id || KeywordId.generate();

    super({
      id: idTemp,
      props,
      createdAt: props.createdAt || null,
      createdBy: props.createdBy || null,
      deletedAt: props.deletedAt || null,
      modifiedAt: props.modifiedAt || null,
      modifiedBy: props.modifiedBy || null
    });
  }

  public get keyword(): string {
    return this.props.keyword;
  }

  public get links(): string[] {
    return this.props.links;
  }

  static from(entity: KeywordEntity): Keyword {
    const { keyword, links } = entity;

    return new Keyword(
      {
        keyword,
        links: links ? links.split(' ') : null
      },
      new KeywordId(entity.id)
    );
  }

  toEntity(): KeywordEntity {
    const { keyword, links } = this.getPropsCopy();

    // NOTE: When delete something, the delete property will not be reflect
    const entity = new KeywordEntity({
      id: this.id.value,
      keyword,
      links: links.join(' ')
    });

    return entity;
  }

  // entity business rules validation to protect its invariant
  validate(): void {
    // TODO: Add more validation rule
  }
}

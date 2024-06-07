import path from 'path';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { spawn } from 'child_process';

import { KeywordRepository } from '~core/crawl/repository/keyword.repository';
import { StartCrawlRequestDto } from '~core/crawl/domain/dto/request/start-crawl.request.dto';
import { Keyword } from '~core/crawl/domain/keyword.domain';
import { KeywordAlreadyCrawledError } from '~core/crawl/errors/keyword-already-crawled.error';
import { FailToCrawlError } from '~core/crawl/errors/fail-to-crawl.error';

@Injectable()
export class KeywordService {
  constructor(
    @InjectRepository(KeywordRepository)
    private readonly keywordRepository: KeywordRepository
  ) {}

  async crawl({ keyword }: { keyword: string }): Promise<string[]> {
    return new Promise((resolve, reject) => {
      const pythonProcess = spawn('python3', [
        path.join(__dirname, '../../../../assets/run.py'),
        keyword,
        'com',
        'vi',
        '10',
        '10',
        '1'
      ]);

      pythonProcess.stdout.on('data', (data) => {
        const response =
          data
            .toString()
            ?.split('\n')
            .map((s) => s.trim())
            .filter(Boolean) || [];
        resolve(response);
      });

      pythonProcess.stderr.on('data', (data) => {
        reject(data.toString());
      });
    });
  }

  async start(dto: StartCrawlRequestDto): Promise<Keyword> {
    const { keyword } = dto;
    const exitst = await this.keywordRepository.findOneByKeyword(keyword);
    if (exitst) {
      throw new KeywordAlreadyCrawledError();
    }
    let links: string[];
    try {
      links = await this.crawl({ keyword });
      if (!links || !links.length) {
        throw new Error('Cannot crawl');
      }
    } catch (error) {
      console.log('\nerror-090914:\n', error);
      throw new FailToCrawlError();
    }

    const res = await this.keywordRepository.saveKeyword(
      new Keyword({ keyword, links })
    );

    return res;
  }

  async getAll(): Promise<Keyword[]> {
    return this.keywordRepository.findMany();
  }
}

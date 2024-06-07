import { Module } from '@nestjs/common';

import { DatabaseModule } from '~shared/database/database.module';
import { LoggerModule } from '~shared/logger/logger.module';

@Module({
  imports: [DatabaseModule, LoggerModule]
})
export class SharedModule {}

import { v4 } from 'uuid';
import { Logger } from 'winston';
import { Injectable, LogLevel } from '@nestjs/common';

import { RequestContext } from '~common/middlewares/request.context';
import { CommonInfo, EventInfo, RequestInfo } from '~shared/logger/types';

import { initLogger } from './winston';

@Injectable()
export class LoggerService {
  protected readonly loggerInstance: Logger;

  constructor() {
    this.loggerInstance = initLogger();
  }

  // Use for the end of the request
  public requestInfo(
    message: string,
    data: RequestInfo = { correlationId: this.getCorrelationId() }
  ): void {
    data.data = this.hideSensitive(data.data);
    this.log('info' as LogLevel, message, data);
  }

  // use for the beginning of the execution
  public eventInfo(
    message: string,
    data: EventInfo = { correlationId: this.getCorrelationId() }
  ): void {
    data.data = this.hideSensitive(data.data);
    this.log('info' as LogLevel, message, data);
  }

  // use for logging additional info
  public info(
    message: string,
    optionalParams: CommonInfo = { correlationId: this.getCorrelationId() }
  ): void {
    this.log('info' as LogLevel, message, this.hideSensitive(optionalParams));
  }

  // use for debug
  public debug(
    message: string,
    optionalParams: CommonInfo = { correlationId: this.getCorrelationId() }
  ): void {
    this.log('debug' as LogLevel, message, this.hideSensitive(optionalParams));
  }

  // use for error handling
  public error(
    message: string,
    error: Error,
    optionalParams: CommonInfo = { correlationId: this.getCorrelationId() }
  ): void {
    const wrappedError = this.parseError(error);

    this.log('error' as LogLevel, message, {
      error: wrappedError.message,
      stack: wrappedError.stack,
      ...this.hideSensitive(optionalParams)
    });
  }

  // use for warning
  public warn(
    message: string,
    optionalParams: CommonInfo = { correlationId: this.getCorrelationId() }
  ): void {
    this.log('warn' as LogLevel, message, optionalParams);
  }

  private log(level: LogLevel, message: string, clearedData: CommonInfo): void {
    this.loggerInstance.log(level, message, this.attachContext(clearedData));
  }

  private attachContext(data: CommonInfo): CommonInfo {
    if (!data.correlationId) {
      data.correlationId = this.getCorrelationId();
    }

    if (!data.context) {
      data.context = {};
    }
    data.context.working = true;

    return data;
  }

  private parseError(error: Error): { message: string; stack?: string } {
    if (error instanceof Error) {
      return { message: error.message, stack: error.stack };
    }

    return { message: error };
  }

  private hideSensitive(
    data: Record<string, unknown> = {}
  ): Record<string, unknown> {
    const clone = { ...data } as Record<string, unknown>;
    Object.keys(clone).forEach((key) => {
      if (clone[key] && typeof clone[key] === 'object') {
        clone[key] = this.hideSensitive(clone[key] as Record<string, unknown>);
      }
      if ([].includes(key)) {
        clone[key] = '**Censored**';
      }
    });
    return clone;
  }

  private getCorrelationId(): string {
    return RequestContext.getCorrelationId() || v4();
  }

  /**
   * For testing purpose, getting access to the logger instance
   */
  getInternalLogger(): Logger {
    return this.loggerInstance;
  }
}

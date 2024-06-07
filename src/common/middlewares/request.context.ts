/* eslint-disable import/no-extraneous-dependencies */
import * as cls from 'cls-hooked';
import { Request, Response } from 'express';
import { v4 } from 'uuid';
import { CORRELATION_ID_HEADER } from '~common/constants/environments';
import { RequestInfo } from '~shared/logger/types';
import { initRequestInfo } from '~common/utils/logger.utils';

export class RequestContext {
  public static nsid = 'REQUEST_CONTEXT';

  public static currentContext(): RequestContext {
    const session = cls.getNamespace(RequestContext.nsid);
    if (!session?.active) return null;
    return session.get(RequestContext.name);
  }

  public static currentRequest(): Request {
    const ctx = RequestContext.currentContext();
    if (!ctx) return null;
    return ctx.request;
  }

  public static remoteIP(): string {
    const ctx = RequestContext.currentContext();
    if (ctx) {
      return ctx.request.ip;
    }
    return null;
  }

  public static getCorrelationId(): string {
    const ctx = RequestContext.currentContext();
    if (!ctx) return null;
    return (ctx.request?.headers[CORRELATION_ID_HEADER] as string) || v4();
  }

  public static initRequestInfo(): RequestInfo {
    const ctx = RequestContext.currentContext();
    if (!ctx) return null;
    if (!ctx.requestInfo) {
      ctx.requestInfo = initRequestInfo(ctx.request);
    }

    return ctx.requestInfo;
  }

  public static getRequestInfo(): RequestInfo {
    const ctx = RequestContext.currentContext();
    if (!ctx) return null;

    return ctx.requestInfo;
  }

  public static getToken(): string {
    const ctx = RequestContext.currentContext();
    if (ctx) {
      return ctx.request.headers.authorization;
    }
    return null;
  }

  public static get<T = unknown>(key: string): T {
    const ctx = RequestContext.currentContext();
    if (ctx) {
      return ctx.get<T>(key);
    }
    return null;
  }

  public static set<T = unknown>(key: string, value: T): void {
    const ctx = RequestContext.currentContext();
    if (ctx) {
      ctx.set<T>(key, value);
    }
  }

  static initUserContext(email: string): void {
    const request: any = this.currentRequest();
    if (!request.user) request.user = {};

    const sessionUser = request.user as any;
    if (!sessionUser?.email) sessionUser.email = email;
  }

  static sessionId(): string {
    return this.get<string>('SESSION_ID');
  }

  static session(): any {
    const session = this.get('SESSION');
    return session || null;
  }

  static initSession(session, sessionId: string): void {
    this.set('SESSION_ID', sessionId);
    this.set('SESSION', session);
  }

  public request: Request;

  public response: Response;

  public requestInfo: RequestInfo;

  private store: { [key: string]: unknown } = {};

  constructor(request: Request, response: Response) {
    this.request = request;
    this.response = response;
  }

  private set<T>(key: string, value: T): void {
    this.store[key] = value;
  }

  private get<T>(key: string): T {
    return this.store[key] as T;
  }
}

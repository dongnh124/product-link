import * as cls from 'cls-hooked';
// eslint-disable-next-line import/no-extraneous-dependencies
import { NextFunction, Request, Response } from 'express';
import { v4 } from 'uuid';

import { Injectable, NestMiddleware } from '@nestjs/common';

import { CORRELATION_ID_HEADER } from '~common/constants/environments';
import { RequestContext } from '~common/middlewares/request.context';

@Injectable()
export class RequestContextMiddleWare implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    if (!req.headers?.[CORRELATION_ID_HEADER]) {
      Object.assign(req.headers, { [CORRELATION_ID_HEADER]: v4() });
    }
    const requestContext = new RequestContext(req, res);
    const session =
      cls.getNamespace(RequestContext.nsid) ||
      cls.createNamespace(RequestContext.nsid);
    session.run(async () => {
      session.set(RequestContext.name, requestContext);
      next();
    });
  }
}

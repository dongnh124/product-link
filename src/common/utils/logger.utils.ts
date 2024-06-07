// eslint-disable-next-line import/no-extraneous-dependencies
import { Request } from 'express';
import { DateTime as dt } from 'luxon';
import { v4 } from 'uuid';

import { serviceName } from '~/config';
import { CORRELATION_ID_HEADER } from '~common/constants/environments';
import { RequestInfo } from '~shared/logger/types';

const initRequestInfo = (req: Request): RequestInfo => ({
  correlationId: (req.headers?.[CORRELATION_ID_HEADER] as string) || v4(),
  serviceName,
  fromIp: req.ip,
  method: req.method,
  receivedAt: dt.now().valueOf()
});

const generateMessage = (message: string): string =>
  `[${serviceName}] - ${message}`;

export { initRequestInfo, generateMessage };

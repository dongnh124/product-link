import './env';

import { STAGING } from '~common/constants/environments';
import { getEnv, getEnvBoolean, getEnvNumber } from '~common/utils/env.util';

const environment = getEnv('NODE_ENV', { default: STAGING });
const serviceName = getEnv('SERVICE_NAME', { default: 'bff-mobile-service' });

const serverConfig = {
  port: getEnvNumber('PORT', { default: 3000 }),
  host: getEnv('HOST', { default: 'localhost' })
};

const logConfig = {
  isEnabled: getEnvBoolean('LOG_ENABLE', { default: true }),
  level: getEnv('LOG_LEVEL'),
  format: getEnv('LOG_FORMAT', { default: 'json' }),
  http: {
    request: {
      body: getEnvBoolean('LOG_HTTP_REQUEST_BODY', { default: false }),
      headers: getEnvBoolean('LOG_HTTP_REQUEST_HEADERS', { default: false })
    },
    response: {
      body: getEnvBoolean('LOG_HTTP_RESPONSE_BODY', { default: false }),
      headers: getEnvBoolean('LOG_HTTP_RESPONSE_HEADERS', { default: false })
    }
  }
};

const swaggerConfig = {
  isEnabled: getEnvBoolean('SWAGGER_ENABLED', { default: true }),
  path: getEnv('SWAGGER_PATH', { default: 'swagger' }),
  title: getEnv('SWAGGER_TITLE', { default: 'Server API' }),
  description: getEnv('SWAGGER_DESCRIPTION', {
    default: 'Server API description'
  }),
  version: getEnv('SWAGGER_VERSION', { default: '1.0' })
};

export { environment, logConfig, serverConfig, serviceName, swaggerConfig };

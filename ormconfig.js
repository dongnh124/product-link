// require('./env');

/**
 * Datasource config only for pipeline env migration (SIT, UAT and PRD)
 * Typeorm will load configuration from .env automatically. We are not able to load .env.local
 * In pipeline env, configurations will all stored in .env.
 * While in our local, we are using .env.local.
 * Ref: https://github.com/typeorm/typeorm/issues/3420
 */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { SnakeNamingStrategy } = require('typeorm-naming-strategies');

// DB_SSL_CERT is encode in base64 type
const ssl =
  process.env.DB_SSL && process.env.DB_SSL_CERT
    ? {
        ca: Buffer.from(process.env.DB_SSL_CERT, 'base64').toString(),
        rejectUnauthorized: false
      }
    : null;
let userName = process.env.DB_USERNAME;
let password = process.env.DB_PASSWORD;
let passwordRep = process.env.DB_PASSWORD;
console.log('\nprocess.env.DB_TYPE-808483:\n', process.env.DB_TYPE);
module.exports = {
  type: process.env.DB_TYPE,
  replication: {
    master: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      username: userName,
      password: password,
      database: process.env.DB_NAME,
      ssl,
      extra: {
        // based on  https://node-postgres.com/api/pool
        max: process.env.DB_POOL_SIZE || 10,
        connectionTimeoutMillis: process.env.DB_CONNECTION_TIMEOUT || 1000
      }
    },
    slaves: [
      {
        host: process.env.DB_ROHOST,
        port: process.env.DB_PORT,
        username: userName,
        password: passwordRep,
        database: process.env.DB_NAME,
        ssl,
        extra: {
          // based on  https://node-postgres.com/api/pool
          max: process.env.DB_POOL_SIZE || 10,
          connectionTimeoutMillis: process.env.DB_CONNECTION_TIMEOUT || 1000
        }
      }
    ]
  },
  synchronize: false,
  logging: false,
  namingStrategy: new SnakeNamingStrategy(),
  entities: ['src/modules/**/*.entity.js'],
  migrationsTableName: 'migration_histories',
  // extra: {
  //   // based on  https://node-postgres.com/api/pool
  //   max: process.env.DB_POOL_SIZE || 10,
  //   connectionTimeoutMillis: process.env.DB_CONNECTION_TIMEOUT || 1000
  // },
  migrations: ['src/migrations/*.js'],
  cli: {
    migrationsDir: 'src/migrations'
  }
};

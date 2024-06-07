FROM node:18.17-alpine as builder
WORKDIR /usr/src/app

ARG GITHUB_TOKEN

ARG SENTRY_ORG
ARG SENTRY_PROJECT
ARG SENTRY_RELEASE
ARG SENTRY_TOKEN

COPY . .
COPY .npmrc.ci .npmrc

RUN yarn install
RUN yarn build

# Send source maps to Sentry
RUN ./node_modules/.bin/sentry-cli login --auth-token $SENTRY_TOKEN
RUN ./node_modules/.bin/sentry-cli sourcemaps inject -o $SENTRY_ORG -p $SENTRY_PROJECT ./dist
RUN ./node_modules/.bin/sentry-cli sourcemaps upload -r $SENTRY_RELEASE -o $SENTRY_ORG -p $SENTRY_PROJECT ./dist

FROM node:18.17-alpine
WORKDIR /usr/src/app

ARG BUILD_ROOT=/usr/src/app

ARG GITHUB_TOKEN

ARG SENTRY_RELEASE
ARG SENTRY_DSN

## New Relic Configuration
ENV NEW_RELIC_NO_CONFIG_FILE true
ENV NEW_RELIC_DISTRIBUTED_TRACING_ENABLED true
ENV NEW_RELIC_LOG stdout
ENV NEW_RELIC_ALLOW_ALL_HEADERS true
ENV NEW_RELIC_ATTRIBUTES_EXCLUDE ["request.headers.cookie","request.headers.authorization","request.headers.proxyAuthorization","request.headers.setCookie*","request.headers.x*","response.headers.cookie","response.headers.authorization","response.headers.proxyAuthorization","response.headers.setCookie*","response.headers.x*"]

ENV GITHUB_TOKEN $GITHUB_TOKEN
ENV SENTRY_RELEASE $SENTRY_RELEASE
ENV SENTRY_DSN $SENTRY_DSN

COPY --from=builder $BUILD_ROOT/.npmrc .

COPY --from=builder $BUILD_ROOT/package.json .
COPY --from=builder $BUILD_ROOT/yarn.lock .

RUN yarn install --production

# Install cURL for container healthcheck
RUN apk update\
    apk add --no-cache\
    curl\
    wget

COPY --from=builder $BUILD_ROOT/env.js .
COPY --from=builder $BUILD_ROOT/paths.js .
COPY --from=builder $BUILD_ROOT/ormconfig.js .
COPY --from=builder $BUILD_ROOT/.env* .
COPY --from=builder $BUILD_ROOT/entrypoint.sh .
COPY --from=builder $BUILD_ROOT/src/migrations/* ./src/migrations/
COPY --from=builder $BUILD_ROOT/dist ./dist

EXPOSE 3000

RUN ["chmod", "+x", "/usr/src/app/entrypoint.sh"]
ENTRYPOINT [ "./entrypoint.sh" ]
CMD ["node", "./dist/main.js"]

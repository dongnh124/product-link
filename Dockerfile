FROM node:18.18 as builder

ENV NODE_ENV build

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN yarn install
RUN yarn build


FROM node:18.18-alpine

ENV NODE_ENV production

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/package.json /usr/src/app/
COPY --from=builder /usr/src/app/yarn.lock /usr/src/app/
COPY --from=builder /usr/src/app/node_modules/ /usr/src/app/node_modules/
COPY --from=builder /usr/src/app/dist/ /usr/src/app/dist/
COPY --from=builder /usr/src/app/env.js /usr/src/app/
COPY --from=builder /usr/src/app/ormconfig.js /usr/src/app/
COPY --from=builder /usr/src/app/paths.js /usr/src/app/
COPY --from=builder /usr/src/app/.env /usr/src/app/
COPY --from=builder /usr/src/app/entrypoint.sh /usr/src/app/
COPY --from=builder /usr/src/app/src/migrations/* /usr/src/app/src/migrations/

RUN ["chmod", "+x", "/usr/src/app/entrypoint.sh"]
ENTRYPOINT [ "./entrypoint.sh" ]
CMD ["node", "dist/src/main.js"]

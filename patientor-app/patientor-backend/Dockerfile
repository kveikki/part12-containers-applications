FROM node:16

COPY --chown=node . ./usr/src/server

WORKDIR /usr/src/server

ENV CI=true

RUN npm ci

RUN npm run tsc

USER node

CMD ["node", "build/src/index"]
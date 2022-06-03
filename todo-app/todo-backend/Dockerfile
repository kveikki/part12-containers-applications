FROM node:16

COPY --chown=node . ./usr/src/server

WORKDIR /usr/src/server

ENV CI=true

ENV NODE_ENV production

RUN npm ci --only=production

USER node

CMD ["node", "./bin/www"]
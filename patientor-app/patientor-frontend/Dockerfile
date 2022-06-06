FROM node:16

COPY --chown=node . ./usr/src/app

WORKDIR /usr/src/app

ENV CI=true

RUN npm ci

RUN npm run build

RUN npm install -g serve

USER node

CMD ["serve", "build"]
FROM node:16

COPY --chown=node . ./usr/src/app

WORKDIR /usr/src/app

ENV CI=true

ENV NODE_ENV production

RUN npm ci --only=production

RUN npm test

RUN npm run build

USER node

CMD ["npm", "start"]
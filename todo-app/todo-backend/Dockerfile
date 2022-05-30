FROM node:16

WORKDIR /usr/src/todo

COPY --chown=node:node . .

RUN npm ci --only=production

ENV DEBUG=todo-backend:*

ENV NODE_ENV production

USER node

CMD ["node", "./bin/www"]
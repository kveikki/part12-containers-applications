FROM node:16

WORKDIR /usr/src/server

COPY . .

RUN npm install

RUN npm install nodemon -g

CMD ["nodemon", "./bin/www"]
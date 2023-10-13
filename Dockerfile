FROM node:16.3.0-alpine as test

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

CMD npm run test

FROM node:16.3.0-alpine as dev

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5500

CMD npm run dev

FROM node:18 as base

WORKDIR /usr/src/app

EXPOSE 5500

FROM base as dev

COPY package*.json ./

COPY . .

RUN npm install

CMD npm run dev

FROM base as test

COPY package*.json ./

COPY . .

RUN npm install

RUN npm run test

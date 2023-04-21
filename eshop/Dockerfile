FROM node:16.18.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ENV GENERATE_SOURCEMAP=false

RUN npm run build

RUN npm install serve -g

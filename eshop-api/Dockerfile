FROM node:16.18.0-alpine

RUN apk update

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .
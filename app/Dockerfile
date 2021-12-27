#FROM node:lts
FROM node:lts-buster-slim
COPY . /app
WORKDIR /app
RUN npm i
CMD npm run server
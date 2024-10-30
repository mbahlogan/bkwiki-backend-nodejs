# base image
FROM node:16-alpine3.17 AS build

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json ./
#COPY package.json /app/package.json

RUN yarn

# add app
COPY . ./

EXPOSE 8000

CMD ["yarn","start"]

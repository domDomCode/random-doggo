# pull official base image
FROM node:12.13.0-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --silent
RUN yarn add global react-scripts@4.0.1 -g --silent

# add app
COPY . ./

# start app
CMD ["yarn", "start"]

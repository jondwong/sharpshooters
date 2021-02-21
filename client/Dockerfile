FROM node:14.9
ENV PORT=3002
WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn cache clean && yarn --update-checksums
COPY . ./
EXPOSE 3002
CMD ["yarn", "start"]

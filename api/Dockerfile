FROM node:15

ENV NODE_ENV=production
ENV API_PORT=3003
ENV SOCKET_PORT=3004

WORKDIR /app

COPY [ "package.json", "package-lock.json", "./"] 
RUN ls
RUN npm install --production
RUN ls
COPY . .
RUN npm run deploy
EXPOSE 3003
EXPOSE 3004

CMD ["node", "dist/app.js"]
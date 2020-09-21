FROM node:10.15.0-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT 8080

EXPOSE 8080

CMD [ "node", "server_express.js" ]

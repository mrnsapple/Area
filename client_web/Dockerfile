FROM node:10.15.0-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install -g npm
RUN npm cache clean --force
RUN npm install

COPY . .

EXPOSE 80

CMD ["npm", "run", "start"]

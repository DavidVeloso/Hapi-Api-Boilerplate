FROM node:lts-alpine

WORKDIR /home/boilerplate

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE ${SERVER_PORT}

CMD ["sh", "./scripts/start.sh"]
FROM node:10

WORKDIR /usr/src/app

COPY ./src/package*.json ./

RUN npm install

# COPY . .
COPY ./src .

# COPY ./letsencrypt/ /usr/src/app/letsencrypt

EXPOSE 3000

CMD ["npm", "start"]

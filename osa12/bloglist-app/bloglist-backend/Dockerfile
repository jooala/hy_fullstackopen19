FROM node:16

WORKDIR /usr/src/app

COPY . .

RUN npm ci --force

CMD ["npm", "start"]
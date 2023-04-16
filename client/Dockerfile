FROM node:18-alpine3.15

WORKDIR /my-application

EXPOSE 3000

COPY ./build ./build

COPY ./web-server.js .

RUN npm install express

CMD ["node", "web-server.js"]
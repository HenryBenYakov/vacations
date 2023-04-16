FROM node:18-alpine3.15

WORKDIR /my-application

EXPOSE 3001

COPY . .

RUN npm install

RUN npm run build

CMD ["node", "dist/app.js"]
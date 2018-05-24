FROM node:carbon

RUN mkdir /app
WORKDIR /app

COPY package.json /app
COPY package-lock.json /app
RUN npm install

COPY . /app

EXPOSE 8888

CMD ["npm", "start"]
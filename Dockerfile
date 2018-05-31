FROM node:carbon

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app
COPY package-lock.json /usr/src/app
RUN npm install

COPY . /usr/src/app

EXPOSE 8064

CMD ["node", "app.js"]
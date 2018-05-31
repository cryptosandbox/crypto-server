# Owl

The cryptocurrency data service. Counterpart to [birdie](https://github.com/DrCalx/birdie)

## Quickrun

```
docker-compose up --build
```

## Prerequisites

Install the following items:
  - [Node.js](https://nodejs.org/)
  - [Git](https://git-scm.com/downloads)
  - [MongoDB Community Server](https://www.mongodb.com/)

## Dev Setup

To get set up, run the following commands:
```
git clone git@github.com:DrCalx/owl.git
cd owl/
npm install
cp .env.template .env
npm start
```

The default configuration assumes you have `mongod` running locally.

Make a request for data by visiting http://localhost:8080/api/crypto

## Deploying to prod

Install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)

Link to the heroku repository:
```
heroku git:remote -a owl-server
```

Then, to push to prod:
```
npm test
npm version patch
git push master
git push heroku master
heroku logs
heroku open
```

Visit the site at https://owl-server.herokuapp.com/api/crypto
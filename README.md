# Owl

The cryptocurrency data service. Counterpart to [birdie](https://github.com/DrCalx/birdie)

## Prerequisites

Install the following items:
  - [Node.js](https://nodejs.org/)
  - [Git](https://git-scm.com/downloads)
  - [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)

## Setup

To get set up, run the following commands:
```
git clone git@github.com:DrCalx/cryptex-server.git
npm install
cp .env.template .env
npm test
npm start
```

Make a request for data by visiting http://localhost:8080/crypto

## Deploying to prod



Clone the heroku repository:
```
git remote add heroku https://git.heroku.com/owl-server.git
```

Then, to push to prod:
```
npm test
npm version patch
git push master
git push heroku master
heroku logs
```

Visit the site at https://owl-server.herokuapp.com
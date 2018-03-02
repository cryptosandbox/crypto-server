# Owl

The cryptocurrency data service. Counterpart to [birdie](https://github.com/DrCalx/birdie)

## Prerequisites

Install [Node.js](https://nodejs.org/)

Install [Git](https://git-scm.com/downloads)

## Setup

To get set up, run the following commands:
```
git clone git@github.com:DrCalx/cryptex-server.git
npm install
cp .env.template .env
npm test
npm start
```

The app will run on http://localhost:8080/ by deafult.

## Deploying to prod

First, install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)

Then, clone the heroku repository and push to deploy:
```
git remote add heroku https://git.heroku.com/owl-server.git
git push heroku master
heroku logs
```

Visit the site at https://owl-server.herokuapp.com/
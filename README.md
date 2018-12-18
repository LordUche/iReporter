[![Build Status](https://travis-ci.com/LordUche/iReporter.svg?branch=develop)](https://travis-ci.com/LordUche/iReporter)
[![Coverage Status](https://coveralls.io/repos/github/LordUche/iReporter/badge.svg?branch=develop)](https://coveralls.io/github/LordUche/iReporter?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/a476548a1612cc730256/maintainability)](https://codeclimate.com/github/LordUche/iReporter/maintainability)

# iReporter

iReporter enables any/every citizen to bring any form of corruption to the notice of appropriate authorities and the general public. Users can also report on things that needs government intervention

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

You must have

1. [Node.js](https://nodejs.org/) (_v10.12.0 or higher_) and npm (_v6.4.1 or higher_) installed on your local machine. Run `node -v` and `npm -v` in your terminal to confirm that you have them installed

2. A PostgreSQL DBMS installed on your local machine

### Installing

To get started, clone this repository on your local machine using the following steps:

Open your terminal and navigate to the folder you want the project to be and enter the the following commands:

```bash
git clone https://github.com/LordUche/iReporter.git
cd iReporter
npm install
```

Then create a `.env` file and enter values for the `JWT_SECRET` and `DATABASE_URL` environment variables

## Running the tests

```bash
npm test
```

## Deployment

To deploy to Heroku, install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) then run the following commands:

```bash
heroku login
heroku create
git push heroku master
```

To create the tables on Heroku run

```bash
cat db.sql | heroku pg:psql
```

## Built With

- [Express](https://expressjs.com/) - The web framework used
- [NPM](https://www.npmjs.com/) - Dependency Management
- [Eslint](https://eslint.org/) - Javascript Linting
- [Babel](https://babeljs.io/) - Javascript compiler
- [Mocha](https://mochajs.org/) - The Javascript test framework used
- [Chai](https://www.chaijs.com/) - BDD/TDD assertion library
- [Istanbul](https://istanbul.js.org/) - Javascript test coverage tool
- [Travis CI](https://travis-ci.com/) - Continuous Integration
- [Coveralls](https://coveralls.io/) - Test coverage
- [Nodemon](https://nodemon.io/) - Code monitoring and automatic server restart utility

## Author

- **Uchenna A. Iheanacho** - _Initial work_ - [Andela](https://andela.com/)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

- Mohammed Isioye
- Stephen Aribaba


## Heroku endpoints
Base URL: https://uche-ireporter.herokuapp.com/api/v1/

### Red-flags endpoints
* POST /red-flags               -    _Create a red-flag record_
* GET /red-flags                -    _Get all red-flag records_
* GET /red-flags/:id            -    _Get a specific red-flag record_
* PATCH /red-flags/:id/location -    _Change the location of a specific red-flag record_
* PATCH /red-flags/:id/comment  -    _Change the comment of a specific red-flag record_
* DELETE /red-flags/:id         -    _Delete a specific red-flag record_

## GitHub Pages
URL: https://lorduche.github.io/iReporter/

## Pivotal Tracker board
URL:  https://www.pivotaltracker.com/projects/2227534

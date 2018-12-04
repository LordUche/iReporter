[![Build Status](https://travis-ci.com/LordUche/iReporter-API.svg?branch=master)](https://travis-ci.com/LordUche/iReporter-API)
[![Coverage Status](https://coveralls.io/repos/github/LordUche/iReporter-API/badge.svg?branch=master)](https://coveralls.io/github/LordUche/iReporter-API?branch=master)
[![Maintainability](https://api.codeclimate.com/v1/badges/054a641313d6e835b289/maintainability)](https://codeclimate.com/github/LordUche/iReporter-API/maintainability)

# iReporter
iReporter enables any/every citizen to bring any form of corruption to the notice of appropriate authorities and the general public. Users can also report on things that needs government intervention

## Heroku endpoints
Base URL: https://shrouded-tor-69589.herokuapp.com/api/v1

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

[![Build Status](https://travis-ci.com/LordUche/iReporter.svg?branch=develop)](https://travis-ci.com/LordUche/iReporter)
[![Coverage Status](https://coveralls.io/repos/github/LordUche/iReporter/badge.svg?branch=develop)](https://coveralls.io/github/LordUche/iReporter?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/a476548a1612cc730256/maintainability)](https://codeclimate.com/github/LordUche/iReporter/maintainability)

# iReporter
iReporter enables any/every citizen to bring any form of corruption to the notice of appropriate authorities and the general public. Users can also report on things that needs government intervention

## Heroku endpoints
Base URL: https://uche-ireporter.herokuapp.com/api/v1/red-flags

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

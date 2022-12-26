## Description

Nest app to implement Nexton's interview challenge solution.

 - All domain logic is isolated in the `math` module
 - Dependency injection strategy used was abstract classes - with the `math` module providing concrete values - so the app relies in abtractions - interfaces, "contracts" - rather than implementation
 - The motivation to use Nest is because the framework provides a lot of tools making development speed increadibly faster
 - The logic to handle the equations is a simpler version of [Shunting Yard algorithm] (https://en.wikipedia.org/wiki/Shunting_yard_algorithm), the core conceps are the same but since the problem stated that only basic operations would be provided ('+', '-', '/', '*'), exponential and functions operators were ignored.
 - The problem also stated that a valid equation was always going to be provided therefore no validation was implemented on that layer.
 

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


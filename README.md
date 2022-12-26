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

## How to use it?

1. After starting the app, there's only one endpoint available for a POST request: `http://localhost:3000`
2. The request must included a payload with the shape:

```
{
  "equation": "YOUR_EQUATION_HERE"
}
```
3. The equation must always let a space between a number and a operaror or limiter (open or close parenthesis)
  - Ex (GOOD): `2 + ( 5 * 2 ) / 3`
  - Ex (BAD): `2 + (5 * 2) / 3`
  - Ex (BAD): `2+(5*2)/3`



## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


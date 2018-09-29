# js-ui

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.3.

## Dev Setup

  Per security vulnerabilities report on github.com, run the following steps to
  upgrade angular CLI to v6.2.3, as well as fix audit issues.

  ```
  npm audit
  npm audit fix
  npm audit fix --force
  npm update
  ng update @angular/cli --migrate-only --from=1.7.4
  npm install --save-dev @angular/cli@v6.2.3
  npm audit
  ```


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

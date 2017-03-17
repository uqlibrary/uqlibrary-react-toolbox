# uqlibrary-react-toolbox

[ ![Codeship Status for uqlibrary/uqlibrary-react-toolbox](https://codeship.com/projects/73393d70-ed04-0134-e2b6-0a42fa094665/status?branch=master)](https://codeship.com/projects/208476)
[![Dependency Status](https://david-dm.org/uqlibrary/uqlibrary-react-toolbox.svg)](https://david-dm.org/uqlibrary/uqlibrary-react-toolbox)
[![Dev Dependency Status](https://david-dm.org/uqlibrary/uqlibrary-react-toolbox/dev-status.svg)](https://david-dm.org/uqlibrary/uqlibrary-react-toolbox?type=dev)

a set of reusable component for UQ Library applications

- [GA](https://github.com/uqlibrary/uqlibrary-react-toolbox/tree/master/src/GA)
- [MenuDrawer](https://github.com/uqlibrary/uqlibrary-react-toolbox/tree/master/src/MenuDrawer)
- [SASS](https://github.com/uqlibrary/uqlibrary-react-toolbox/tree/master/src/sass)

## Setup

- `yarn` - to install all dependencies (or `npm install` - to install all dependencies)

## Testing

- `yarn test` - to run tests once
- `yarn test:watch` - to run tests continuously


## Development

### Guidelines

TBA

### Documentation

Each component to have its own Readme.md file with sample usage and props sample values.

### Testing

Tests are written using Jest framework. Snapshot based tests are required for any functional/presentation components. Standard unit tests are required for any container components or components with logic (see example in /src/MenuDrawer/*.tests.js)


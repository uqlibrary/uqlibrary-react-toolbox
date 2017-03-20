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

### Standard libraries to be used

- [axios](https://github.com/mzabriskie/axios) library is used for api calls and mocking of api calls
- more to come...

### Guidelines

TBA

#### Naming conventions

- React components and files of components and related files (eg scss) are to be named with upper case (eg MenuDrawer.js). Do not add UQ, UQLibrary or similar prefixes to components.
- Other files are to be named with lower case (eg index.js)

### Documentation

Each component to have its own Readme.md file with sample usage and props sample values.

### Testing

Tests are written using Jest framework. Snapshot based tests are required for any functional/presentation components. Standard unit tests are required for any container components or components with logic (see example in /src/MenuDrawer/*.tests.js)

### Definition of done

- unit tests
- updated documentation
- any custom inline styles work in all supported browsers (eg [vendor prefixes](https://developer.mozilla.org/en-US/docs/Glossary/Vendor_Prefix) should be applied when required). Check if you should use [prefix](http://shouldiprefix.com/)

Example:
```
display: -ms-flexbox;  /* TWEENER - IE 10 */
display: -webkit-flex; /* NEW - Safari 6.1+. iOS 7.1+, BB10 */
display: flex;  
```

- test with all supported browsers (from IE11)
- component should be included in style guide with demo and links to documentation/how to use


## Roadmap

- ApplicationRoot - component wich will include imports of styles, Mui theme, etc 
- include validation rules - can be just imported by any app
- include normilize.css - to level css of all browsers, remove all styles from all h1-h5
- flexum - custom layout/basic styles library

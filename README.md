# uqlibrary-react-toolbox
a set of reusable components for UQ Library applications


[ ![Codeship Status for uqlibrary/uqlibrary-react-toolbox](https://codeship.com/projects/73393d70-ed04-0134-e2b6-0a42fa094665/status?branch=master)](https://codeship.com/projects/208476)
[![Dependency Status](https://david-dm.org/uqlibrary/uqlibrary-react-toolbox.svg)](https://david-dm.org/uqlibrary/uqlibrary-react-toolbox)
[![Dev Dependency Status](https://david-dm.org/uqlibrary/uqlibrary-react-toolbox/dev-status.svg)](https://david-dm.org/uqlibrary/uqlibrary-react-toolbox?type=dev)

- [AutoCompleteSelect](https://github.com/uqlibrary/uqlibrary-react-toolbox/tree/master/src/AutoCompleteSelect)
- [Authors](https://github.com/uqlibrary/uqlibrary-react-toolbox/tree/master/src/Authors)
- [HelpDrawer](https://github.com/uqlibrary/uqlibrary-react-toolbox/tree/master/src/HelpDrawer)
- [MenuDrawer](https://github.com/uqlibrary/uqlibrary-react-toolbox/tree/master/src/MenuDrawer)
- [SASS](https://github.com/uqlibrary/uqlibrary-react-toolbox/tree/master/src/sass)
- [Toolbox](https://github.com/uqlibrary/uqlibrary-react-toolbox/tree/master/src/TextField)
- [StaticPage](https://github.com/uqlibrary/uqlibrary-react-toolbox/tree/master/src/StaticPage)
- [Loaders](https://github.com/uqlibrary/uqlibrary-react-toolbox/tree/master/src/Loaders)
- [PageStepper](https://github.com/uqlibrary/uqlibrary-react-toolbox/tree/master/src/PageStepper))

## Setup

- `yarn` - to install all dependencies (or `npm install` - to install all dependencies)

## Testing

- `yarn test` - to run tests once
- `yarn test:watch` - to run tests continuously


## Development

### Guidelines

The components folder structure should be structured in a similar fashion to the example below (note the case)

    ComponentFolder
        - README.md
        - actions.js (if applicable)
        - reducer.js (if applicable)
        - index.js
        - components
             - Component.js
             - Component.scss
             - Component.snapshot.test.js
             - Component.test.js (if applicable for unit testing)
        - containers (if applicable)
             - Component.js
   
Do not include .scss as a dependency in `src/ComponentFolder/components`. All custom styling is to be included in `src/sass/_components.scss` for processing by the end user. 

The index.js file is the export definition for the component. For any component file/s you wish to expose outside of the toolbox, you will need to add an export entry with an alias similar to:

    export {default as AliasComponentName} from './ComponentFolder/ComponentName';

Finally add an entry into the src/index.js file
    
    export {AliasComponentName} from './ComponentFolder';

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

## Redux Forms Implementation Tips
If you need to do redux forms and want to include reusable components which uses a function that requires the form name (eg getFormValues('formName')), do the following:

1. Setup redux forms in your main component as per normal. 
```
const formName = 'someFormName';
    :
    :
someForm = reduxForm({
    form: someFormName
})(someForm);
```

2. Pass in the form name to your shared component. Note that `form` is a reserved word in redux-forms v6+ which isn’t clearly documented from what I could see

```
<Authors form={formName} />
```

3. Using the author container as an example, do the following to connect `getFormValues` or similar functions that require a form name as an argument

```
someFormContainer = connect((state, initialProps) => {
    return {
        formValues: getFormValues(initialProps.form || 'aDefaultFormName')(state) || Immutable.Map({})
    };
});
```

4. Since it’s considered as a wizard form within the redux-forms language, you don’t need to specify the `form` prop in the reduxForm() call. ie you can do this

```
let someFormContainer = reduxForm({
    destroyOnUnmount: false
})(componentName);
```

## NPM release procedures

To release a new version of the components on npm run:
`npm run release`

it will create a new version of the package, build all the components and update npm repo

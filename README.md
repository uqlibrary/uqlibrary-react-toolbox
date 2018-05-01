# uqlibrary-react-toolbox *** discontinued ***
a set of reusable components for UQ Library applications

NOTE TO DEVS: THIS REPO IS NO LONGER USED


[ ![Codeship Status for uqlibrary/uqlibrary-react-toolbox](https://codeship.com/projects/73393d70-ed04-0134-e2b6-0a42fa094665/status?branch=master)](https://codeship.com/projects/208476)
[![Dependency Status](https://david-dm.org/uqlibrary/uqlibrary-react-toolbox.svg)](https://david-dm.org/uqlibrary/uqlibrary-react-toolbox)
[![Dev Dependency Status](https://david-dm.org/uqlibrary/uqlibrary-react-toolbox/dev-status.svg)](https://david-dm.org/uqlibrary/uqlibrary-react-toolbox?type=dev)

- [Alert]()
- [AuthButton]()
- [AutoSuggestField]()
- [Charts](https://github.com/uqlibrary/uqlibrary-react-toolbox/tree/master/src/Charts)
- [Checkbox]()
- [ConfirmDialBox]()
- [DatePicker]()
- [FileUploader]()
- [HelpDrawer](https://github.com/uqlibrary/uqlibrary-react-toolbox/tree/master/src/HelpDrawer)
- [helpers]()
- [ListEditor]()
- [Loaders](https://github.com/uqlibrary/uqlibrary-react-toolbox/tree/master/src/Loaders)
- [MenuDrawer](https://github.com/uqlibrary/uqlibrary-react-toolbox/tree/master/src/MenuDrawer)
- [NavigationPrompt]()
- [PartialDate]()
- [ScrollToTop]()
- [SelectField](https://github.com/uqlibrary/uqlibrary-react-toolbox/tree/master/src/SelectField)
- [StandardCard]()
- [StandardPage]()
- [StandardRighthandCard]()
- [Stepper]()
- [TextField](https://github.com/uqlibrary/uqlibrary-react-toolbox/tree/master/src/TextField)
- [SASS](https://github.com/uqlibrary/uqlibrary-react-toolbox/tree/master/src/sass)

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


- Pass in all dataSources as a prop for maximum flexibility of data sources
- Add comments to methods if the methods does more than one thing

#### Optimisation Guidelines

- do not use functional components
- component should extend React.PureComponent if props are simple 
- component should extend React.Component, shouldComponentUpdate() should be implemented if props have objects
- import explicit and specific components (do not import all), eg DO NOT `import {HelpIcon} from '../../index';` DO `import {HelpIcon} from '../../HelpDrawer';`
  
#### Naming conventions

- React components and files of components and related files (eg scss) are to be named with upper case (eg MenuDrawer.js). Do not add UQ, UQLibrary or similar prefixes to components.
- Other files are to be named with lower case (eg index.js)
- When naming a function in a repository, use the format load[Noun]Data e.g. loadAuthorsData. The reason the Data suffix was used is because it deals with the endpoint directly to retrieve the data.
- When naming a function in an action, use the format (if appropriate) load[Noun]List eg loadAuthorsList. The reason the List suffix was used is because it will pass the data to the reducer.
- Constants within actions should be in the format [Noun]_[VERB], eg PUBLICATION_TYPE_SELECTED to indicate action was performed

### Documentation

Each component to have its own Readme.md file with sample usage and props sample values.

### Testing

Tests are written using Jest framework. Snapshot based tests are required for any functional/presentation components. 
Standard unit tests are required for any container components or components with logic (see example in /src/Charts/components/*.tests.js)

### Definition of done

- write unit/snapshot tests
- test with all supported browsers (FF, Edge, Chrome, Safari, mobiles, IE11)
- test keyboard navigation - users should be able to navigate and use the components and application without a mouse
- accessibility testing - turn on [VoiceOver](https://help.apple.com/voiceover/info/guide/10.12/) in Safari or similar
- updated documentation
- any custom inline styles work in all supported browsers (eg [vendor prefixes](https://developer.mozilla.org/en-US/docs/Glossary/Vendor_Prefix) should be applied when required). Check if you should use [prefix](http://shouldiprefix.com/)

Example:
```
display: -ms-flexbox;  /* TWEENER - IE 10 */
display: -webkit-flex; /* NEW - Safari 6.1+. iOS 7.1+, BB10 */
display: flex;  
```

- TBA: component should be included in style guide with demo and links to documentation/how to use


## Roadmap

- ApplicationRoot - component wich will include imports of styles, Mui theme, etc 
- include validation rules - can be just imported by any app
- include normilize.css - to level css of all browsers, remove all styles from all h1-h5


## NPM release procedures
####Login
You need to log into npm via the terminal/command prompt as the correct user in order to publish. 

    1. Log in as the owner (username: `uqlibrary`, password in password management system search for `npm`) of the uq-library-toolbox with the command _npm adduser_
    2. Verify you’re the correct owner by running the command _npm whoami_
    3. Once verified, execute the command release command below.

To release a new version of the components on npm run:
`npm run release`

it will create a new version of the package, build all the components and update npm repo

####Release Gotchas
When doing this for the first time, it was hard to figure out what was going on when you receive the error below:

```
✖ Check local working tree
     → Unclean working tree. Commit or stash changes first.
```

This means you’ve got one of the following issues:

    1. You have stashed changes that haven’t been committed yet
    2. You have some changes to a file that hasn’t been committed
    3. You have a hidden file that’s not showing up as a modified file.

**Fixing point 1**

 In your IDE, unstash your changes by going to `VCS → Git → Unstash Changes`. If you don’t need any of the stashes, hit the `Clear` button otherwise select the appropriate stashes and hit the `Apply Stash` button.

**Fixing point 2**

Straight forward enough. Either commit or revert your changes.

**Fixing point 3**

Run the command `git clean -n` and it should list some files. If it does and you’re happy to delete, run the `git clean -f`. <span style="color:red">_**This is a permanent deletion**_</span> 

As a final note, use the standalone terminal or the command prompt app outside of the IDE. In one case, point 3 was the root of the issue but only showed itself when using a standalone terminal app.

You’re now free to release the package.

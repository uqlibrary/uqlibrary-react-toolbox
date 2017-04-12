# HelpDrawer

simple content menu for UQ Library applications using ReactJs


## HelpDrawer Props
###### All these props are passed in from HelpDrawer's reducer.js file 
- `title: React.PropTypes.string.isRequired`
- `text: React.PropTypes.any.isRequired` 
- `open: React.PropTypes.bool.isRequired`
- `buttonLabel: React.PropTypes.string`


## HelpIcon Props
- `text: React.PropTypes.any.isRequired`
- `title: React.PropTypes.string`
- `buttonLabel: React.PropTypes.string`
- `tooltip: React.PropTypes.string`
- `onClick: React.PropTypes.func`
- `inline: React.PropTypes.bool`
- `style: React.PropTypes.object`

    
## Usage

**./App.js**
```jsx
import React from 'react';
...

import {HelpDrawer, HelpIcon} from 'uqlibrary-react-toolbox';

// Data configuration
const text = 'Where ever additional cues or explanation are required to clarify a process or procedure. Can be used as a card cue (inline inside of <CardHeader> to offer the icon in the top right of the card, or inline in text or form elements. Additionally, by adding 2 parameters (helpTitle and helpText) to a <Field> element, an integrated help icon can be produced. More info on this implementation in forms.'
        
const App = () => (
  <div>
    <HelpIcon 
        title="Contextual help drawer" 
        text={text} 
        buttonLabel="Got it!" 
        tooltip="Click for further information"
        inline />
    <HelpDrawer />
  </div>
);

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
```

**./reducer.js**
```jsx


import { reducer as formReducer } from 'redux-form/immutable';
import { combineReducers } from 'redux-immutable';

// Reducers
import {helpDrawerReducer} from 'uqlibrary-react-toolbox';

const rootReducer = combineReducers({
    form: formReducer,
    // New
    ...
    helpDrawer: helpDrawerReducer
});

export default rootReducer;

```

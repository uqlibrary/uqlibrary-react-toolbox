# Toggle

A simple Toggle component that lists items for UQ Library applications using ReactJs

## Props
- `standard props from http://www.material-ui.com/#/components/toggle`
- `helpTitle: PropTypes.string`
- `helpText: PropTypes.any`

## Usage

**./App.js**
```jsx
import React from 'react';
...

import {Toggle} from 'uqlibrary-react-toolbox';

const App = () => (
  <div>
    <Toggle 
        name="sampleFieldName" 
        label="Toggle for Stuff"
         />
  </div>
);

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
```
```

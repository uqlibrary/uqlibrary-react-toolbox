# PageStepper

simple reusable page stepper component for UQ Library applications using ReactJs

## Props
- `searchResults: PropTypes.object`
- `children: PropTypes.array`
- `formSections: PropTypes.array`

## Usage

**./App.js**
```jsx
import React from 'react';
...

import {PageStepper} from 'uqlibrary-react-toolbox';
        
const App = () => (
    <PageStepper 
      formSections={['Page 1 Test', 'Page 2 Test']}
      >
        <AChildComponent data-stepperIndex="0" stepperHandleNext />
        <AnotherChildComponent data-stepperIndex="1" stepperHandlePrevious stepperOnsubmit />
    </PageStepper>
);

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
```


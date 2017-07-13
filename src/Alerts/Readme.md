# Alerts

Prorotype component to display alerts/warnings/errors

## Props
- `alertText: PropTypes.string`
- `alertState PropTypes.string - valid values ['hidden', 'hide', 'show', 'visible']`
- `alertType PropTypes.string - valid values ['error', 'error_outline', 'warning', 'info', 'info_outline', 'help', 'help_outline']`


## Usage

**./App.js**
```jsx
import React from 'react';
...

import {Alerts} from 'uqlibrary-react-toolbox';
      
const App = () => (
  <div>
    <Alerts 
        alertText="Some body text."
        alertState="visible"
        alertType="error_outline"
    />
  </div>
);

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
```

